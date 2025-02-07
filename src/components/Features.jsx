function Features({ title, description }) {
  return (
    <div className="flex bg-[#081A26] text-white p-6 sm:p-8 rounded-lg flex-col sm:flex-row w-3/4"> 
      <div className="w-full sm:w-3/4"> 
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">{title}</h2>
        <p className="text-sm mb-4 sm:mb-6">
          {description.intro}
        </p>

        {description.features.map((feature, index) => (
          <div key={index} className="mb-4 flex items-start">
            <div>
              <p className="font-semibold text-lg">{feature.title}:</p>
              <p className="text-sm">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full sm:w-1/2 sm:pl-8 sm:border-l border-gray-600 flex justify-center items-center mt-4 sm:mt-0"> 
        <img src="public\landscape2.jpg" alt="Feature Image" className="max-w-full h-auto" /> 
      </div>
    </div>
  );
}

export default Features;