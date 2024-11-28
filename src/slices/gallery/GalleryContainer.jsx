import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import SquareLoader from "../../components/SquareLoader";
import GalleryItem from "./GalleryItem";
import useGetGallery from "./useGetGallery";
import { useUserContext } from "../../context/UserContext";



export default function GalleryContainer() {

  const { userInfo } = useUserContext();
  const { user_id } = userInfo;
  const { gallery, isPending, isError, error } = useGetGallery(user_id);
    
    
  if(isError) return <div className="flex justify-center items-center w-full min-h-[92vh]" >
    <p>{error.message}</p>
  </div>


  if(isPending) return <div className="flex justify-center items-center w-full min-h-[92vh]" >
    <SquareLoader />
  </div>


  if(!gallery.length) return <div className="flex flex-col justify-center items-center gap-3 w-full min-h-[92vh]" >

    <div className=" w-72" >
      <img src={`/empty.svg`} alt="empty" />
    </div>

    <Link 
      to="/gallery/new-memory"
      className="bg-slate-400 px-6 py-2 rounded-lg"
    >
      Start saving your memories
    </Link>

  </div>

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[400px] gap-4 w-full min-h-[92vh]" >
        {
          gallery?.map((item) => <GalleryItem key={item.id} item={item}   />)
        }
      </div>

      <div className="mt-4">

        <Link 
          to="/gallery/new-memory" 
          className="flex items-center justify-center gap-2 py-2 px-4 w-40 bg-slate-400 hover:bg-slate-500 hover:text-white transition-all ease-out duration-300" 
        > 
          <FaPlus /> New Memory
        </Link>

      </div>
    </>
  )
}
