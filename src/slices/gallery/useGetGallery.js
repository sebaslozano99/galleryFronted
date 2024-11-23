import { useQuery } from "@tanstack/react-query";
import { fetchGallery } from "../../services/gallery";




function useGetGallery(){
  const { data: gallery, isPending, isError, error } = useQuery({
    queryKey: ["getGallery"],
    queryFn: fetchGallery,
    retry: 1,
    refetchOnWindowFocus: false,
  });


  return { gallery, isPending, isError, error }
}


export default useGetGallery;