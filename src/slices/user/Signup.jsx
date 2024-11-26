import { useReducer } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/users";
import Button from "../../components/Button";
import toast from "react-hot-toast";


const initialState = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  confirm: ""
}


function reducer(state, action){
  switch(action.type){
    case "name/setName":
      return {
        ...state,
        name: action.payload
      };

    case "lastName/setLastName":
      return {
        ...state,
        lastName: action.payload
      };
    
    case "email/setEmail":
      return {
        ...state,
        email: action.payload
      };

    case "password/setPassword":
      return {
        ...state,
        password: action.payload
      };
    
    case "confirm/setConfirm":
      return {
        ...state,
        confirm: action.payload
      }
    
    default: throw new Error("Unknown action type!");
  }
}



export default function Signup() {
  
  const [{email, lastName, name, password, confirm}, dispatch] = useReducer(reducer, initialState);


  const { mutate, isPending } = useMutation({
    mutationFn: (e) =>  signup(e, name, lastName, email, password, confirm),
    onSuccess: (data) => console.log("data:", data),
    onError: (error) => {
      toast.error(error.message);
    }
  });


  return (
    <form 
      onSubmit={mutate}
      className="flex flex-col justify-around items-center gap-6 p-6 w-[30em] h-[32em] bg-white border-[1px] border-slate-500/40 shadow-xl rounded-xl"
    >
      <h2 className="font-semibold text-2xl mb-4" >Create Account</h2>

      <div className="flex items-center justify-between w-full" >
        <label htmlFor="name" className="font-semibold" >Name:</label>
        <input 
          id="name"
          type="text" 
          value={name}
          onChange={(e) => dispatch({type: "name/setName", payload: e.target.value})}
          placeholder="Carol"
          className="px-2 py-1.5 w-3/4 border-[.5px] border-slate-500/40"
          required 
        />
      </div>

      <div className="flex items-center justify-between w-full" >
        <label htmlFor="last_name" className="font-semibold" >Last Name:</label>
        <input 
          id="last_name"
          type="text" 
          value={lastName}
          onChange={(e) => dispatch({type: "lastName/setLastName", payload: e.target.value})}
          placeholder="Scissors"
          className="px-2 py-1.5 w-3/4 border-[.5px] border-slate-500/40"
          required 
        />
      </div>

      <div className="flex items-center justify-between w-full" >
        <label htmlFor="email" className="font-semibold" >Email:</label>
        <input 
          id="email"
          type="email"
          value={email}
          onChange={(e) => dispatch({type: "email/setEmail", payload: e.target.value})}
          placeholder="example@example.com" 
          className="px-2 py-1.5 w-3/4 border-[.5px] border-slate-500/40"
          required 
        />
      </div>

      <div className="flex items-center justify-between w-full" >
        <label htmlFor="password" className="font-semibold" >Password:</label>
        <input 
          id="password"
          type="password" 
          value={password}
          onChange={(e) => dispatch({type: "password/setPassword", payload: e.target.value})}
          placeholder="************"
          className="px-2 py-1.5 w-3/4 border-[.5px] border-slate-500/40 outline-none"
          required 
        />
      </div>

      <div className="flex items-center justify-between w-full" >
        <label htmlFor="confirm-password" className="font-semibold" >Confirm:</label>
        <input 
          id="confirm-password"
          type="password" 
          value={confirm}
          onChange={(e) => dispatch({type: "confirm/setConfirm", payload: e.target.value})}
          placeholder="************"
          className={`px-2 py-1.5 w-3/4 border-[.5px] border-slate-500/40 outline-none ${password?.length > 0 && confirm === password ? "border-green-500" : "border-red-500"}`}
          required 
        />
      </div>

      <div>
        <p>You already have an account? <Link to="/auth/login" className="text-blue-500 underline font-semibold" >Log in</Link></p>
      </div>

      <Button bgColor="bg-[#252525]" paddingX="px-2" paddingY="py-2" className=" text-white w-full hover:bg-[#343434]" >
        {isPending ? "Loading..." : "Sign up"}
      </Button>
    </form>
  )
}
