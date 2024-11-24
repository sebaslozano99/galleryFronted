import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePicture } from "../../services/gallery";
import { MdDeleteOutline } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import CircleSpinner from "../../components/CircleSpinner";
import Button from "../../components/Button";
import PropTypes from "prop-types";
import toast from "react-hot-toast";




export default function GalleryItem({item}) {

  const queryClient = useQueryClient();

  const { mutate, isPending: isDeleting } = useMutation({
    mutationFn: () => deletePicture(item.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["getGallery"]);
      toast.success("Memory deleted!", {duration: 1500, position: "top-right", icon: "❌"});
    },
    onError: () => toast.error("Couldn't delete memory! Try again!")
  });

  

  return (
    <article className="flex flex-col  gap-1 p-2 bg-white border border-black/50 shadow-md" >

      <div className=" w-full h-[85%] border border-black/50" >
        <img 
          src={`http://localhost:5000/${item.url_path}`} 
          alt={item.name}
          className="w-full h-full object-cover" 
        />
      </div>

      <div className="flex items-center justify-between gap-2 w-full h-[15%]" >

        <div className="w-[80%] h-full" >
          <h2 > <b>Memory:</b> {item.title}</h2>
          <p className="w-full overflow-hidden whitespace-nowrap text-ellipsis" > <b>Description:</b> {item.description}</p>
        </div>

        <div className="flex justify-center items-center gap-2 w-[20%] h-full" >

          <Button 
            variant="rounded" 
            bgColor="bg-[#252525]" 
            paddingX="px-1" 
            paddingY="py-1" 
            className="flex justify-center items-center h-6 w-6" 
            isLoading={isDeleting}
            onClick={mutate}
          >
            {isDeleting ? <CircleSpinner /> : <MdDeleteOutline size={25} color="white"  />}
          </Button>

          <Button
            variant="rounded"
            bgColor="bg-red-600" 
          >
            <Link to={`/gallery/edit-memory/${item.id}`} className="flex justify-center items-center h-6 w-6 rounded-full px-1 py-1" >
              <MdModeEdit size={25} color="white" />
            </Link>
          </Button>

        </div>

      </div>
    
    </article>

  )
}


GalleryItem.propTypes = {
    item: PropTypes.object,
}