import { useQuery } from "@tanstack/react-query";
import { fetchSingleImage } from "../../services/gallery";



function useGetSingleImage(user_id, pictureId){
    const { data: singleImage, isPending, isError, error, isSuccess } = useQuery({
      queryKey: ["gallery", pictureId],
      queryFn:() => fetchSingleImage(user_id, pictureId),
      retry: 1,
      refetchOnWindowFocus: false,
    });
  
  
    return { singleImage, isPending, isSuccess, isError, error }
  }


export default useGetSingleImage;