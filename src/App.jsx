import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FilePage from "./pages/FilePage";
import UsersPage from "./pages/UsersPage";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import "./fonts/style.css";

function App() {
  return (
    <>
      <div className="flex min-h-screen flex-col tracking-wide text-white antialiased lg:mx-auto lg:min-w-[64rem] lg:max-w-[90rem]">
        <Router>
          <Navbar />
          <div className="mb-14 mt-7 flex-1 sm:mb-14 sm:mt-14 lg:mb-28 2xl:mt-28">
            <main className="flex flex-col gap-12 sm:gap-20 xl:gap-28">
              <Routes>
                <Route index element={<HomePage />} />
                <Route path="/files" element={<FilePage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
