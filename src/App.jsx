import React, { useState, useRef, useEffect } from "react";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import IntroBox from "./components/IntroBox";
import FeatureSteps from "./components/FeatureSteps";
import Features from "./components/Features";
import ReverseFeatures from "./components/ReverseFeatures";


function App() {
  const AIDrivenDescription = {
    intro: "Our AI resume builder utilizes state-of-the-art artificial intelligence to craft resume content tailored to your unique experience and career goals. Say goodbye to writer's block and hello to a resume that highlights your skills and achievements.",
    features: [
      { title: "Personalized Content", desc: "🔑 Integrate keywords that resonate with job descriptions and industry standards, enhancing your resume's relevance." },
      { title: "Proper Formatting", desc: "✅ Ensure your resume is ATS-friendly with automatic formatting adjustments, significantly improving your chances of interview invitations." },
    ],
   };
  
   const ATSDesc = {
    intro: "Ensure your resume gets past automated screening systems with our ATS optimization feature. Our AI resume builder analyzes and formats your resume to meet the requirements of applicant tracking systems, increasing your chances of getting noticed by hiring managers.",
    features: [
      { title: "Keyword Suggestions", desc: "💡 Generate tailored bullet points and job descriptions that align perfectly with your career objectives, showcasing your key strengths." },
      { title: "Enhanced Clarity", desc: "✨ Communicate your professional value effectively with clear, concise language that instantly captures the attention of potential employers." },
      { title: "Another Feature", desc: "🚀 Elevate your resume's impact to stand out; [Feature Description Placeholder]" },
    ],
   };

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
      <div className="w-full flex justify-center items-center my-5">
        <div className="w-full px-5 md:px-0 md:w-3/5 flex justify-center items-cente">
          <FeatureSteps> </FeatureSteps>
        </div>
      </div>


      <div className = "w-full flex justify-center items-center my-5 ">
        <div className = "w-full px-5 md:px-0 md:w-3/5 flex justify-center items-center flex-col gap-5">
        <Features title = "AI-Driven Content Creation" description={AIDrivenDescription} />
        <ReverseFeatures title = "ATS Optimized" description={ATSDesc} />

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
