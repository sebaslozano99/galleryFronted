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



async function fetchSingleImage(pictureID){
  try{
    const res = await fetch(`${API_URL}/gallery/${pictureID}`);
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

      if(!res.ok) throw new Error("Failed to Post new memory!");

      const data = await res.json();
      // console.log(data);
      return data;
    }
    catch(error){
      throw new Error(error);
    }
  }


  
  async function updateOneImage(e, picture_id, imageFile, title, description){

    e.preventDefault();

    const imageFormData = new FormData();
    imageFormData.append("picture", imageFile);
    imageFormData.append("title", title);
    imageFormData.append("description", description);

    try{
      const res = await fetch(`${API_URL}/gallery/${picture_id}`, {
        method: "PUT",
        body: imageFormData
      });

      if(!res.ok) throw new Error("Failed to Post new memory!");

      const data = await res.json();
      console.log(data);
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

      if(!res.ok) throw new Error("Failed to delete memory!");
      
      const result = await res.json();
      // console.log(result);
      return result;
    }
    catch(error){
      throw new Error(error);
    }
  }



export { fetchGallery, fetchSingleImage, postOneImage, updateOneImage, deletePicture }