
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUserProfile, selectAuthToken, getTokenProfile } from "./state/slices/auth";
import { BrowserRouter, Switch, Route, Router, useRouteMatch } from "react-router-dom";
import SupervisorInstituteInterface from "./components/Supervisor/Institution/supervisorInstituteInterface";
import SupervisorProjectInterface from "./components/Supervisor/Project/supervisorProjectInterface";
import SupervisorUserInterface from "./components/Supervisor/User/supervisorUserInterface";
import LoadingInterface from "./components/Loading/loadingInterface";
import AdminInterface from "./components/Admin/adminInterface";
import UserInterface from "./components/User/Project/userProjectInterface";
import ExpertProgressInterface from "./components/Expert/expertProgressInterface";
import ManagerProjectInterface from "./components/Manager/managerProjectInterface";
import ManagerTable from './components/Manager/ManagerTable';
import DataAnalysisInterface from './components/DataAnalysis/dataAnalysisInterface';
import MainPage from './components/Loading/mainPage';
import NavBarTest from "./navBar";
import SideMenuSupervisor from "./components/Supervisor/sideMenuSupervisor";
import UserQuestionTable from "./components/User/Project/questionTable";
import "./style/supervisor.css"
import { useEffect } from "react";
import SideMenuAdmin from "./components/Admin/sideMenuAdmin";
import SideMenuUser from "./components/User/sideMenuUser";
import SideMenuExpert from "./components/Expert/sideMenuExpert"
import SideMenuManager from "./components/Manager/sideMenuManager";
import QnaireQuestionEdit from "./components/Questionnaire/qnaireQuestionEdit";
import QnaireQuestionAnswering from "./components/Questionnaire/qnaireQuestionAnswering";
import QnaireIndicatorEdit from "./components/Questionnaire/qnaireIndicatorEdit";
import RegisterForm from "./components/Loading/registerForm";
import ManagerProgressInterface from "./components/Manager/managerProjectInterface";
import QuestionnaireScoring from "./components/Expert/QuestionnaireScoring";



const SupervisorMainPage = () => {
  const userInfo = useSelector(selectAuthUserProfile);
  const userName = userInfo ? userInfo.username : null;
  return (
    <div>
      <SideMenuSupervisor />
      <div className="div-test">
        <NavBarTest usertype={"超级管理员"} username={userName} />
        <Switch>
          <Route path='/users'>
            <SupervisorUserInterface />
          </Route>
          <Route path='/institutions'>
            <SupervisorInstituteInterface />
          </Route>
          <Route path='/main'>
            <SupervisorProjectInterface />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

const AdministratorMainPage = () => {
  const userInfo = useSelector(selectAuthUserProfile);
  const userName = userInfo ? userInfo.username : null;
  return (
    <div>
      <SideMenuAdmin />
      <div className="div-test">
        <NavBarTest usertype={"管理员"} username={userName} />
        < Switch >
          <Route path="/main">
            <AdminInterface />
          </Route>
          <Route path="/qnaire/:qnaire/qedit">
            <QnaireQuestionEdit />
          </Route>
          <Route path="/qnaire/:qnaire/iedit">
            <QnaireIndicatorEdit />
          </Route>
          <Route path='/data-analysis'>
            <DataAnalysisInterface />
          </Route>
        </Switch >
      </div>
    </div>
  );
};

const ManagerMainPage = () => {
  const userInfo = useSelector(selectAuthUserProfile);
  const userName = userInfo ? userInfo.username : null;
  return (
    <div>
      <SideMenuManager />
      <div className="div-test">
        <NavBarTest usertype={"审核"} username={userName} />
        <Switch>
          <Route path="/main">
            <ManagerProgressInterface />
          </Route>
          <Route path='/data-analysis'>
            <DataAnalysisInterface />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

const ExpertMainPage = () => {
  const userInfo = useSelector(selectAuthUserProfile);
  const userName = userInfo ? userInfo.username : null;
  return (
    <div>
      <SideMenuExpert />
      <div className="div-test">
        <NavBarTest usertype={"专家"} username={userName} />
        <Switch>
          <Route path="/main">
            <ExpertProgressInterface />
          </Route>
          <Route path='/data-analysis'>
            <DataAnalysisInterface />
          </Route>
          <Route path='/QuestionnaireScoring'>
            <QuestionnaireScoring />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

const UserMainPage = () => {
  const userInfo = useSelector(selectAuthUserProfile);
  const userName = userInfo ? userInfo.username : null;
  return (
    <div>
      <SideMenuUser />
      <div className="div-test">
        <NavBarTest usertype={"用户"} username={userName} />
        < Switch >
          <Route path="/main">
            <UserInterface />
          </Route>
          <Route path="/qnaire/:qnaire/qanswer">
            <QnaireQuestionAnswering />
          </Route>
          <Route path='/data-analysis'>
            <DataAnalysisInterface />
          </Route>
        </Switch >
      </div>
    </div>

  );
};


const MakeRouter = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectAuthToken);
  const userInfo = useSelector(selectAuthUserProfile);
  const userType = userInfo ? userInfo.user_type : null;

  useEffect(() => {
    if (token && !userInfo) {
      dispatch(getTokenProfile())
    }
  }, [dispatch, token, userInfo])


  let userRouteMap = {
    S: <SupervisorMainPage />,
    A: <AdministratorMainPage />,
    M: <ManagerMainPage />,
    E: <ExpertMainPage />,
    U: <UserMainPage />,
  };
  console.log(userType);
  let userRoute = userInfo ? userRouteMap[userType] : <Route path='/' component={MainPage} />;
  console.log(userRoute);
  return (
    <Switch>
      <Route exact path="/register" component={RegisterForm} />
      <Route exact path="/login" component={LoadingInterface} />
      {/*<Route exact path="/profile" component={ProfilePage} />*/}
      {userRoute}
      {/*<Route exact path="/" component={MainPage} />*/}
    </Switch>
  );
};



function App() {
  return <div className="App">{MakeRouter()}</div>;
}



export default App;
