import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Infographs from "./components/Infographs";
import Home from "./components/Home";

const App = () => {
  
  function sendData(cPara, vIndex, iLength){
    console.log("chala")
    setInfoData((previous)=> ({...previous, currentPara: cPara.content, validIndex: vIndex, inputDataLength: iLength}))
  }

  return (
    <div className="bg-zinc-100 h-screen flex flex-col items-center p-5">
      <Routes>
        <Route path="/"  element={<Home sendData={sendData} />}/>
      </Routes>
    </div>
  );
};

export default App;
