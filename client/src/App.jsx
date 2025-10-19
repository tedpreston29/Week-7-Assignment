import { BrowserRouter, Routes, Route, Link } from "react-router";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import GameLibrary from "./components/GameLibrary";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes className="Routes">
        <Route path="/" element={<LandingPage />} />
        <Route path="/gamelibrary" element={<GameLibrary />} />
      </Routes>
    </BrowserRouter>
  );
}
