import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import dynamic from 'next/dynamic';
import Footer from './components/Footer';

// Use dynamic import with ssr: false to prevent server-side rendering
const DecisionTree = dynamic(
  () => import('./components/DecisionTree'),
  { ssr: false }
);

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <HowItWorks />
      
      <section id="decision-tree" className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">AIML Solution Finder</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Answer the questions below to find the best AI/ML solution for your needs.
            </p>
          </div>
          
          <DecisionTree />
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 