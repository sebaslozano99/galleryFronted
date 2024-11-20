import { useEffect, useState } from "react"



export default function App() {

  // const [file, setFile] = useState("");
  const [gallery, setGallery] = useState([]);

  // GET function
  async function getGalleryData(){
    try{
      const res = await fetch("http://localhost:5000/api/gallery");

      const data = await res.json();

      setGallery(data);
      console.log(data);
    }
    catch(error){
      throw new Error(error);
    }
  }


  async function handleSubmit(e){
    e.preventDefault();
    const newPhoto = {"user_id": 1, "picture": e.target[0].files[0]};
    console.log("file: ", e.target[0].files[0]);

    try{
      const res = await fetch("http://localhost:5000/api/gallery", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify(newPhoto)
      });

      const data = res.json();

      console.log("This is data: ", data);
    }
    catch(error){
      throw new Error(error);
    }
  }

  useEffect(() => {
    getGalleryData();
  }, [])


  // function handle(e){
  //   e.preventDefault();
  //   console.log(e);
  //   // console.log(e.target[0].value);
  // }


  return (
    <div> 
      <h1>Gallery</h1>

      <form encType="multipart/form-data" onSubmit={handleSubmit} >
        <input 
          type="file" 
          name="picture" 
        />
        <button>Sent</button>
      </form>

      <img src={`http://localhost:5000/${gallery[0]?.url_path}`} alt="image-1" />
    </div>
  )
}
