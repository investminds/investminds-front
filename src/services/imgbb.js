const uploadFileFromList = async (fileList) => {
  if (fileList.length === 0) {
    throw new Error(
      "Por favor, selecione pelo menos uma imagem para fazer o upload."
    );
  }
  const API_KEY = import.meta.env.VITE_UPLOAD_IMAGES_API_KEY;
  const imagesUploaded = await Promise.all(
    fileList.map(async (file) => {
      const formData = new FormData();
      formData.append("image", file.originFileObj);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const { data } = await response.json();
      console.log("data", data);
      return data;
    })
  );

  console.log("imagesUploaded", imagesUploaded);
  const imgsUrls = imagesUploaded.map((response) => response.url);
  return imgsUrls;
};

export default { uploadFileFromList };
