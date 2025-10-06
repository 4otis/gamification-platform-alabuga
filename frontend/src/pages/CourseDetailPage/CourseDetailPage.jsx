import React from 'react';
import { Header, Footer } from "../publicComponents/publicComponents"; // Импортируем Header и Footer
import "./CourseDetailPage.css";

const CourseDetailPage = () => {
  // Основная информация о курсе
  const courseInfo = {
    title: "Основы JavaScript",
    description: "Этот курс предназначен для новичков, которые хотят изучить основы JavaScript. В курсе рассматриваются базовые концепции, такие как переменные, операторы, условия, циклы и функции.",
    duration: 7, // Время на выполнение в днях
    minCompletion: 80, // Минимальный процент выполнения
    artifact: "Сертификат об окончании курса",
    rang: "Опытный"
  };

  // Этапы с миссиями
  const stages = [
    {
      stage: 1,
      missions: [
        { id: 1, title: "Изучить переменные и типы данных", completed: true },
        { id: 2, title: "Изучить операторы и условия", completed: true},
        { id: 3, title: "Решить задачи на циклы", completed: true },
        { id: 4, title: "Создать свою первую функцию", completed: true }
      ]
    },
    {
      stage: 2,
      missions: [
        { id: 5, title: "Изучить асинхронность", completed: true },
        { id: 6, title: "Разобраться с промисами", completed: false },
        { id: 7, title: "Понять async/await", completed: true },
        { id: 8, title: "Создать HTTP запросы", completed: false }
      ]
    },
    {
      stage: 3,
      missions: [
        { id: 9, title: "Пройти тест по основам JavaScript", completed: false },
        { id: 10, title: "Создать проект на JavaScript", completed: true },
        { id: 11, title: "Изучить основы ES6", completed: false }
      ]
    }
  ];

  return (
    <div className="course-detail-page">
      <Header />
      
      <main className="course-detail-content">
        <section className="course-info">
          <h1>{courseInfo.title}</h1>
          <div className="cource-info-container">
            <div className="descriprion-container">
              <p>{courseInfo.description}</p>
              <ul>
                <li><strong>Время на выполнение:</strong> {courseInfo.duration} дней</li>
                <li><strong>Процент выполнения: </strong> {"34% из "+courseInfo.minCompletion}%</li>
                <li><strong>Требуемый ранг:</strong> {courseInfo.rang}</li>
              </ul>
            </div>
            <div className="actifact-container">
              
            </div>
            
          </div>
          
        </section>
        
        <section className="course-missions">
          <h2>Этапы и Миссии</h2>
          <div className="missions-list">
            {stages.map(stage => (
              <div key={stage.stage} className="stage-container">
                <h3>Этап {stage.stage}</h3>
                <ul className="mission-list">
                  {stage.missions.map(mission => (
                    <li
                      key={mission.id}
                      className={`mission-item ${mission.completed ? 'completed' : ''}`}
                    >
                      {`${stage.stage}.${mission.id} ${mission.title}`}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetailPage;
