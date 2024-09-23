import MessageTime from "./MessageTime";

const MessageSent = ({ message, timestamp = "", ...rest }) => {
  return (
    <div
      className="flex justify-end w-full max-w-xs mt-2 ml-auto space-x-3"
      {...rest}
    >
      <div>
        <div className="p-3 text-white bg-blue-600 rounded-l-lg rounded-br-lg">
          <p className="text-sm">{message}</p>
        </div>
        <MessageTime timestamp={timestamp} />
      </div>
    </div>
  );
};

export default MessageSent;
