'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

interface DecisionTreeData {
  nodes: Node[];
}

export default function AdminPage() {
  const [decisionTreeData, setDecisionTreeData] = useState<DecisionTreeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check if we have auth in sessionStorage
        const storedAuth = sessionStorage.getItem('adminAuth');
        
        if (!storedAuth) {
          // Redirect to login if no auth found
          router.push('/login');
          return;
        }
        
        // Verify the stored auth is valid
        const response = await fetch('/api/admin/auth', {
          headers: {
            'Authorization': storedAuth
          }
        });
        
        if (!response.ok) {
          // Redirect to login if auth is invalid
          sessionStorage.removeItem('adminAuth');
          router.push('/login');
          return;
        }
        
        setIsAuthenticated(true);
        fetchDecisionTreeData();
      } catch (err) {
        console.error('Authentication error:', err);
        router.push('/login');
      }
    };
    
    checkAuth();
  }, [router]);

  // Fetch decision tree data
  const fetchDecisionTreeData = async () => {
    try {
      setLoading(true);
      const authHeader = sessionStorage.getItem('adminAuth');
      
      const response = await fetch('/api/decision-tree', {
        headers: {
          'Authorization': authHeader || ''
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch decision tree data');
      }
      
      const data = await response.json();
      setDecisionTreeData(data);
    } catch (err) {
      setError('Error loading decision tree data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Log out function
  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    router.push('/login');
  };

  // Save changes to the decision tree
  const saveDecisionTree = async () => {
    if (!decisionTreeData) return;

    try {
      setLoading(true);
      const authHeader = sessionStorage.getItem('adminAuth');
      
      const response = await fetch('/api/decision-tree', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader || ''
        },
        body: JSON.stringify(decisionTreeData),
      });

      if (!response.ok) {
        throw new Error('Failed to save decision tree data');
      }

      setSuccessMessage('Decision tree saved successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Error saving decision tree. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Update a node in the decision tree
  const updateNode = (updatedNode: Node) => {
    if (!decisionTreeData) return;

    const updatedNodes = decisionTreeData.nodes.map(node => 
      node.id === updatedNode.id ? updatedNode : node
    );

    setDecisionTreeData({
      ...decisionTreeData,
      nodes: updatedNodes
    });
    
    setEditMode(false);
    setSelectedNode(null);
    setSuccessMessage('Node updated successfully!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Add a new node to the decision tree
  const addNode = (newNode: Node) => {
    if (!decisionTreeData) return;

    setDecisionTreeData({
      ...decisionTreeData,
      nodes: [...decisionTreeData.nodes, newNode]
    });
    
    setEditMode(false);
    setSelectedNode(null);
    setSuccessMessage('Node added successfully!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Delete a node from the decision tree
  const deleteNode = (nodeId: string) => {
    if (!decisionTreeData) return;
    if (nodeId === 'root') {
      setError('Cannot delete the root node!');
      return;
    }

    // Check if any other nodes reference this node
    const isReferenced = decisionTreeData.nodes.some(node => 
      node.options.some(option => option.nextNodeId === nodeId)
    );

    if (isReferenced) {
      setError('Cannot delete this node as it is referenced by other nodes!');
      return;
    }

    const updatedNodes = decisionTreeData.nodes.filter(node => node.id !== nodeId);

    setDecisionTreeData({
      ...decisionTreeData,
      nodes: updatedNodes
    });
    
    setSelectedNode(null);
    setSuccessMessage('Node deleted successfully!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Node Editor Component
  const NodeEditor = ({ node, onSave, isNew = false }: { node: Node, onSave: (node: Node) => void, isNew?: boolean }) => {
    const [editedNode, setEditedNode] = useState<Node>({ ...node });
    const [newOption, setNewOption] = useState<Option>({ id: '', text: '', nextNodeId: '' });

    const addOption = () => {
      if (!newOption.id || !newOption.text) return;
      
      setEditedNode({
        ...editedNode,
        options: [...editedNode.options, { ...newOption }]
      });
      
      setNewOption({ id: '', text: '', nextNodeId: '' });
    };

    const removeOption = (optionId: string) => {
      setEditedNode({
        ...editedNode,
        options: editedNode.options.filter(opt => opt.id !== optionId)
      });
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">{isNew ? 'Add New Node' : 'Edit Node'}</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Node ID:</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={editedNode.id}
            onChange={(e) => setEditedNode({ ...editedNode, id: e.target.value })}
            readOnly={!isNew} // ID should not be editable for existing nodes
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Question:</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={editedNode.question}
            onChange={(e) => setEditedNode({ ...editedNode, question: e.target.value })}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Is Leaf Node:</label>
          <input
            type="checkbox"
            checked={editedNode.isLeaf || false}
            onChange={(e) => setEditedNode({ ...editedNode, isLeaf: e.target.checked })}
          />
        </div>
        
        {editedNode.isLeaf && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Recommendation:</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={editedNode.recommendation || ''}
                onChange={(e) => setEditedNode({ ...editedNode, recommendation: e.target.value })}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                rows={3}
                value={editedNode.description || ''}
                onChange={(e) => setEditedNode({ ...editedNode, description: e.target.value })}
              ></textarea>
            </div>
          </>
        )}
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">Options:</h4>
          
          {editedNode.options.map((option, index) => (
            <div key={index} className="flex items-center mb-2 p-2 bg-gray-50 rounded">
              <div className="flex-grow grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="ID"
                  className="p-1 border border-gray-300 rounded"
                  value={option.id}
                  onChange={(e) => {
                    const updatedOptions = [...editedNode.options];
                    updatedOptions[index].id = e.target.value;
                    setEditedNode({ ...editedNode, options: updatedOptions });
                  }}
                />
                <input
                  type="text"
                  placeholder="Text"
                  className="p-1 border border-gray-300 rounded"
                  value={option.text}
                  onChange={(e) => {
                    const updatedOptions = [...editedNode.options];
                    updatedOptions[index].text = e.target.value;
                    setEditedNode({ ...editedNode, options: updatedOptions });
                  }}
                />
                <input
                  type="text"
                  placeholder="Next Node ID"
                  className="p-1 border border-gray-300 rounded"
                  value={option.nextNodeId || ''}
                  onChange={(e) => {
                    const updatedOptions = [...editedNode.options];
                    updatedOptions[index].nextNodeId = e.target.value;
                    setEditedNode({ ...editedNode, options: updatedOptions });
                  }}
                />
              </div>
              <button
                className="ml-2 p-1 text-red-600 hover:text-red-800"
                onClick={() => removeOption(option.id)}
              >
                ✕
              </button>
            </div>
          ))}
          
          {!editedNode.isLeaf && (
            <div className="mt-4 p-3 border border-dashed border-gray-300 rounded">
              <h5 className="text-sm font-medium mb-2">Add New Option:</h5>
              <div className="grid grid-cols-3 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="ID"
                  className="p-1 border border-gray-300 rounded"
                  value={newOption.id}
                  onChange={(e) => setNewOption({ ...newOption, id: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Text"
                  className="p-1 border border-gray-300 rounded"
                  value={newOption.text}
                  onChange={(e) => setNewOption({ ...newOption, text: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Next Node ID"
                  className="p-1 border border-gray-300 rounded"
                  value={newOption.nextNodeId || ''}
                  onChange={(e) => setNewOption({ ...newOption, nextNodeId: e.target.value })}
                />
              </div>
              <button
                className="mt-1 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={addOption}
              >
                Add Option
              </button>
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={() => {
              setEditMode(false);
              setSelectedNode(null);
            }}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => onSave(editedNode)}
          >
            Save
          </button>
        </div>
      </div>
    );
  };

  if (!isAuthenticated) {
    return <div className="container mx-auto p-6">Checking authentication...</div>;
  }

  if (loading && !decisionTreeData) {
    return <div className="container mx-auto p-6">Loading decision tree data...</div>;
  }

  if (error && !decisionTreeData) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => router.refresh()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Decision Tree Admin</h1>
        <div className="flex space-x-4">
          <Link href="/" className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            Back to Site
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Log Out
          </button>
          <button
            onClick={() => {
              setSelectedNode({
                id: '',
                question: '',
                options: [],
              });
              setEditMode(true);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add New Node
          </button>
          <button
            onClick={saveDecisionTree}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          {error}
        </div>
      )}

      {editMode && selectedNode && (
        <div className="mb-8">
          <NodeEditor 
            node={selectedNode} 
            onSave={selectedNode.id ? updateNode : addNode}
            isNew={!selectedNode.id} 
          />
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Node ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Options</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {decisionTreeData?.nodes.map((node) => (
              <tr key={node.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{node.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{node.question}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {node.isLeaf ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Leaf (Result)
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Question
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{node.options.length}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedNode(node);
                      setEditMode(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteNode(node.id)}
                    className="text-red-600 hover:text-red-900"
                    disabled={node.id === 'root'}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 