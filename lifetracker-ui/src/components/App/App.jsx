import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
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
import ApiClient from "../../../services/apiClient";

function App() {
  const [appState, setAppState] = useState({
    user: null,
    isAuthenticated: false,
    nutrition: [],
    sleep: [],
    exercise: []
  });
  
  useEffect( () => {
    const fetchUser = async () => {
      const userToken = localStorage.getItem("lifetracker_token");
      console.log(userToken)
      ApiClient.setToken(userToken);
      console.log("token: ", ApiClient.getToken());
      const userResponse = await ApiClient.fetchUserFromToken();
      const nutritionDataReponse = await ApiClient.getEntries("nutrition", userResponse?.data.user.email)
      const excerciseDataReponse = await ApiClient.getEntries("exercise", userResponse?.data.user.email)
      const sleepDataReponse = await ApiClient.getEntries("sleep", userResponse?.data.user.email)
      
      // setAppState((initialState) => ({
        //   ...initialState,
        //   user: user,
        //   nutrition: nutrition,
        //   exercise: exercise,
        //   sleep: sleep
        // }))
        
      }
      fetchUser();
    }, [appState.isAuthenticated])
    
    const NavBarOverlay = () => {
      return (
        <>
          <Navbar appState={appState} setAppState={setAppState} />
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
            <Route path="/signup" element={<SignUpPage appState={appState} setAppState={setAppState} />} />
            <Route path="/login" element={<LoginPage appState={appState} setAppState={setAppState} />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/nutrition" element={<NutritionPage />}>
              <Route path="/nutrition/" element={<NutritionOverview />} />
              <Route path="/nutrition/create" element={<NutritionForm  setAppState={setAppState} />}/>
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
