'use client';

import { useState, useEffect } from 'react';
import aimlOptions from '../../data/aiml-options.json';

// Define types based on the JSON structure
interface Option {
  id: string;
  text: string;
  nextNodeId?: string;
}

interface Node {
  id: string;
  question: string;
  options: Option[];
  isLeaf?: boolean;
  recommendation?: string;
  description?: string;
}

export default function DecisionTree() {
  const [currentNode, setCurrentNode] = useState<Node | null>(null);
  const [path, setPath] = useState<Node[]>([]);
  const [showResult, setShowResult] = useState(false);
  const decisionTreeData = aimlOptions.nodes;

  useEffect(() => {
    // Start with the root node
    const rootNode = decisionTreeData.find(node => node.id === 'root');
    if (rootNode) {
      setCurrentNode(rootNode);
      setPath([rootNode]);
    }
  }, [decisionTreeData]);

  const handleOptionClick = (nextNodeId: string | undefined) => {
    if (!nextNodeId) return;

    const nextNode = decisionTreeData.find(node => node.id === nextNodeId);
    if (!nextNode) return;

    setCurrentNode(nextNode);
    setPath(prevPath => [...prevPath, nextNode]);

    if (nextNode.isLeaf) {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    const rootNode = decisionTreeData.find(node => node.id === 'root');
    if (rootNode) {
      setCurrentNode(rootNode);
      setPath([rootNode]);
      setShowResult(false);
    }
  };

  const handleBack = () => {
    if (path.length <= 1) return;
    
    const newPath = [...path];
    newPath.pop();
    const previousNode = newPath[newPath.length - 1];
    
    setCurrentNode(previousNode);
    setPath(newPath);
    setShowResult(false);
  };

  if (!currentNode) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Breadcrumb navigation */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center text-sm text-gray-500">
          {path.map((node, index) => (
            <div key={node.id} className="flex items-center">
              {index > 0 && <span className="mx-2">›</span>}
              <span className={`${index === path.length - 1 ? 'font-semibold text-primary' : ''}`}>
                {node.question.length > 30 
                  ? node.question.substring(0, 30) + '...' 
                  : node.question}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Current question */}
      <div className={`bg-white rounded-lg shadow-lg p-8 mb-8 ${showResult ? 'border-l-4 border-green-500' : ''}`}>
        <h2 className="text-2xl font-bold mb-6">{currentNode.question}</h2>
        
        {showResult ? (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-600">{currentNode.recommendation}</h3>
            <p className="text-gray-600">{currentNode.description}</p>
            
            <div className="mt-8 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Why this solution?</h4>
              <p className="text-blue-700">
                Based on your selections, this solution aligns best with your needs and requirements.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {currentNode.options.map((option) => (
              <button
                key={option.id}
                className="bg-white border-2 border-gray-200 hover:border-primary hover:bg-blue-50 rounded-lg p-4 text-left transition-all duration-200 shadow-sm hover:shadow-md"
                onClick={() => handleOptionClick(option.nextNodeId)}
              >
                <span className="block font-medium text-lg">{option.text}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <button 
          onClick={handleBack}
          className={`px-4 py-2 rounded-md ${path.length > 1 
            ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' 
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          disabled={path.length <= 1}
        >
          Back
        </button>
        <button 
          onClick={handleReset}
          className="px-4 py-2 bg-primary hover:bg-blue-600 text-white rounded-md"
        >
          Start Over
        </button>
      </div>
    </div>
  );
} 