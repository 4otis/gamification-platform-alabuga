import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../../pages/MainPage/MainPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import CustomisationPage from "../../pages/CustomisationPage/CustomisationPage";
import CourcesPage from "../../pages/CourcesPage/CourcesPage";
import CourseDetailPage from "../../pages/CourseDetailPage/CourseDetailPage";

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} /> 
        <Route path="/profile/customisation" element={<CustomisationPage />} /> 
        <Route path="/cources" element={<CourcesPage />} /> 
        <Route path="/cources/detail" element={<CourseDetailPage />} /> 
    </Routes>
  );
};