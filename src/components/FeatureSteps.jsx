
const FeatureSteps = () => {
  return (
    <>  

        <div className = "flex flex-col justify-around items-start p-10 gap-5 bg-gray-50 rounded-xl w-3/4">
        <h1 className = "text-3xl font-bold text-center">Effortless Resume. Powerful Results.</h1>
      {/* Step 1 */}
    <div  className = "flex justify-between items-start bg-gray-50 rounded-xl w-full">
        <div className = "flex flex-col items-start max-w-sm">
        <div className = "bg-purple-800 text-white rounded-md px-3 py-1 mb-3">
          <span className = "font-bold">1</span>
        </div>
        <p className = "text-gray-800 text-xl w-4/5">
            Tell us which job you&#39;re applying for and upload your resume.
        </p>
      </div>

      {/* Step 2 */}
      <div className = "flex flex-col items-start max-w-sm">
        <div className = "bg-purple-800 text-white  rounded-md px-3 py-1 mb-3">
          <span className = "font-bold">2</span>
        </div>
        <p className = "text-gray-800 text-xl w-4/5">
        Let us tailor your resume to match the job perfectly.
        </p>
      </div>

      {/* Step 3 */}
      <div className = "flex flex-col items-start max-w-sm">
        <div className = "bg-purple-800 text-white  rounded-md px-3 py-1 mb-3">
          <span className = "font-bold">3</span>
        </div>
        <p className = "text-gray-800 text-xl w-4/5">
        Get your optimized resume and impress employers.
        </p>
      </div>
        </div>
    </div>
    </>
   
  );
};

export default FeatureSteps;