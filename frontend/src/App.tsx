import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Places from "./pages/Places";
import PlaceDetail from "./pages/PlaceDetail";
import Guide from "./pages/Guide";
import About from "./pages/About";
import TrainModel from "./pages/TrainModel";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-fes-blue">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-fes-amber">Fes</span>
            <span className="text-white">Guide</span>
          </h1>
          <div className="w-16 h-16 border-4 border-fes-amber border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-grow pt-24 md:pt-28">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/places" element={<Places />} />
            <Route path="/places/:id" element={<PlaceDetail />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/about" element={<About />} />
            <Route path="/train" element={<TrainModel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
