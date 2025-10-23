import React, {useState, useEffect} from 'react';
import { Header, Footer } from "../../shared/components/publicComponents";
import {courseApi} from "../../shared/api/endpoints/course-api";
import "./CourseDetailPage.css";
import MissionMap from "./MissionMap/MissionMap"
import { Typography } from '@mui/material';
import { USER} from "../../shared/globals";

const CourseDetailPage = () => {
  const [courceDetailData, setCourceDetailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourceDetailData= async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await courseApi.getDetailCourse(USER.id, USER.cource);
        setCourceDetailData(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourceDetailData();
  }, []);
  
  if (loading) {
    return (
      <div className="App">
        <Header />
          <h2 className="loading">Загрузка профиля...</h2>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <Header />
        <div className='error'>
          <h2>Ошибка</h2>
          <p>Не удалось подключиться к серверу</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!courceDetailData) {
    return (
      <div className="App">
        <Header />
          <div className="error">Данные не найдены</div>
        <Footer />
      </div>
    );
  }


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
          <Typography variant='h3' className='course-title'>{courceDetailData.course.title}</Typography>
          <div className="cource-info-container">
            <div className="descriprion-container">
              <Typography variant='p' className='cource-descr'>{courceDetailData.course.descr}</Typography>
              <div className='additional-info-container'>
                <Typography variant='p' className="time-to-finish">
                  <strong>Время на выполнение:</strong> 
                  <br/>{courceDetailData.course.timeout} дней
                </Typography>
                <Typography variant='p' className="percent-finishing">
                  <strong>Процент выполнения: </strong> 
                  <br/>{courceDetailData.course.cur_progress*100+"% из "+courceDetailData.course.min_progress*100}%
                </Typography>
                <Typography variant='' className='required-rank'>
                  <strong>Требуемый ранг:</strong>
                  <br/> {courceDetailData.course.rank}
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
