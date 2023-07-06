import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import ActivityPage from "../../pages/ActivityPage/ActivityPage";
import NutritionPage from "../../pages/NutritionPage/NutritionPage";
import ExercisePage from "../../pages/ExercisePage/ExercisePage";
import LandingPage from "../../pages/LandingPage/LandingPage";
import SleepPage from "../../pages/SleepPage/SleepPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import SignUpPage from "../../pages/SignUpPage/SignUpPage";
import Navbar from "../Navbar/Navbar";
import NutritionOverview from "../Nutrition/NutritionOverview";
import NutritionForm from "../Nutrition/NutritionForm";
import NutritionDetail from "../Nutrition/NutritionDetail";

import './App.css';

function App() {
  const NavBarOverlay = () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    )
  }

  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBarOverlay />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/nutrition" element={<NutritionPage />}>
              <Route path="/nutrition/" element={<NutritionOverview />} />
              <Route path="/nutrition/create" element={<NutritionForm />}/>
              <Route path="/nutrition/id/:nutritionID" element={<NutritionDetail />}/>
            </Route>
            <Route path="/exercise" element={<ExercisePage />} />
            <Route path="/sleep" element={<SleepPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
