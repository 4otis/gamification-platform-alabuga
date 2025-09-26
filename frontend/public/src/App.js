import './App.css';
import Header from "./components/Header";
import MainBody from "./components/main_body";
import InfoBody from "./components/infoBody"
import FeedBack from "./components/feedback"
function App() {
  return (
      <div className={"main"}>
          <Header/>
          <MainBody/>
          <InfoBody />
          <FeedBack />
      </div>
  );
};

export default App;