import {USER} from "../../globals"
import {customisationApi} from "../../api/endpoints/customization-api.js"
import {useState, useEffect} from "react"

export default function Avatar({width, height, marginLeft}){
  const [custData, setCustData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
      const fetchCustData = async () => {
        try {
        setLoading(true);
        setError(null);

        const data = await customisationApi.getCustomisation(USER.id);
        setCustData(data);
        } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        } finally {
        setLoading(false);
        }
      };
      fetchCustData();
      console.log(custData)},
  []);

  if (loading) {
      return (
            <h2 className="loading">Загрузка аватара...</h2>
      );
  }
  
  if (error) {
    return (
        <div className='error'>
          <h2>Ошибка</h2>
          <p>Не удалось подключиться к серверу</p>
        </div>
    );
  }

  if (!custData) {
    return (
          <div className="error">Данные не найдены</div>
    );
  }
  const types = custData.item_types
  const items = custData.profile.equiped_items
  return(
    <div className="avatar-comporser" style={{width:width, height:height, marginLeft:marginLeft}}>
      {items.map((item, index) => (
        <img  
          key={index}
          src={"http://localhost:8080/static" + item.file_path}
          style={{
            width:width,
            height:height,
            objectFit: "cover",
            position: "absolute",
            objectFit: "cover",
            zIndex: types.find(t => t.name === item.type_name)?.id || 0
          }}
        />
      ))}
    </div>
  )
};
