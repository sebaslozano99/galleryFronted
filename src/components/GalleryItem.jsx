import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePicture } from "../services/gallery";
import PropTypes from "prop-types";
import toast from "react-hot-toast";




export default function GalleryItem({item}) {

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deletePicture(item.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["getGallery"]);
      toast.success("Memory deleted!", {duration: 1500, position: "top-right", icon: "❌"});
    },
    onError: () => toast.error("Couldn't delete memory! Try again!")
  });

  

  return (
    <article className="p-3 bg-white border border-black/50 rounded-xl" >
      <div className=" w-full h-[90%] border border-black/50 rounded-md" >
        <img 
          src={`http://localhost:5000/${item.url_path}`} 
          alt={item.name}
          className="w-full h-full rounded-md object-cover" 
        />
      </div>

      <button 
        onClick={mutate}
        disabled={isPending}
        className="px-8 py-1 bg-red-500 text-white rounded" 
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>
    </article>

  )
}


GalleryItem.propTypes = {
    item: PropTypes.object,
}