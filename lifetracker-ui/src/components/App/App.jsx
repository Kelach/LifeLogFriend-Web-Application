import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import ActivityPage from "../../pages/ActivityPage/ActivityPage";
import NutritionPage from "../../pages/NutritionPage/NutritionPage";
import ExercisePage from "../../pages/ExercisePage/ExercisePage";
import LandingPage from "../../pages/LandingPage/LandingPage";
import SleepPage from "../../pages/SleepPage/SleepPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import SignUpPage from "../../pages/SignUpPage/SignUpPage";
import UsersPage from "../../pages/UsersPage/UsersPage";
import Navbar from "../Navbar/Navbar";
import NutritionOverview from "../Nutrition/NutritionOverview";
import NutritionForm from "../Nutrition/NutritionForm";
import NutritionDetail from "../../pages/ResourceDetailsPage.jsx/ResourceDetailsPage";
import './App.css';
import ApiClient from "../../../services/apiClient";
import ResourceDetailsPage from "../../pages/ResourceDetailsPage.jsx/ResourceDetailsPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

function App() {
  console.log("app reloading")
  const [appState, setAppState] = useState({
    user: null,
    isAuthenticated: false,
    nutrition: [],
    sleep: [],
    exercise: []
  });

  useEffect(() => {
    const fetchUser = async () => {
      // fetches user data from backend
      const userToken = localStorage.getItem("lifetracker_token");
      console.log(userToken);
      ApiClient.setToken(userToken);
      console.log("token: ", ApiClient.getToken());

      const { data, success, statusCode } = await ApiClient.fetchUserFromToken();
      console.log(data?.user);

      if (success) {
        // updates appstate if request to backend 
        // was successful
        if (data.user && appState.isAuthenticated === false) {
          // if user exists, set isAuth to true if its currently false
          setAppState((initialState) => ({
            ...initialState,
            user: data.user,
            isAuthenticated: true
          }))
        } else {
          // if user exists and auth is true, just set user
          setAppState((initialState) => ({
            ...initialState,
            user: data.user,
          }));
        }
      } else {
        // set isAuth to false if no token exists in 
        // local storage

        console.log("unauthenticate user", statusCode)
        if (statusCode == 401){
          console.log("error fetching user data: ", statusCode)
          setAppState((initialState) => ({
            ...initialState,
            isAuthenticated: false
          }))
        }
      }
    }

    fetchUser(); // function calling
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
            <Route path="/activity" element={<ActivityPage {...appState} />} />
            <Route path="/nutrition" element={<NutritionPage  {...appState} />}>
              <Route path="/nutrition/" element={<NutritionOverview {...appState} />} s />
              <Route path="/nutrition/create" element={<NutritionForm user={appState.user} setAppState={setAppState} />} />
              <Route path="/nutrition/id/:nutritionId" element={<ResourceDetailsPage resourceType="nutrition" isAuthenticated={appState.isAuthenticated} />} />
            </Route>
            <Route path="/exercise" element={<ExercisePage {...appState} />} />
            <Route path="/sleep" element={<SleepPage />} />
            <Route path="/users" element={<UsersPage {...appState} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}


export default App
