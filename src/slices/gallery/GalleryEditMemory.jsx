import { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateOneImage } from "../../services/gallery";
import useGetSingleImage from "./useGetSingleImage";
import LoadingPage from "../../components/LoadingPage";
import SquareLoader from "../../components/SquareLoader";
import useMutate from "./useMutate";


const initialState = {
    title: "",
    description: "",
    file: ""
};


function reducer(state, action){
  switch(action.type){
    case "title/setTitle":
      return {
        ...state,
        title: action.payload,
      };

    case "description/setDescription":
      return {
        ...state,
        description: action.payload,
      };
    case "file/seteFile":
      return {
        ...state,
        file: action.payload
      }
  }
}



export default function GalleryEditMemory() {

  const { pictureID } = useParams();
  const [{title, description, file}, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  function navigateGallery(){
    navigate("/gallery");
  }
  
  const { singleImage, isPending, isSuccess } = useGetSingleImage(pictureID);
  const { mutate: handleUpdate, isPending: isUpdating } = useMutate(pictureID, file, title, description, updateOneImage, navigateGallery, "updated successfully!");





  useEffect(() => {
    if(isSuccess){
      dispatch({type: "title/setTitle", payload: singleImage[0]?.title});
      dispatch({type: "description/setDescription", payload: singleImage[0]?.description});
    }
  }, [isSuccess, singleImage]);


  if(isPending) return <LoadingPage>
    <SquareLoader />
  </LoadingPage>


  return (
    <div className="flex flex-col justify-center items-center w-full h-[92vh]" > 
      <h2>EDIT MEMORY</h2>

      <form
        onSubmit={handleUpdate}
        className="flex flex-col gap-6 py-8 px-4 h-auto bg-white border-[1px] border-black/50 p-4 rounded-xl shadow-md"
      >
        <legend className="font-semibold text-center text-xl" >Fill up all the fields</legend>

        <div className="flex items-center gap-5" >
          <label htmlFor="title" className="font-semibold" >Title</label>
          <input 
            id="title"
            type="text" 
            placeholder="family on vacation"
            value={title}
            onChange={(e) => dispatch({type: "title/setTitle", payload: e.target.value})}
            required
            className="py-1.5 px-2 w-80 border-[1px] border-black/30"
          />
        </div>

        <div className="flex items-center gap-5" >
          <label htmlFor="description" className="font-semibold" >Desc</label>
          <input 
            id="description"
            type="text" 
            placeholder="Describe your memory..."
            value={description}
            onChange={(e) => dispatch({type: "description/setDescription", payload: e.target.value})}
            required
            className="py-1.5 px-2 w-80 border-[1px] border-black/30"
          />
        </div>

        <div className="flex items-center gap-2" >
          <label htmlFor="picture" className="font-semibold" >Picture</label>
          <input 
            id="picture"
            type="file" 
            name="picture"
            onChange={(e) => dispatch({type: "file/seteFile", payload: e.target.files[0]})}
          />
        </div>

        <div>
          <button
            className="px-4 py-2 w-full bg-slate-400 hover:bg-slate-500 hover:text-white transition-all ease-out duration-300"
          >
            { isUpdating ? "Posting..." : "Edit" }
          </button>
        </div>

      </form>

    </div>
  )
}
