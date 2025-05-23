import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { compileAndRun } from '../services/api.js';

export default function Compiler() {
  const { currentUser } = useSelector((state) => state.user);
  const [code, setCode] = useState('#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, AlgoU!" << endl;\n    return 0;\n}');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('16px');
  const [language, setLanguage] = useState('cpp');
  const [statusMessage, setStatusMessage] = useState('');
  const [executionTime, setExecutionTime] = useState(null);
  const [memoryUsage, setMemoryUsage] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [testCaseIndex, setTestCaseIndex] = useState(0);
  const location = useLocation();

  const sampleProblems = [
    {
      id: 1,
      title: "Hello World",
      description: "Print 'Hello World' to the console.",
      defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}',
      testCases: [{ input: '', expectedOutput: 'Hello World' }]
    },
    {
      id: 2,
      title: "Sum of Two Numbers",
      description: "Given two integers as input, print their sum.",
      defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    // Write your code here\n    return 0;\n}',
      testCases: [
        { input: '5 7', expectedOutput: '12' },
        { input: '10 -3', expectedOutput: '7' }
      ]
    }
  ];

  useEffect(() => {
    const storedProblem = localStorage.getItem('selectedProblem');
    if (storedProblem) {
      try {
        const problem = JSON.parse(storedProblem);
        setSelectedProblem(problem);
        setCode(problem.defaultCode);
        if (problem.testCases && problem.testCases.length > 0) {
          setInput(problem.testCases[0].input);
        }
        setOutput('');
        setStatusMessage('');
        localStorage.removeItem('selectedProblem');
      } catch (error) {
        console.error("Error parsing problem from localStorage:", error);
      }
    }
  }, [location]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    return () => {
      document.removeEventListener('keydown', handleKeyboardShortcuts);
    };
  }, [code]); 

  const handleKeyboardShortcuts = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleCompile();
    }
  };

  const loadProblem = (problem) => {
    setSelectedProblem(problem);
    setCode(problem.defaultCode);
    if (problem.testCases && problem.testCases.length > 0) {
      setInput(problem.testCases[0].input);
      setTestCaseIndex(0);
    }
    setOutput('');
    setStatusMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleCompile = async () => {
  setIsCompiling(true);
  setStatusMessage('Compiling and executing...');
  setOutput('');

  try {
    const result = await compileAndRun( language, code);
    
    setOutput(result.output); 
    setStatusMessage('Success: Program executed successfully');
    
    if (selectedProblem && selectedProblem.testCases) {
      const expectedOutput = selectedProblem.testCases[testCaseIndex].expectedOutput.trim();
      const actualOutput = result.output.trim();
      
      if (actualOutput === expectedOutput) {
        setStatusMessage('Success: Correct output! Test case passed.');
      } else {
        setStatusMessage(`Error: Expected "${expectedOutput}", Got "${actualOutput}"`);
      }
    }
    
  } catch (error) {
    setOutput(`Error: ${error.message}`);
    setStatusMessage('Compilation failed');
  } finally {
    setIsCompiling(false);
  }
};
  
  const handleSaveSolution = () => {
    if (!currentUser) {
      setStatusMessage('Please sign in to save your solution');
      return;
    }
    
    setTimeout(() => {
      setStatusMessage('Solution saved successfully!');
      setTimeout(() => setStatusMessage(''), 3000);
    }, 500);
  };

  const handleTestCaseChange = (index) => {
    if (selectedProblem && selectedProblem.testCases && selectedProblem.testCases[index]) {
      setTestCaseIndex(index);
      setInput(selectedProblem.testCases[index].input);
      setOutput('');
    }
  };

  const runAllTestCases = async () => {
  if (!selectedProblem || !selectedProblem.testCases || selectedProblem.testCases.length === 0) {
    return;
  }

  setIsCompiling(true);
  setStatusMessage('Running all test cases...');
  setOutput('');

  let results = [];
  let allPassed = true;

  for (let i = 0; i < selectedProblem.testCases.length; i++) {
    const testCase = selectedProblem.testCases[i];
    
    try {
      const result = await compileAndRun(language, code);
      let passed = false;
      let output = '';

      if (result.success) {
        output = result.output.trim();
        passed = output === testCase.expectedOutput.trim();
      } else {
        output = `Error: ${result.error}`;
        passed = false;
      }

      results.push({ testCase, output, passed });
      if (!passed) allPassed = false;
    } catch (error) {
      results.push({ 
        testCase, 
        output: `Error: ${error.message}`, 
        passed: false 
      });
      allPassed = false;
    }
  }

  setIsCompiling(false);
  
  const resultsOutput = results.map((result, idx) => {
    return `Test Case ${idx + 1}: ${result.passed ? 'PASSED ✓' : 'FAILED ✗'}\n` +
           `Input: ${result.testCase.input || '(empty)'}\n` +
           `Expected: ${result.testCase.expectedOutput}\n` + 
           `Got: ${result.output}\n${'-'.repeat(40)}`;
  }).join('\n');
  
  setOutput(`${resultsOutput}\n\nSummary: ${results.filter(r => r.passed).length}/${results.length} test cases passed.`);
  setStatusMessage(allPassed ? 'Success: All test cases passed!' : 'Warning: Some test cases failed');
};

  const getProblemById = (id) => {
    const idNumber = parseInt(id);
    return [...sampleProblems, ...(selectedProblem ? [selectedProblem] : [])].find(p => p.id === idNumber) || null;
  };

  return (
    <div className="p-3 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-5">Online Compiler</h1>
      
      {/* Problem selection & controls */}
      <div className="bg-slate-50 rounded-lg p-4 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white border border-gray-300 rounded-md p-2 w-full md:w-40"
              >
                <option value="cpp">C++</option>
                <option value="java" disabled>Java (Coming soon)</option>
                <option value="python" disabled>Python (Coming soon)</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
              <select
                id="theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-white border border-gray-300 rounded-md p-2 w-full md:w-40"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
              <select
                id="fontSize"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="bg-white border border-gray-300 rounded-md p-2 w-full md:w-40"
              >
                <option value="14px">Small</option>
                <option value="16px">Medium</option>
                <option value="18px">Large</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="problem" className="block text-sm font-medium text-gray-700 mb-1">Problem</label>
            <select
              id="problem"
              onChange={(e) => {
                const id = parseInt(e.target.value);
                if (id === 0) {
                  setSelectedProblem(null);
                  setCode('#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, AlgoU!" << endl;\n    return 0;\n}');
                  setInput('');
                } else {
                  const problem = getProblemById(id);
                  if (problem) loadProblem(problem);
                }
              }}
              value={selectedProblem ? selectedProblem.id : "0"}
              className="bg-white border border-gray-300 rounded-md p-2 w-full md:w-60"
            >
              <option value="0">Free Coding (No Problem)</option>
              {sampleProblems.map(problem => (
                <option key={problem.id} value={problem.id}>{problem.title}</option>
              ))}
              {selectedProblem && !sampleProblems.some(p => p.id === selectedProblem.id) && (
                <option value={selectedProblem.id}>{selectedProblem.title}</option>
              )}
            </select>
          </div>
        </div>
      </div>
      
      {/* Problem description (if any) */}
      {selectedProblem && (
        <div className="bg-white rounded-lg p-4 shadow-md mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold mb-2">{selectedProblem.title}</h2>
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  selectedProblem.rating <= 50 ? 'bg-green-100 text-green-800' :
                  selectedProblem.rating <= 100 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedProblem.rating <= 50 ? 'Easy' :
                   selectedProblem.rating <= 100 ? 'Moderate' : 'Difficult'} ({selectedProblem.rating})
                </span>
                {selectedProblem.tags && selectedProblem.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {selectedProblem.testCases && selectedProblem.testCases.length > 1 && (
              <button 
                onClick={runAllTestCases}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Run All Test Cases
              </button>
            )}
          </div>
          
          <p className="text-gray-700 mb-4">{selectedProblem.description}</p>
          
          {selectedProblem.testCases && selectedProblem.testCases.length > 0 && (
            <div className="bg-slate-50 p-3 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-700">Test Cases:</h3>
                {selectedProblem.testCases.length > 1 && (
                  <div className="flex gap-1">
                    {selectedProblem.testCases.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleTestCaseChange(index)}
                        className={`px-2 py-1 text-xs rounded-full ${
                          testCaseIndex === index 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600">Input:</p>
                  <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">{selectedProblem.testCases[testCaseIndex].input || '(Empty)'}</pre>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Expected Output:</p>
                  <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">{selectedProblem.testCases[testCaseIndex].expectedOutput}</pre>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Code editor and execution area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Code editor */}
        <div className="lg:col-span-2">
          <div className="mb-2 flex justify-between items-center">
            <label htmlFor="code" className="font-medium text-gray-700">Code Editor</label>
            <div className="text-sm text-gray-500">Language: {language === 'cpp' ? 'C++' : language}</div>
          </div>
          <textarea
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`w-full h-64 font-mono p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}
            style={{ fontSize, minHeight: '350px', lineHeight: '1.4' }}
            spellCheck="false"
          ></textarea>
        </div>
        
        {/* Input/Output section */}
        <div className="lg:col-span-1">
          <div className="mb-4">
            <label htmlFor="input" className="block font-medium text-gray-700 mb-2">Input</label>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={`w-full p-3 border border-gray-300 rounded-lg h-28 ${
                theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
              }`}
              placeholder="Enter your input here..."
            ></textarea>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="output" className="font-medium text-gray-700">Output</label>
              {statusMessage && (
                <span className={`text-sm ${statusMessage.includes('Success') ? 'text-green-600' : statusMessage.includes('Error') ? 'text-red-600' : 'text-blue-600'}`}>
                  {statusMessage}
                </span>
              )}
            </div>
            <div
              id="output"
              className={`w-full p-3 border border-gray-300 rounded-lg h-40 overflow-y-auto font-mono text-sm ${
                theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
              }`}
            >
              {output ? (
                <pre>{output}</pre>
              ) : (
                <p className="text-gray-500 italic">Program output will appear here after execution.</p>
              )}
            </div>
          </div>
          
          {/* Execution stats */}
          {executionTime !== null && (
            <div className="flex gap-4 mb-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Time:</span> {executionTime}s
              </div>
              <div>
                <span className="font-medium">Memory:</span> {memoryUsage} KB
              </div>
            </div>
          )}
          
          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleCompile}
              disabled={isCompiling}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-70"
            >
              {isCompiling ? 'Compiling...' : 'Compile & Run'}
            </button>
            
            <button
              onClick={handleSaveSolution}
              className="flex-1 bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700"
            >
              Save Solution
            </button>
          </div>
        </div>
      </div>
      
      {/* Keyboard shortcuts & tips */}
      <div className="mt-8 bg-blue-50 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-blue-800 mb-2">Tips & Shortcuts</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
          <li>• Press <kbd className="bg-gray-100 px-1 rounded">Ctrl</kbd> + <kbd className="bg-gray-100 px-1 rounded">Enter</kbd> to compile and run</li>
          <li>• Currently supporting C++ (more languages coming soon)</li>
          <li>• Maximum execution time limit: 5 seconds</li>
          <li>• Memory limit: 512MB</li>
          <li>• Save your solutions to revisit them later</li>
          <li>• Solve questions to improve your rating</li>
        </ul>
      </div>
    </div>
  );
}