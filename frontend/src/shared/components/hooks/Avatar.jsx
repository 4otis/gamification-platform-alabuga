import {USER} from "../../globals"
import {customisationApi} from "../../api/endpoints/customization-api.js"
import {useState, useEffect} from "react"
import "./Avatar.css"

export default function Avatar({width, height, marginLeft}){
  const [custData, setCustData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoader, setShowLoader] = useState(true); // ← Новое состояние для контроля отображения лоадера

  useEffect(() => {
    const fetchCustData = async () => {
      const startTime = Date.now(); // ← Запоминаем время начала загрузки
      
      try {
        setLoading(true);
        setError(null);
        setShowLoader(true); // ← Показываем лоадер

        const data = await customisationApi.getCustomisation(USER.id);
        setCustData(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        const endTime = Date.now();
        const loadingTime = endTime - startTime;
        const minLoadingTime = 400; // Минимальное время показа лоадера - 400 милисекунд
        
        // Если загрузка заняла меньше 1 секунды, ждём оставшееся время
        if (loadingTime < minLoadingTime) {
          const remainingTime = minLoadingTime - loadingTime;
          setTimeout(() => {
            setLoading(false);
            setShowLoader(false);
          }, remainingTime);
        } else {
          // Если загрузка заняла больше 1 секунды, сразу скрываем лоадер
          setLoading(false);
          setShowLoader(false);
        }
      }
    };
    
    fetchCustData();
  }, []);

  // Показываем лоадер если данные ещё загружаются ИЛИ прошло меньше 1 секунды
  if (showLoader) {
    return (
      <div 
        style={{
          width: width, 
          height: height, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginLeft: marginLeft
        }}
      >
        <div className="avatar-loader">
          <div className="loader-spinner"></div>
          <h2 className="loading-text">Загрузка аватара...</h2>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div 
        className='avatar-error' 
        style={{width: width, height: height, marginLeft: marginLeft}}
      >
        <h2>Ошибка</h2>
        <p>Не удалось подключиться к серверу</p>
      </div>
    );
  }

  if (!custData) {
    return (
      <div 
        className="error" 
        style={{width: width, height: height, marginLeft: marginLeft}}
      >
        Данные не найдены
      </div>
    );
  }

  const types = custData.item_types;
  const items = custData.profile.equiped_items;
  
  return(
    <div 
      className="avatar-comporser" 
      style={{width: width, height: height, marginLeft: marginLeft}}
    >
      {items.map((item, index) => (
        <img  
          key={index}
          src={"http://localhost:8080/static" + item.file_path}
          style={{
            width: width,
            height: height,
            objectFit: "cover",
            position: "absolute",
            zIndex: types.find(t => t.name === item.type_name)?.id || 0
          }}
          alt={item.type_name}
        />
      ))}
    </div>
  );
};