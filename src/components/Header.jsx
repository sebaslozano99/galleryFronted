import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../services/users";


export default function Header() {

  const { isAuthenticated, setUserInfo, setIsAuthenticated } = useUserContext();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
        navigate("/auth/login");
        setUserInfo(null);
        setIsAuthenticated(false);
    },
  });

  return (
    <header className="sticky top-0 flex justify-between items-center px-10 w-full h-[8vh] bg-white" >
        <h1 className="text-xl font-semibold" >
            <Link to="/" >Memories</Link>
        </h1>

        <nav>
            <ul className="flex gap-8" >
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/gallery">Gallery</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>

                {
                    isAuthenticated ?

                    <button onClick={mutate} >{isPending ? "Loading..." : "Log out"}</button>
                    :
                    <li>
                        <NavLink to="/auth">Log In</NavLink>
                    </li>
                
                }
            </ul>
        </nav>
    </header>
  )
}
