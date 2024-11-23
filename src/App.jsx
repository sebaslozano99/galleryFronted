import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// PAGES
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import { Toaster } from "react-hot-toast";







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
      <BrowserRouter>
        <Routes>
          <Route element={ <Layout /> }>
            <Route path="/" element={ <Home /> } />
            <Route path="/gallery" element={ <Gallery /> } />
            <Route path="/about" element={ <About /> } />
            <Route path="*" element={ <NotFound /> } />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  )
}
