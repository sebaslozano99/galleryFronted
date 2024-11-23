const API_URL = "http://localhost:5000/api";


async function fetchGallery(){
    try{
      const res = await fetch(`${API_URL}/gallery`);
      if(!res.ok) throw new Error("Failed to fetch!");
      const data = await res.json();
      // console.log("data: ", data);
      return data;
    }
    catch(error){
      console.error(error);
      throw new Error(error);
    }
}



async function postOneImage(e, user_id, imageFile, title, description){
    e.preventDefault();

    const imageFormData = new FormData();
    imageFormData.append("user_id", user_id);
    imageFormData.append("picture", imageFile);
    imageFormData.append("title", title);
    imageFormData.append("description", description);

    try{
      const res = await fetch(`${API_URL}/gallery`, {
        method: "POST",
        body: imageFormData
      });

      const data = await res.json();
      // console.log(data);
      return data;
    }
    catch(error){
      throw new Error(error);
    }
  }



  async function deletePicture(id){
    try{
      const res = await fetch(`${API_URL}/gallery/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      // console.log(result);
      return result;
    }
    catch(error){
      throw new Error(error);
    }
  }



export { fetchGallery, postOneImage, deletePicture }