class ImgService {
  async uploadImg(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "jvykewa5");
    const result = await fetch(
      "https://api.cloudinary.com/v1_1/doxtcexu6/auto/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    return await result.json();
  }
}
export default ImgService;
