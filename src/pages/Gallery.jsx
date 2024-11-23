import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchGallery, postOneImage } from "../services/gallery";
import GalleryItem from "../components/GalleryItem";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";



export default function Gallery() {

  const [imageFile, setImageFile] = useState("");
  const queryClient = useQueryClient();

  const { data: gallery, isPending, isError, error } = useQuery({
    queryKey: ["getGallery"],
    queryFn: fetchGallery,
    retry: 1
  });

  const { mutate } = useMutation({
    mutationFn: (e) => postOneImage(e, 1, imageFile),
    onSuccess: () => {
      queryClient.invalidateQueries(["getGallery"]);
      toast.success("Memory added!", {duration: 1500, position: "top-right", icon: "❤️"});
    },
    onError: () => toast.error("Something went wrong!")
  });




  if(isError) return <div className="flex justify-center items-center w-full min-h-[90vh]" >
    <p>{error.message}</p>
  </div>


  if(isPending) return <div className="flex justify-center items-center w-full min-h-[90vh]" >
    <Spinner />
  </div>

  return (
    <>
      <div className="grid grid-cols-3 auto-rows-[400px] gap-8 p-4 w-full min-h-screen" >
        {
          gallery.map((item) => <GalleryItem key={item.id} item={item}   />)
        }
      </div>

      <div className="w-full p-4" >

        <p>Upload new <b>Memories</b></p>

        <form onSubmit={(e) => mutate(e, 1, imageFile)} >
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
