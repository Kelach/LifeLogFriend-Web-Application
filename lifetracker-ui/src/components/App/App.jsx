import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import Activity from "../ActivityPage/ActivityPage";
import { useReducer } from "react";

import './App.css'

function App() {
  const Overlay = () => {
    return (
      <>
      <Navbar />
      <Outlet />
      </>
    )
  }

  return (
    <div>
      <BrowserRouter>
        <Routes path="/" element={<Overlay />}>
          <Route path="/" element={<Home />} />
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
