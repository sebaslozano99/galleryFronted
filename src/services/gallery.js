const API_URL = "http://localhost:5000/api";


async function fetchGallery(user_id){
    try{
      const res = await fetch(`${API_URL}/gallery/${user_id}`, {
        method: "GET",
        credentials: "include"
      });
      
      if(!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || "Failed to fetch gallery!");
      } 

      const data = await res.json();
      return data;
    }
    catch(error){
      console.error(error);
      throw new Error(error.message || "Something went worng fetching gallery!");
    }
}



async function fetchSingleImage(user_id, pictureID){
  try{
    const res = await fetch(`${API_URL}/gallery/${user_id}/${pictureID}`, {
      method: "GET",
      credentials: "include"
    });
    
    if(!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.message || "Failed to fetch memory!");
    } 

    const data = await res.json();
    return data;
  }
  catch(error){
    console.error(error);
    throw new Error(error.message || "Couldn't fetch memory! Try again!");
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
        credentials: "include",
        body: imageFormData
      });

      if(!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || "Failed to add memory!");
      } 

      const data = await res.json();
      console.log(data);
      return data;
    }
    catch(error){
      throw new Error(error.message || "Couldn't add memory! Try again!");
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
        credentials: "include",
        body: imageFormData
      });

      if(!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || "Failed to Update memory!");
      } 
        

      const data = await res.json();
      return data;
    }
    catch(error){
      throw new Error(error.message || "Something went wrong during memory update!");
    }
  }



  async function deletePicture(photoID){
    try{
      const res = await fetch(`${API_URL}/gallery/${photoID}`, {
        method: "DELETE",
        credentials: "include",
      });

      if(!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || "Failed to Delete memory!");
      } 
      
      const result = await res.json();
      return result;
    }
    catch(error){
      throw new Error(error.message || "Couldn't delete memory! Try again!");
    }
  }



export { fetchGallery, fetchSingleImage, postOneImage, updateOneImage, deletePicture }