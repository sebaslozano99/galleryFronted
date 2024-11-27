import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/users";
import toast from "react-hot-toast";



export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (e) => login(e, email, password),
    onSuccess: () => navigate("/gallery"),
    onError: (error) => toast.error(error.error || error.message),
  });


  return (
    <form 
      onSubmit={mutate}
      className="flex flex-col justify-around items-center gap-2 p-6 w-[28em] h-[22em] bg-white border-[1px] border-slate-500/40 shadow-xl rounded-xl"
    >
      <h2 className="font-semibold text-2xl mb-4" >Log in to your account</h2>

      <div className="flex items-center justify-between w-full" >
        <label htmlFor="email" className="font-semibold" >Email:</label>
        <input 
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
          placeholder="************"
          className="px-2 py-1.5 w-3/4 border-[.5px] border-slate-500/40"
          required 
        />
      </div>

      <div>
        <p>You don&apos;t have an account? <Link to="/auth/signup" className="text-blue-500 underline font-semibold" >Sign up</Link></p>
      </div>

      <Button bgColor="bg-[#252525]" paddingX="px-2" paddingY="py-2" className=" text-white w-full hover:bg-[#343434]" >
        { isPending ? "Loading..." : "Log in" }
      </Button>
    </form>
  )
}
