import React from "react";
import { Route, Routes } from "react-router-dom";
import CourseDetailPage from "../../pages/CourseDetailPage/CourseDetailPage";
import CoursesPage from "../../pages/CoursesPage/CoursesPage";
import CustomisationPage from "../../pages/CustomisationPage/CustomisationPage";
import MainPage from "../../pages/MainPage/MainPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/customisation" element={<CustomisationPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/detail" element={<CourseDetailPage />} />
    </Routes>
  );
};