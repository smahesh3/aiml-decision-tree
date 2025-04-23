'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import aimlOptions from '../../data/aiml-options.json';
import PDFExport from './PDFExport';
import ShareLink from './ShareLink';
import { FaBook, FaVideo, FaGraduationCap, FaExternalLinkAlt } from 'react-icons/fa';

// Define types based on the JSON structure
interface Option {
  id: string;
  text: string;
  nextNodeId?: string;
}

interface LearningResource {
  title: string;
  url: string;
  type: 'article' | 'video' | 'course';
}

// Update the Node interface to match the actual data structure
interface Node {
  id: string;
  question: string;
  options: Option[];
  isLeaf?: boolean;
  recommendation?: string;
  description?: string;
  skillLevel?: 'beginner' | 'intermediate' | 'advanced' | string; // Make it accept string to avoid type errors
  pros?: string[];
  cons?: string[];
  learningResources?: LearningResource[];
}

export default function DecisionTree() {
  const [currentNode, setCurrentNode] = useState<Node | null>(null);
  const [path, setPath] = useState<Node[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const decisionTreeData = aimlOptions.nodes as Node[];
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if there's a path in URL parameters
    const pathParam = searchParams.get('path');
    const nodeParam = searchParams.get('node');
    
    if (pathParam && nodeParam) {
      const nodeIds = pathParam.split(',');
      const nodes: Node[] = [];
      const answers: string[] = [];
      
      // Recreate the path from nodeIds
      for (let i = 0; i < nodeIds.length; i++) {
        const nodeId = nodeIds[i];
        const node = decisionTreeData.find(n => n.id === nodeId);
        
        if (node) {
          nodes.push(node);
          
          // If not the last node, find the selected answer
          if (i < nodeIds.length - 1) {
            const nextNodeId = nodeIds[i + 1];
            const option = node.options.find(opt => opt.nextNodeId === nextNodeId);
            if (option) {
              answers.push(option.text);
            } else {
              answers.push(""); // Placeholder if answer not found
            }
          }
        }
      }
      
      if (nodes.length > 0) {
        setPath(nodes);
        setUserAnswers(answers);
        
        // Set current node to the last in path
        const lastNode = nodes[nodes.length - 1];
        setCurrentNode(lastNode);
        
        // Check if it's a result node
        if (lastNode.isLeaf) {
          setShowResult(true);
        }
      } else {
        // Fallback to root if path is invalid
        initializeWithRoot();
      }
    } else {
      // No path param, start with root
      initializeWithRoot();
    }
  }, [decisionTreeData, searchParams]);

  const initializeWithRoot = () => {
    // Start with the root node
    const rootNode = decisionTreeData.find(node => node.id === 'root');
    if (rootNode) {
      setCurrentNode(rootNode);
      setPath([rootNode]);
      setUserAnswers([]);
    }
  };

  const handleOptionClick = (option: Option) => {
    if (!option.nextNodeId) return;

    const nextNode = decisionTreeData.find(node => node.id === option.nextNodeId);
    if (!nextNode) return;

    setCurrentNode(nextNode);
    setPath(prevPath => [...prevPath, nextNode]);
    setUserAnswers(prevAnswers => [...prevAnswers, option.text]);

    if (nextNode.isLeaf) {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    const rootNode = decisionTreeData.find(node => node.id === 'root');
    if (rootNode) {
      setCurrentNode(rootNode);
      setPath([rootNode]);
      setUserAnswers([]);
      setShowResult(false);
    }
  };

  const handleBack = () => {
    if (path.length <= 1) return;
    
    const newPath = [...path];
    newPath.pop();
    const previousNode = newPath[newPath.length - 1];
    
    const newAnswers = [...userAnswers];
    newAnswers.pop();
    
    setCurrentNode(previousNode);
    setPath(newPath);
    setUserAnswers(newAnswers);
    setShowResult(false);
  };

  // Helper function to render resource icon based on type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FaBook className="text-blue-600" />;
      case 'video':
        return <FaVideo className="text-red-600" />;
      case 'course':
        return <FaGraduationCap className="text-green-600" />;
      default:
        return <FaExternalLinkAlt className="text-gray-600" />;
    }
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
            
            {currentNode.skillLevel && (
              <div className="mt-4 bg-gray-100 p-3 rounded-md inline-block">
                <span className="font-medium">Skill Level: </span>
                <span className="capitalize">{currentNode.skillLevel}</span>
              </div>
            )}
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentNode.pros && currentNode.pros.length > 0 && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Pros</h4>
                  <ul className="list-disc list-inside text-green-700 space-y-1">
                    {currentNode.pros.map((pro, idx) => (
                      <li key={idx}>{pro}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {currentNode.cons && currentNode.cons.length > 0 && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">Cons</h4>
                  <ul className="list-disc list-inside text-red-700 space-y-1">
                    {currentNode.cons.map((con, idx) => (
                      <li key={idx}>{con}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {currentNode.learningResources && currentNode.learningResources.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-3">Learning Resources</h4>
                <div className="grid gap-3">
                  {currentNode.learningResources.map((resource, idx) => (
                    <a 
                      key={idx} 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <div className="mt-0.5">
                        {getResourceIcon(resource.type)}
                      </div>
                      <div>
                        <p className="font-medium text-blue-900">{resource.title}</p>
                        <p className="text-sm text-blue-700 capitalize">{resource.type}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-8 flex flex-wrap gap-3">
              <PDFExport 
                path={path} 
                currentNode={currentNode} 
                answers={userAnswers} 
              />
              <ShareLink 
                currentNodeId={currentNode.id} 
                history={path.map(node => node.id)} 
              />
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {currentNode.options.map((option) => (
              <button
                key={option.id}
                className="bg-white border-2 border-gray-200 hover:border-primary hover:bg-blue-50 rounded-lg p-4 text-left transition-all duration-200 shadow-sm hover:shadow-md"
                onClick={() => handleOptionClick(option)}
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