import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./components/GameLibrary";
import GameLibrary from "./components/GameLibrary";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>PS2 CHEAT CODE ARCHIVE</h1>
      </div>
      <Routes className="Routes">
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GameLibrary />} />
      </Routes>
    </BrowserRouter>
  );
}
