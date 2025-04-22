export default function Hero() {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white py-20 mb-12">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your Perfect AIML Solution
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Navigate our interactive decision tree to discover the best AI/ML 
            solution for your specific needs and requirements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="#decision-tree" 
              className="btn-primary bg-white text-blue-600 hover:bg-blue-50"
            >
              Start the Finder
            </a>
            <a 
              href="#how-it-works" 
              className="btn-primary bg-transparent border-2 border-white hover:bg-white/10"
            >
              Learn How It Works
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 