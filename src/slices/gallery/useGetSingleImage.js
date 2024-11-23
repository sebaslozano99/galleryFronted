import { useQuery } from "@tanstack/react-query";
import { fetchSingleImage } from "../../services/gallery";



function useGetSingleImage(id){
    const { data: singleImage, isPending, isError, error, isSuccess } = useQuery({
      queryKey: ["gallery", id],
      queryFn:() => fetchSingleImage(id),
      retry: 1,
      refetchOnWindowFocus: false,
    });
  
  
    return { singleImage, isPending, isSuccess, isError, error }
  }


export default useGetSingleImage;