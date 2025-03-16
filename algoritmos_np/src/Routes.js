import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrincipalPage from "./PrincipalPage/PrincipalPage";
const PageRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<PrincipalPage/>}/>
        <Route path="/travel" element={<div>hola mundo 3</div>} />
        <Route path="/problem2" element={<div>hola mundo 4</div>} />
        <Route path="/problem3" element={<div>hola mundo 5</div>} />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>   
  );
}

export default PageRoutes;
