const API_URL = "http://localhost:5000/api";


async function fetchGallery(){
    try{
      const res = await fetch(`${API_URL}/gallery`);
      
      if(!res.ok) {
        const errorData = res.json();
        throw new Error(errorData?.message || "Failed to fetch gallery!");
      } 

      const data = await res.json();
      // console.log("data: ", data);
      return data;
    }
    catch(error){
      console.error(error);
      throw new Error(error.message || "Something went worng fetching gallery!");
    }
}



async function fetchSingleImage(pictureID){
  try{
    const res = await fetch(`${API_URL}/gallery/${pictureID}`);
    
    if(!res.ok) {
      const errorData = res.json();
      throw new Error(errorData?.message || "Failed to fetch memory!");
    } 

    const data = await res.json();
    // console.log("data: ", data);
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
        body: imageFormData
      });

      if(!res.ok) {
        const errorData = res.json();
        throw new Error(errorData?.message || "Failed to add memory!");
      } 

      const data = await res.json();
      // console.log(data);
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
        body: imageFormData
      });

      if(!res.ok) {
        const errorData = res.json();
        throw new Error(errorData?.message || "Failed to Update memory!");
      } 
        

      const data = await res.json();
      // console.log(data
      return data;
    }
    catch(error){
      throw new Error(error.message || "Something went wrong during memory update!");
    }
  }



  async function deletePicture(id){
    try{
      const res = await fetch(`${API_URL}/gallery/${id}`, {
        method: "DELETE",
      });

      if(!res.ok) {
        const errorData = res.json();
        throw new Error(errorData?.message || "Failed to Delete memory!");
      } 
      
      const result = await res.json();
      // console.log(result);
      return result;
    }
    catch(error){
      throw new Error(error.message || "Couldn't delete memory! Try again!");
    }
  }



export { fetchGallery, fetchSingleImage, postOneImage, updateOneImage, deletePicture }