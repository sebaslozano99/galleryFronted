import { Link, NavLink } from "react-router-dom";


export default function Header() {
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
                <li>
                    <NavLink to="/auth">Log In</NavLink>
                </li>
            </ul>
        </nav>
    </header>
  )
}
