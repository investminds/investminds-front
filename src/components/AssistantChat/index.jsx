import { useEffect, useRef, useState } from "react";
import { Button, Tooltip, Empty, Spin } from "antd";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FiMinimize2 } from "react-icons/fi";
import { IoIosSend } from "react-icons/io";
import MessageReceived from "./components/MessageReceived";
import MessageSent from "./components/MessageSent";
import { useDispatch, useSelector } from "react-redux";
import bffService from "../../services/bff";
import {
  setMessages,
  addMessage,
  setThreadId,
  updateMessageContent,
  addOldMessages,
} from "../../store/reducers/user";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const AssistantChat = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { threadId, assistantMessages } = user;

  const [minimized, setMinimized] = useState(true);
  const [isLoadingOldMessages, setIsLoadingOldMessages] = useState(false);
  const [noMessages, setNoMessages] = useState(false);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  const toggleMinimize = () => {
    setMinimized((prevMinimized) => !prevMinimized);
  };

  const fetchNextPage = async () => {
    try {
      const messages = await bffService.retrieveThreadMessages(user.threadId, {
        after: assistantMessages[assistantMessages.length - 1].id,
      });
      if (messages.length > 0) dispatch(addOldMessages(messages));
      if (messages.length === 0) setNoMessages(true);
      setIsLoadingOldMessages(false);
    } catch (error) {
      setIsLoadingOldMessages(false);
      toast.error("Erro ao buscar mensagens antigas...");
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const localStorageThreadId = localStorage.getItem("threadId");
    if (!user) return;
    if (!user.threadId && !localStorageThreadId) {
      const createThread = async (id) => {
        const newThread = await bffService.startThread(id);
        localStorage.setItem("threadId", newThread);
        dispatch(setThreadId(newThread));
      };
      createThread(user.id);
    } else if (
      (user.threadId || localStorageThreadId) &&
      !user.assistantMessages
    ) {
      const getThreadMessages = async (threadId) => {
        try {
          const messages = await bffService.retrieveThreadMessages(threadId);
          dispatch(setMessages(messages));
        } catch (error) {
          console.log(error);
        }
      };
      getThreadMessages(user.threadId || localStorageThreadId);
    }
  }, [user]);

  useEffect(() => {
    if (!messagesContainerRef.current) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        messagesContainerRef.current;
      if (
        scrollTop + scrollHeight <= clientHeight + 10 &&
        !isLoadingOldMessages &&
        !noMessages
      ) {
        setIsLoadingOldMessages(true);
        fetchNextPage();
      }
    };

    const chatElement = messagesContainerRef.current;
    chatElement.addEventListener("scroll", handleScroll);

    return () => {
      chatElement.removeEventListener("scroll", handleScroll);
    };
  }, [isLoadingOldMessages, minimized]);

  const handleChunk = (message, id) => {
    dispatch(updateMessageContent({ id, newContent: message }));
  };

  const handleSendMessage = async (inputValue) => {
    if (inputValue.trim() !== "") {
      const assistantMessageId = uuidv4();
      const userMessageId = uuidv4();

      const newUserMessage = {
        id: userMessageId,
        content: inputValue,
        sender: "user",
        timestamp: Date.now(),
      };
      const newssistantMessage = {
        id: assistantMessageId,
        content: "",
        sender: "assistant",
        timestamp: Date.now(),
      };
      dispatch(addMessage(newUserMessage));
      dispatch(addMessage(newssistantMessage));

      await bffService.sendMessageToAssistant(threadId, inputValue, (chunk) =>
        handleChunk(chunk, assistantMessageId)
      );
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 ${
        minimized ? "w-16 h-16" : "max-w-md w-full h-2/3"
      }`}
    >
      <div
        className={`bg-[#FF4773] text-white shadow-lg rounded-lg ${
          minimized ? "p-2 flex justify-end h-full" : "h-full"
        }`}
      >
        {minimized ? (
          <Tooltip title="Assistente Virtual">
            <div
              className="flex items-center justify-center w-full h-full hover:cursor-pointer"
              onClick={toggleMinimize}
            >
              <IoChatbubbleEllipses size={20} />
            </div>
          </Tooltip>
        ) : (
          <div className="grid h-full grid-rows-12">
            <div className="flex items-center justify-between p-2 bg-[#FF4773] rounded-t-lg">
              <p>Assistente Virtual - IA</p>
              <FiMinimize2
                onClick={toggleMinimize}
                className="hover:cursor-pointer"
              />
            </div>
            <div className="flex flex-col flex-grow w-full max-w-xl overflow-hidden bg-white rounded-b-lg shadow-xl row-span-11">
              <div
                className="flex flex-col-reverse flex-grow h-0 p-4 overflow-auto"
                ref={messagesContainerRef}
              >
                {assistantMessages?.length > 0 ? (
                  <>
                    {assistantMessages.map((message) =>
                      message.sender === "assistant" ? (
                        <MessageReceived
                          message={message.content}
                          timestamp={message.timestamp}
                          key={message.id}
                        />
                      ) : (
                        <MessageSent
                          message={message.content}
                          timestamp={message.timestamp}
                          key={message.id}
                        />
                      )
                    )}
                    {isLoadingOldMessages && <Spin />}
                  </>
                ) : (
                  <Empty description="Inicie uma conversa com nosso assistente virtual!" />
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="bg-[#FF4773] p-2 row-span-1">
                <div className="flex w-full gap-x-2">
                  <input
                    id="chat-input"
                    className="flex items-center w-full h-10 px-3 text-sm text-gray-700 rounded focus:outline-none"
                    type="text"
                    placeholder="Escreva uma mensagem…"
                    ref={inputRef}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage(e.target.value);
                        e.target.value = "";
                      }
                    }}
                  />
                  <Button
                    className="h-10"
                    onClick={() => {
                      handleSendMessage(inputRef.current.value);
                      inputRef.current.value = "";
                    }}
                  >
                    <IoIosSend />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssistantChat;
