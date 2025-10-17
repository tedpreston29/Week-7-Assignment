import { Link } from "react-router";
import FetchFunctions from "./FetchFunctions";
// import { useState, useEffect } from "react";

export default function GameLibrary() {
  return (
    <div>
      <h2>Game Library</h2>
      <FetchFunctions />
    </div>
  );
}
