import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import ActivityPage from "../../pages/ActivityPage/ActivityPage";
import NutritionPage from "../../pages/NutritionPage/NutritionPage";
import ExercisePage from "../../pages/ExercisePage/ExercisePage";
import LandingPage from "../../pages/LandingPage/LandingPage";
import SleepPage from "../../pages/SleepPage/SleepPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import SignUpPage from "../../pages/SignUpPage/SignUpPage";
// import Navbar from "../Navbar/Navbar";

import './App.css';

function App() {
  const Overlay = () => {
    return (
      <>
      {/* <Navbar /> */}
      <Outlet />
      </>
    )
  }

  return (
    <div>
      <BrowserRouter>
        <Routes path="/" element={<Overlay />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/exercise" element={<ExercisePage />} />
          <Route path="/sleep" element={<SleepPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
