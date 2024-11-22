import { useEffect, useState } from "react";
import GalleryItem from "../components/GalleryItem";

export default function Gallery() {

  const [gallery, setGallery] = useState([]);
  const [imageFile, setImageFile] = useState("");

  async function fetchGallery(){
    try{
      const res = await fetch("http://localhost:5000/api/gallery");
      const data = await res.json();
      // console.log(data);
      setGallery(data);
    }
    catch(error){
      throw new Error(error);
    }
  }


  async function postOneImage(e){
    e.preventDefault();

    const imageFormData = new FormData();
    imageFormData.append("user_id", 1);
    imageFormData.append("picture", imageFile);
    

    console.log("IMAGE FORM DATA: ", imageFormData);
    try{
      const res = await fetch("http://localhost:5000/api/gallery", {
        method: "POST",
        body: imageFormData
      });

      const data = await res.json();
      console.log("RESULT FROM POST: ", data);
    }
    catch(error){
      throw new Error(error);
    }
    finally{
      setImageFile("");
    }
  }


  useEffect(() => {
    fetchGallery();
  }, [])

  return (
    <>
      <div className="grid grid-cols-3 auto-rows-[250px] gap-8 p-8 w-full min-h-screen" >
      {
        gallery.map((item) => <GalleryItem key={item.id} item={item}  />)
      }
      </div>

      <div className="w-full p-8" >

        <p>Upload new <b>Memories</b></p>

        <form onSubmit={postOneImage} >
          <input 
            type="file" 
            name="picture"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
          />
          <button className="px-4 py-1.5 bg-slate-400" >Upload</button>
        </form>
      </div>
    </>
  )
}
