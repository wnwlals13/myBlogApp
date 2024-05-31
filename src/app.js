import styles from "./app.module.css";
import ContentsList from "./components/contentList/contentsList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContentAdd from "./components/content_add/content_add";
import Article from "./components/article/article";
import ContentEdit from "./components/content_edit/content_edit";
import LoginModal from "./components/loginModal/loginModal";
import Navbar from "./utils/navbar/navbar";
import Footer from "./utils/footer/footer";

function App({ authService, dbService, FileInput }) {
  return (
    <div className={styles.app}>
        <Navbar authService={authService} />
        <Routes>
          <Route path="/" element={<ContentsList authService={authService} dbService={dbService}/>}/>
          <Route path="/addPost" element={<ContentAdd uthService={authService} dbService={dbService} FileInput={FileInput}/>}/>
          <Route path="/login" element={<LoginModal authService={authService}/>}/>
          <Route path="/editPost" element={<ContentEdit authService={authService} dbService={dbService} FileInput={FileInput}/>}/>
          <Route path="/viewPost" element={<Article authService={authService} dbService={dbService}/>}/>
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
