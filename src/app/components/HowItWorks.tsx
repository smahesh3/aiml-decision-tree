export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AIML Solution Finder guides you through a series of questions to identify the perfect AI/ML solution for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 text-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <svg 
                className="h-6 w-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Answer Questions</h3>
            <p className="text-gray-500">
              Respond to a series of simple questions about your needs, goals, and preferences.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 text-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <svg 
                className="h-6 w-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Navigate the Tree</h3>
            <p className="text-gray-500">
              The decision tree adapts based on your answers, narrowing down the options to find the best fit.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 text-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <svg 
                className="h-6 w-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Your Recommendation</h3>
            <p className="text-gray-500">
              Receive a personalized AIML solution recommendation along with a detailed explanation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 