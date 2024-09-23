import MessageTime from "./MessageTime";

const MessageReceived = ({ message, timestamp, ...rest }) => {
  return (
    <div className="flex w-full max-w-xs mt-2 space-x-3" {...rest}>
      <div>
        <div className="p-3 bg-gray-400 rounded-r-lg rounded-bl-lg">
          {message.split("\n").map((part, index) => (
            <span key={index}>
              {part}
              <br />
            </span>
          ))}
        </div>
        <MessageTime timestamp={timestamp} />
      </div>
    </div>
  );
};

export default MessageReceived;
