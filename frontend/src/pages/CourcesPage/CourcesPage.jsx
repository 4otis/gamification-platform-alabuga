import React from 'react';
import CourseList from "./CourseList/CourseList";
import {Header, Footer} from "../../shared/components/publicComponents"
import { USER} from "../../shared/globals";

function CourcesPage(){
    return(
        <div className="App">
            <Header />

            <div className="main-content">
                <CourseList name="Текущие курсы" /> 
                <CourseList name="Доступные курсы"/> 
            </div>

            <Footer />
        </div>
    );
}

export default CourcesPage;