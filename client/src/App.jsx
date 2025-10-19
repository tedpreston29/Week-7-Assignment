import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import GameLibrary from "./components/GameLibrary";
import GameDetails from "./components/GameDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes className="Routes">
        <Route path="/" element={<LandingPage />} />
        <Route path="/GameLibrary" element={<GameLibrary />} />
        <Route path="/games/:id" element={<GameDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
