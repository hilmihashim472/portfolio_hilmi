import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import About from "./components/About";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Intro from "./components/Intro";
import InteractivePage from "./components/InteractivePage";
import StarBackground from "./components/StarBackground";

const HIDE_NAVBAR = ["/"];
const HIDE_FOOTER = ["/", "/interactive"];

function Shell() {
  const location = useLocation();
  const showNavbar = !HIDE_NAVBAR.includes(location.pathname);
  const showFooter = !HIDE_FOOTER.includes(location.pathname);

  return (
    <div className="app-shell">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/interactive" element={<InteractivePage />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {showFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename="/portfolio_hilmi">
      <StarBackground />
      <Shell />
    </BrowserRouter>
  );
}

export default App;
