import React from 'react';
import './CourseList.css'; 
import {Link} from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: "Основы JavaScript",
    requiredRank: "Новичок",
    mana: 50,
    xp: 200,
    rating: 4.5
  },
  {
    id: 2,
    title: "Алгоритмы и структуры данных",
    requiredRank: "Средний",
    mana: 100,
    xp: 400,
    rating: 4.8
  },
  {
    id: 3,
    title: "React для начинающих",
    requiredRank: "Новичок",
    mana: 30,
    xp: 150,
    rating: 4.2
  },
  {
    id: 4,
    title: "Vue.js от А до Я",
    requiredRank: "Средний",
    mana: 80,
    xp: 300,
    rating: 4.7
  },
  {
    id: 5,
    title: "Node.js для серверных приложений",
    requiredRank: "Продвинутый",
    mana: 150,
    xp: 600,
    rating: 4.9
  },
  {
    id: 6,
    title: "React Hooks в глубину",
    requiredRank: "Средний",
    mana: 60,
    xp: 250,
    rating: 4.6
  },
  {
    id: 7,
    title: "TypeScript для начинающих",
    requiredRank: "Новичок",
    mana: 40,
    xp: 180,
    rating: 4.4
  },
  {
    id: 8,
    title: "Обзор ES6 и нововведений",
    requiredRank: "Средний",
    mana: 70,
    xp: 320,
    rating: 4.3
  },
  {
    id: 9,
    title: "Основы тестирования на JavaScript",
    requiredRank: "Новичок",
    mana: 50,
    xp: 220,
    rating: 4.5
  },
  {
    id: 10,
    title: "Полный курс по Express.js",
    requiredRank: "Продвинутый",
    mana: 120,
    xp: 500,
    rating: 4.8
  }
];

const CourseList = ({name}) => {
  return (
    <div className="course-list-container">
      <h2>{name}</h2>
      <div className="course-list">
        {courses.map(course => (
          <div key={course.id} className="course-item">
            <h3><Link to="./cource-detail" style={{ textDecoration: 'none', color: "black" }}>{course.title}</Link></h3>
            <p className='p-rank'><strong>Требуемый ранг:</strong> {course.requiredRank}</p>
            <div className="mana-exp-container">
              <p><strong>Мана: </strong>+{course.mana}</p>
              <p><strong>Опыт: </strong>+{course.xp}</p>
            </div>  
            <div  className='mark-rank'>
              <p><strong>Оценка:</strong> {course.rating}</p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
