import React, { useState, useRef, useEffect } from "react";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import IntroBox from "./components/IntroBox";


function App() {

  return (
    <>
      <Background />
      <Navbar />

      {/* First Section: Introduction & Platforms */}
      <div className="flex h-[100vh] w-full items-center justify-center">
        <div className="flex w-4/5 sm:w-3/5 md:w-3/5 h-full justify-center items-center gap-10 flex-col sm:flex-row md:flex-col lg:flex-col pt-30 sm:pt-32 md:pt-32 lg:pt-32"> 
          <IntroBox />
          
          <img
              src="/landscape.jpg"
              className="rounded-[6px] object-cover h-[65%] w-[95%] " 
              alt="Landscape preview"
          />
        </div>
      </div>

      {/* Platforms Section Start */}
      <div className="w-full flex justify-center items-center bg-[#32302f] py-15 my-5">
        <div className="w-full h-50 px-5 md:px-0 md:w-3/5">
          
        </div>
      </div>

      <div className="w-full flex justify-center items-center py-25 sm:pt-10 sm:pb-20 flex-col">
        <div className="w-full md:w-3/5 px-5 md:px-0 flex flex-col gap-5 justify-center items-center">

          <div className="w-full flex flex-col items-center">
            <p className="text-4xl md:text-6xl font-[Times_news_roman] "> Work smarter.</p>
          </div>

          <hr className="w-full border-gray-400" />
        </div>
      </div>
    </>
  )
}

export default App
