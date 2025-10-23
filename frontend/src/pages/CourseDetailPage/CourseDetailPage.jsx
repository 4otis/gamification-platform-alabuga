import React from 'react';
import { Header, Footer } from "../../shared/components/publicComponents"; // Импортируем Header и Footer
import "./CourseDetailPage.css";
import MissionMap from "./MissionMap/MissionMap"
import { Typography } from '@mui/material';
import { USER} from "../../shared/globals";

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
      id: 1,
      name: "Начальный этап",
      missions: [
        { id: 1, name: "Знакомство", description: "Познакомьтесь с системойLorem ipsum dolor sit amet consectetur adipisicing elit. Libero nam maxime id quidem earum consectetur impedit accusantium molestiae, saepe, natus voluptatibus vel molestias tempora. Porro tempora eligendi minima provident voluptas", completed: true },
        { id: 2, name: "Обучение", description: "Пройдите обучение", completed: true },
        { id: 3, name: "Первая задача", description: "Выполните первую задачу", current: true },
        { id: 4, name: "Базовые настройки", description: "Настройте профиль", completed: true }
      ]
    },
    {
      id: 2,
      name: "Развитие навыков",
      missions: [
        { id: 5, name: "Исследование", description: "Исследуйте возможности" },
        { id: 6, name: "Эксперименты", description: "Проведите эксперименты" },
        { id: 7, name: "Практика", description: "Закрепите навыки" }
      ]
    },
    {
      id: 3,
      name: "Продвинутый уровень",
      missions: [
        { id: 8, name: "Сложные задачи", description: "Решите сложные задачи" },
        { id: 9, name: "Оптимизация", description: "Оптимизируйте процессы" }
      ]
    },
    {
      id: 4,
      name: "Завершение и сертификация",
      missions: [
        { id: 10, name: "Финальный тест", description: "Пройдите финальный тест" },
        { id: 11, name: "Достижение", description: "Получите достижение" },
        { id: 12, name: "Сертификация", description: "Получите сертификат" }
      ]
    }
  ];

  return (
    <div className="course-detail-page App">
      <Header />
      
      <main className="course-detail-content">
        <section className="course-info">
          <Typography variant='h3' className='course-title'>{courseInfo.title}</Typography>
          <div className="cource-info-container">
            <div className="descriprion-container">
              <Typography variant='p' className='cource-descr'>{courseInfo.description}</Typography>
              <div className='additional-info-container'>
                <Typography variant='p' className="time-to-finish">
                  <strong>Время на выполнение:</strong> 
                  <br/>{courseInfo.duration} дней
                </Typography>
                <Typography variant='p' className="percent-finishing">
                  <strong>Процент выполнения: </strong> 
                  <br/>{"34% из "+courseInfo.minCompletion}%
                </Typography>
                <Typography variant='' className='required-rank'>
                  <strong>Требуемый ранг:</strong>
                  <br/> {courseInfo.rang}
                </Typography>
              </div>
              
            </div>

            <MissionMap 
              stages={stages}
            />
            
          </div>
          
        </section>
        
        <section className="course-missions">
          <Typography variant='h5'>Этапы и Миссии</Typography>
          <div className="missions-list">
            {stages.map(stage => (
              <div key={stage.name} className="stage-container">
                <h3>{stage.name}</h3>
                <ul className="mission-list">
                  {stage.missions.map(mission => (
                    <li
                      key={mission.id}
                      className={`mission-item ${mission.completed ? 'completed' : ''}`}
                    >
                      {`${stage.name}.${mission.id} ${mission.name}`}
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
