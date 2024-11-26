import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";




function useMutate(id, file, title, description, func, navigateFn, successMsg = "Done", errorMsg = "Something went wrong"){
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (e) => func(e, id, file, title, description),
    onSuccess: () => {
      toast.success(successMsg, {icon: "❤️"});
      navigateFn();
    },
    onError: () => toast.error(errorMsg)
  });


  return { mutate, isPending, isError, error }
}


export default useMutate;