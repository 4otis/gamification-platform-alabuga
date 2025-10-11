import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App/App"; 
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CourcesPage  from "./pages/CourcesPage/CourcesPage";
import CourseDetailPage  from "./pages/CourseDetailPage/CourseDetailPage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/profile" element={<ProfilePage />} /> 
        <Route path="/cources" element={<CourcesPage />} /> 
        <Route path="/cources/cource-detail" element={<CourseDetailPage />} /> 
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
