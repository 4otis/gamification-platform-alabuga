import React, {useEffect,useState} from "react"
import {Header, Footer} from "../../shared/components/publicComponents"
import PixelBackground from '../../shared/components/pixelBackground/pixelBackground';
import AvatarCustomizer from "./AvatarCustomizer/AvatarCustomizer";
import { customisationApi } from '../../shared/api/endpoints/customization-api';
import "./CustomisationPage.css"

function Customisation(){

    const [custData, setCustData] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchCustData = async () => {
            try {
            setLoading(true);
            setError(null);
    
            const studentId = 1; /* подлежит к уничтожению */
            const data = await customisationApi.getCustomisation(studentId);
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
    
      if (!custData) {
        return (
          <div className="App">
            <Header />
              <div className="error">Данные не найдены</div>
            <Footer />
          </div>
        );
      }

    return(
        <div className="App">
            <PixelBackground
                      pixelSize={6}
                      color={['#ceecffff']}
                      speed={600}
                      intensity={0.001} 
                    />
            <div className="main-content-wrapper">
                <Header />
                <div className='main-customisation-content'>
                    <AvatarCustomizer
                      profile={custData.profile}
                      items={custData.items}
                      types={custData.item_types}
                    />
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Customisation;