import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrincipalPage from "./PrincipalPage/PrincipalPage";
import TravelProblem from "./TravelProblem/index";
import HamiltonPage from "./Hamilton/HamiltonPage";
import KnapsackPage from "./KnapsackProblem";

const PageRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<PrincipalPage/>}/>
        <Route path="/travel" element={<TravelProblem/>} />
        <Route path="/hamilton" element={<HamiltonPage/>} />
        <Route path="/knapsack" element={<KnapsackPage/>} />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>   
  );
}

export default PageRoutes;
