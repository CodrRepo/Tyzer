import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Infographs from "./components/Infographs";
import Home from "./components/Home";
import "./font.css"

const App = () => {


  return (
    <div className="bg-zinc-100 h-screen lg:justify-center flex flex-col items-center p-5">
      <Routes>
        <Route path="/"  element={<Home />}/>
      </Routes>
    </div>
  );
};

export default App;
