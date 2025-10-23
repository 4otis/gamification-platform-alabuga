import React from 'react';
import { Footer, Header } from "../../shared/components/publicComponents";
import CourseList from "./CourseList/CourseList";

function CoursesPage() {
    return (
        <div className="App">
            <Header />

            <div className="main-content">
                <CourseList name="Текущие курсы" />
                <CourseList name="Доступные курсы" />
            </div>

            <Footer />
        </div>
    );
}

export default CoursesPage;