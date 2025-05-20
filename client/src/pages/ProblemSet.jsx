import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProblemSet() {
  const navigate = useNavigate();
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProblems, setFilteredProblems] = useState([]);
  
  const problems = [
    {
      id: 1,
      title: "Hello World",
      description: "Write a program that prints 'Hello World' to the console.",
      difficulty: "easy",
      rating: 50,
      tags: ["basics", "output"],
      defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}',
      testCases: [
        { input: '', expectedOutput: 'Hello World' }
      ]
    },
    {
      id: 2,
      title: "Sum of Two Numbers",
      description: "Given two integers as input, print their sum.",
      difficulty: "easy",
      rating: 50,
      tags: ["math", "basics"],
      defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    // Write your code here\n    return 0;\n}',
      testCases: [
        { input: '5 7', expectedOutput: '12' },
        { input: '10 -3', expectedOutput: '7' }
      ]
    },
    {
      id: 3,
      title: "Palindrome Check",
      description: "Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring case sensitivity.",
      difficulty: "moderate",
      rating: 100,
      tags: ["strings", "algorithms"],
      defaultCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nbool isPalindrome(string s) {\n    // Write your code here\n    return false;\n}\n\nint main() {\n    string s;\n    getline(cin, s);\n    if(isPalindrome(s))\n        cout << "true" << endl;\n    else\n        cout << "false" << endl;\n    return 0;\n}',
      testCases: [
        { input: 'A man, a plan, a canal: Panama', expectedOutput: 'true' },
        { input: 'race a car', expectedOutput: 'false' }
      ]
    },
    {
      id: 4,
      title: "Fibonacci Number",
      description: "Calculate the nth Fibonacci number. The Fibonacci sequence is defined as: F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n > 1.",
      difficulty: "moderate",
      rating: 100,
      tags: ["math", "recursion", "dynamic programming"],
      defaultCode: '#include <iostream>\nusing namespace std;\n\nint fibonacci(int n) {\n    // Write your code here\n    return 0;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << fibonacci(n) << endl;\n    return 0;\n}',
      testCases: [
        { input: '2', expectedOutput: '1' },
        { input: '5', expectedOutput: '5' },
        { input: '10', expectedOutput: '55' }
      ]
    },
    {
      id: 5,
      title: "Merge K Sorted Arrays",
      description: "Given K sorted arrays, merge them into a single sorted array.",
      difficulty: "difficult",
      rating: 150,
      tags: ["arrays", "heap", "divide and conquer"],
      defaultCode: '#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nvector<int> mergeKSortedArrays(vector<vector<int>>& arrays) {\n    // Write your code here\n    vector<int> result;\n    return result;\n}\n\nint main() {\n    int k;\n    cin >> k;\n    vector<vector<int>> arrays(k);\n    \n    for(int i = 0; i < k; i++) {\n        int size;\n        cin >> size;\n        arrays[i].resize(size);\n        for(int j = 0; j < size; j++) {\n            cin >> arrays[i][j];\n        }\n    }\n    \n    vector<int> result = mergeKSortedArrays(arrays);\n    for(int num : result) {\n        cout << num << " ";\n    }\n    cout << endl;\n    return 0;\n}',
      testCases: [
        { 
          input: '3\n3\n1 4 5\n2\n1 3\n2\n2 6', 
          expectedOutput: '1 1 2 3 4 5 6' 
        }
      ]
    }
  ];

  useEffect(() => {
    let filtered = [...problems];
    
    if (filterDifficulty !== 'all') {
      filtered = filtered.filter(problem => problem.difficulty === filterDifficulty);
    }
    
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(problem => 
        problem.title.toLowerCase().includes(query) || 
        problem.description.toLowerCase().includes(query) ||
        problem.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredProblems(filtered);
  }, [filterDifficulty, searchQuery]);

  const handleProblemClick = (problem) => {
    localStorage.setItem('selectedProblem', JSON.stringify(problem));
    navigate('/compiler');
  };
  
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-100';
      case 'difficult':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-slate-800">Problem Set</h1>
      
      {/* Filters and Search */}
      <div className="bg-slate-50 p-4 rounded-lg mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setFilterDifficulty('all')}
              className={`px-4 py-2 rounded-md ${filterDifficulty === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilterDifficulty('easy')}
              className={`px-4 py-2 rounded-md ${filterDifficulty === 'easy' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            >
              Easy (50)
            </button>
            <button 
              onClick={() => setFilterDifficulty('moderate')}
              className={`px-4 py-2 rounded-md ${filterDifficulty === 'moderate' ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}
            >
              Moderate (100)
            </button>
            <button 
              onClick={() => setFilterDifficulty('difficult')}
              className={`px-4 py-2 rounded-md ${filterDifficulty === 'difficult' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
            >
              Difficult (150)
            </button>
          </div>
          
          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
      
      {/* Problems Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProblems.map((problem) => (
              <tr key={problem.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{problem.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="font-medium text-gray-900">{problem.title}</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {problem.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{problem.rating}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleProblemClick(problem)}
                    className="text-blue-600 hover:text-blue-900 px-3 py-1 bg-blue-50 rounded-md hover:bg-blue-100"
                  >
                    Solve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredProblems.length === 0 && (
        <div className="text-center p-8 text-gray-500">
          No problems match your filters. Try adjusting your search criteria.
        </div>
      )}
      
      {/* Problem Examples Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">Featured Problem</h2>
        
        {filteredProblems.length > 0 && (
          <div className="bg-white p-5 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{filteredProblems[0].title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getDifficultyColor(filteredProblems[0].difficulty)}`}>
                    {filteredProblems[0].difficulty.charAt(0).toUpperCase() + filteredProblems[0].difficulty.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500">Rating: {filteredProblems[0].rating}</span>
                </div>
              </div>
              <button
                onClick={() => handleProblemClick(filteredProblems[0])}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Solve This Problem
              </button>
            </div>
            
            <div className="prose max-w-none">
              <p className="mb-4">{filteredProblems[0].description}</p>
              
              <div className="mt-6">
                <h4 className="text-lg font-medium mb-2">Example Test Cases:</h4>
                <div className="grid gap-4 mb-4">
                  {filteredProblems[0].testCases.map((testCase, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Input:</p>
                        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">{testCase.input || '(Empty)'}</pre>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Expected Output:</p>
                        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">{testCase.expectedOutput}</pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}