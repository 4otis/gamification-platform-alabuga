import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../../pages/MainPage/MainPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import CourcesPage from "../../pages/CourcesPage/CourcesPage";
import CourseDetailPage from "../../pages/CourseDetailPage/CourseDetailPage";

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} /> 
        <Route path="/cources" element={<CourcesPage />} /> 
        <Route path="/cources/cource-detail" element={<CourseDetailPage />} /> 
    </Routes>
  );
};