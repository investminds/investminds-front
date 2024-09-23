const MessageTime = ({ timestamp }) => {
  return (
    <span className="text-xs leading-none text-gray-500">
      {timestamp &&
        new Date(timestamp * 1000).toLocaleString("pt-BR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "numeric",
          minute: "numeric",
        })}
    </span>
  );
};

export default MessageTime;
