import { useReducer } from "react";
import { postOneImage } from "../../services/gallery";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useUserContext } from "../../context/UserContext";
import toast from "react-hot-toast";



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


export default function GalleryNewMemory() {

  const { userInfo } = useUserContext();
  const { user_id } = userInfo;
  const [{title, description, file}, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  

  const { mutate: postImage, isPending: isPosting } = useMutation({
    mutationFn: (e) => postOneImage(e, user_id, file, title, description),
    onSuccess:() => {
        toast.success("Memory saved!", {icon: "❤️"});
        navigate("/gallery");
    },
    onError: (error) => toast.error(error.message)
  });



  return (
    <div className="flex flex-col justify-center items-center w-full h-[92vh]" > 
        <h2>NEW MEMORY</h2>

        <form
            onSubmit={postImage}
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
                    accept="image/jpg, image/jpeg, image/png"
                    onChange={(e) => dispatch({type: "file/seteFile", payload: e.target.files[0]})}
                    required
                />
            </div>

            <div>
                <button
                    className="px-4 py-2 w-full bg-slate-400 hover:bg-slate-500 hover:text-white transition-all ease-out duration-300"
                >
                    { isPosting ? "Posting..." : "Save" }
                </button>
            </div>
        </form>
    </div>
  )
}
