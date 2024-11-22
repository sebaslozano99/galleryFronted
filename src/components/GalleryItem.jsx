import PropTypes from "prop-types";
import Spinner from "./Spinner";
import { useState } from "react";



export default function GalleryItem({item, handleDeletePicture}) {

  const [isDeleting, setIsDeleting] = useState(false);


  async function deletePicture(){
    setIsDeleting(true);
    try{
      const res = await fetch(`http://localhost:5000/api/gallery/${item.id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      handleDeletePicture(item.id);
      console.log(result);
    }
    catch(error){
      throw new Error(error);
    }
    finally{
      setIsDeleting(false);
    }
  }


  return (
    <div className="p-2 bg-white border border-black/50" >
      <div className=" w-full h-[90%] border border-black/50" >
          <img 
            src={`http://localhost:5000/${item.url_path}`} 
            alt={item.name}
            className="w-full h-full object-contain" 
          />
      </div>

      <button 
        onClick={deletePicture}
        disabled={isDeleting}
        className="px-8 py-1 bg-red-500 text-white rounded" 
      >
        {isDeleting ? <Spinner size={1.2}  /> : "Delete"}
      </button>
    </div>

  )
}


GalleryItem.propTypes = {
    item: PropTypes.object,
    handleDeletePicture: PropTypes.func
}