import { useQuery } from "@tanstack/react-query";
import { fetchGallery } from "../../services/gallery";




function useGetGallery(user_id){
  const { data: gallery, isPending, isError, error } = useQuery({
    queryKey: ["gallery", user_id],
    queryFn:() => fetchGallery(user_id),
    retry: 1,
    refetchOnWindowFocus: false,
  });


  return { gallery, isPending, isError, error }
}


export default useGetGallery;