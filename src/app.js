import LoginModal from "./components/loginModal/loginModal";
import styles from "./app.module.css";
import ContentsList from "./components/contentList/contentsList";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ContentAdd from "./components/content_add/content_add";

function App({ authService, dbService, FileInput }) {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <ContentsList authService={authService} dbService={dbService} />
          </Route>
          <Route path="/login">
            <LoginModal authService={authService} />
          </Route>
          <Route path="/addPost">
            <ContentAdd
              authService={authService}
              dbService={dbService}
              FileInput={FileInput}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
