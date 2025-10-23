import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { courseApi } from "../../shared/api/endpoints/course-api";
import { Footer, Header } from "../../shared/components/publicComponents";
import { USER } from "../../shared/globals";
import "./CourseDetailPage.css";
import { NodeLevelGroup } from "./funcs/NodeLevelGroup.jsx";
import MissionMap from "./MissionMap/MissionMap";

const CourseDetailPage = () => {
  const [courseDetailData, setCourseDetailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetailData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await courseApi.getDetailCourse(USER.id, USER.course);
        setCourseDetailData(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetailData();
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

  if (!courseDetailData) {
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
          <Typography variant='h3' className='course-title'>{courseDetailData.course.title}</Typography>
          <div className="course-info-container">
            <div className="descriprion-container">
              <Typography variant='p' className='course-descr'>{courseDetailData.course.descr}</Typography>
              <div className='additional-info-container'>
                <Typography variant='p' className="time-to-finish">
                  <strong>Время на выполнение:</strong>
                  <br />{courseDetailData.course.timeout} дней
                </Typography>
                <Typography variant='p' className="percent-finishing">
                  <strong>Процент выполнения: </strong>
                  <br />{courseDetailData.course.cur_progress * 100 + "% из " + courseDetailData.course.min_progress * 100}%
                </Typography>
                <Typography variant='' className='required-rank'>
                  <strong>Требуемый ранг:</strong>
                  <br /> {courseDetailData.course.rank}
                </Typography>
              </div>

            </div>

            <MissionMap

              // stages={stages}
              stages={NodeLevelGroup(courseDetailData.detailed_missions)}
            />

          </div>

        </section>

        <section className="course-missions">
          <Typography variant='h5'>Этапы и Миссии</Typography>
          <div className="missions-list">
            {NodeLevelGroup(courseDetailData.missions).map(stage => (

              <div key={stage.node_lvl} className="stage-container">
                <h3>{"Этап " + stage.node_lvl}</h3>
                <ul className="mission-list">
                  {stage.missions.map(mission => (
                    <li
                      key={mission.id}
                      className={`mission-item ${mission.completed ? 'completed' : ''}`}
                    >
                      {`${stage.node_lvl}.${mission.id} ${mission.title}`}
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
