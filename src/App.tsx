import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { appTheme } from "./theme";
import MiniDrawer from "./pages/Sidebar";
import ChatbotInput from "./pages/live_chat_bot/ChatbotInput";
import LoginIam from "./pages/staff_auth/LoginIam";
import IntegrationStep from "./componets/auth/Integration_steps";
import ChangePassword from "./pages/staff_auth/ChangePassword";
import { io } from "socket.io-client";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Chatui from "./pages/chat/ChatUi";
import NotificationPage from "./pages/NotificationPage";
import MediumLogin from "./componets/auth/MediumLogin";
import TaskAssign from "./pages/TaskAssign";
import StaffManage from "./pages/StaffManage";
import LabelsManage from "./pages/LablesManage";
import AccessLoginPage from "./hoc/AccessLoginPage";
import MakePrivate from "./hoc/MakePrivate";
import AdminSettings from "./componets/Settings/AdminSettings";
import TeamChat from "./pages/teamChat/TeamChat";
export const socket = io(process.env.REACT_APP_SOCKET_CONNECTION as string);

function App() {
  // socket.on("connect", () => {
  //   // console.log("eru");
  // });

  return (
    <>
      <ThemeProvider theme={appTheme}>
        <CssBaseline enableColorScheme />
        <Routes>
          <Route path="/" element={<MiniDrawer />}>
            <Route
              index
              element={
                <MakePrivate>
                  <MediumLogin />
                </MakePrivate>
              }
            />
            <Route
              path="chat"
              element={
                <MakePrivate>
                  <Chatui />
                </MakePrivate>
              }
            />
            <Route
              path="dashboard"
              element={
                <MakePrivate>
                  <Dashboard />
                </MakePrivate>
              }
            />
            <Route
              path="notification"
              element={
                <MakePrivate>
                  <NotificationPage />
                </MakePrivate>
              }
            />
            <Route
              path="auth"
              element={
                <MakePrivate>
                  <MediumLogin />
                </MakePrivate>
              }
            />
            <Route
              path="taskAssign"
              element={
                <MakePrivate>
                  <TaskAssign />
                </MakePrivate>
              }
            />
            <Route
              path="setting"
              element={
                <MakePrivate>
                  <AdminSettings />
                </MakePrivate>
              }
            />
            <Route
              path="userAuthentication"
              element={
                <MakePrivate>
                  <StaffManage />
                </MakePrivate>
              }
            />
            <Route
              path="labelManage"
              element={
                <MakePrivate>
                  <LabelsManage />
                </MakePrivate>
              }
            />
            <Route
              path="teamChat"
              element={
                <MakePrivate>
                  <TeamChat />
                </MakePrivate>
              }
            />
          </Route>
          <Route
            path="/login"
            element={
              <AccessLoginPage>
                <Login />
              </AccessLoginPage>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/chatbot" element={<ChatbotInput />} />
          <Route path="/iam/login" element={<LoginIam />} />
          <Route path="/iam/password" element={<ChangePassword />} />
          <Route path="/steps" element={<IntegrationStep />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
