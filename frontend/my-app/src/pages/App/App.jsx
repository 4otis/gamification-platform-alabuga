import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Profile from "../Profile/Profile.jsx";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={() => navigate("/profile")}>
          Профиль
        </button>
      </div>

    </>
  );
}
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
