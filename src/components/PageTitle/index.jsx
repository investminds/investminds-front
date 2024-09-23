const PageTitle = ({ title, subtitle = "" }) => {
  return (
    <div className="p-4 my-2 text-gray-500 bg-white rounded-md">
      <h1 className="text-2xl">{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  );
};

export default PageTitle;
