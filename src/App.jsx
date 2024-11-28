import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";


// PAGES
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Auth from "./pages/Auth";
import About from "./pages/About";
import NotFound from "./pages/NotFound";


import LoginForm from "./slices/user/LoginForm";
import NewMemory from "./slices/gallery/GalleryNewMemory";
import GalleryContainer from "./slices/gallery/GalleryContainer";
import GalleryEditMemory from "./slices/gallery/GalleryEditMemory";
import Signup from "./slices/user/Signup";
import { UserProvider } from "./context/UserContext";







const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     staleTime:
  //   }
  // }
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient} >

      <UserProvider>
        <BrowserRouter>
          <Routes>

            <Route element={ <Layout /> }>
              <Route path="/" element={ <Home /> } />

              <Route path="/gallery" element={ <Gallery /> } >
                <Route index element={<GalleryContainer />} />
                <Route path="new-memory" element={ <NewMemory /> } />
                <Route path="/gallery/edit-memory/:pictureID" element={ <GalleryEditMemory /> } />
              </Route>

              <Route path="/auth" element={ <Auth /> } >
                <Route index element={ <Navigate replace to="login" /> } />
                <Route path="login" element={ <LoginForm /> } />
                <Route path="signup" element={ <Signup /> } />
              </Route>

              <Route path="/about" element={ <About /> } />
              <Route path="*" element={ <NotFound /> } />
            </Route>

          </Routes>
        </BrowserRouter>
      </UserProvider>
    
      <Toaster position="top-right" toastOptions={{duration: 2000, className: "mt-10"}} />
    </QueryClientProvider>
  )
}
