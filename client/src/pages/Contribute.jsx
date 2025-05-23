import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Contribute() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'Easy',
    category: 'Array',
    inputFormat: '',
    outputFormat: '',
    constraints: '',
    sampleInput: '',
    sampleOutput: '',
    explanation: '',
    testCases: [{ input: '', output: '' }]
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const difficulties = ['Easy', 'Medium', 'Hard'];
  const categories = [
    'Array', 'String', 'Linked List', 'Stack', 'Queue', 'Tree', 
    'Graph', 'Dynamic Programming', 'Greedy', 'Backtracking', 
    'Sorting', 'Searching', 'Math', 'Bit Manipulation'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = [...formData.testCases];
    updatedTestCases[index][field] = value;
    setFormData({
      ...formData,
      testCases: updatedTestCases
    });
  };

  const addTestCase = () => {
    setFormData({
      ...formData,
      testCases: [...formData.testCases, { input: '', output: '' }]
    });
  };

  const removeTestCase = (index) => {
    if (formData.testCases.length > 1) {
      const updatedTestCases = formData.testCases.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        testCases: updatedTestCases
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Get API URL from environment or use relative path
      const apiUrl = process.env.REACT_APP_API_URL || '';
      
      const response = await fetch(`${apiUrl}/api/problems/contribute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser?.token || ''}` // Include auth token if available
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify({
          ...formData,
          contributedBy: currentUser?._id || currentUser?.id
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit problem');
      }

      setSuccess('Problem submitted successfully! It will be reviewed before being added to the problemset.');
      setFormData({
        title: '',
        description: '',
        difficulty: 'Easy',
        category: 'Array',
        inputFormat: '',
        outputFormat: '',
        constraints: '',
        sampleInput: '',
        sampleOutput: '',
        explanation: '',
        testCases: [{ input: '', output: '' }]
      });

    } catch (err) {
      console.error('Error submitting problem:', err);
      setError(err.message || 'Failed to submit problem. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Redirect if not logged in
  if (!currentUser) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center'>
          <h2 className='text-2xl font-bold mb-4 text-slate-800'>Login Required</h2>
          <p className='text-slate-600 mb-6'>You need to be logged in to contribute problems.</p>
          <button
            onClick={() => navigate('/sign-in')}
            className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700'
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto px-4'>
        <div className='bg-white rounded-lg shadow-md p-8'>
          <h1 className='text-3xl font-bold mb-2 text-slate-800'>Contribute a Problem</h1>
          <p className='text-slate-600 mb-8'>
            Help grow our problem bank by contributing high-quality algorithmic challenges.
          </p>

          {error && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6'>
              {error}
            </div>
          )}

          {success && (
            <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6'>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Basic Information */}
            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'>
                  Problem Title *
                </label>
                <input
                  type='text'
                  id='title'
                  value={formData.title}
                  onChange={handleChange}
                  className='w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='e.g., Two Sum'
                  required
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>
                    Difficulty *
                  </label>
                  <select
                    id='difficulty'
                    value={formData.difficulty}
                    onChange={handleChange}
                    className='w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                  >
                    {difficulties.map(diff => (
                      <option key={diff} value={diff}>{diff}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>
                    Category *
                  </label>
                  <select
                    id='category'
                    value={formData.category}
                    onChange={handleChange}
                    className='w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Problem Description */}
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Problem Description *
              </label>
              <textarea
                id='description'
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className='w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Describe the problem clearly with examples...'
                required
              />
            </div>

            {/* Input/Output Format */}
            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'>
                  Input Format *
                </label>
                <textarea
                  id='inputFormat'
                  value={formData.inputFormat}
                  onChange={handleChange}
                  rows={3}
                  className='w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Describe the input format...'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'>
                  Output Format *
                </label>
                <textarea
                  id='outputFormat'
                  value={formData.outputFormat}
                  onChange={handleChange}
                  rows={3}
                  className='w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Describe the expected output format...'
                  required
                />
              </div>
            </div>

            {/* Constraints */}
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Constraints *
              </label>
              <textarea
                id='constraints'
                value={formData.constraints}
                onChange={handleChange}
                rows={3}
                className='w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='e.g., 1 ≤ n ≤ 10^5, 1 ≤ arr[i] ≤ 10^9'
                required
              />
            </div>

            {/* Sample Input/Output */}
            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'>
                  Sample Input *
                </label>
                <textarea
                  id='sampleInput'
                  value={formData.sampleInput}
                  onChange={handleChange}
                  rows={4}
                  className='w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Provide sample input...'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'>
                  Sample Output *
                </label>
                <textarea
                  id='sampleOutput'
                  value={formData.sampleOutput}
                  onChange={handleChange}
                  rows={4}
                  className='w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Expected output for sample input...'
                  required
                />
              </div>
            </div>

            {/* Explanation */}
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Explanation
              </label>
              <textarea
                id='explanation'
                value={formData.explanation}
                onChange={handleChange}
                rows={4}
                className='w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Explain the sample case (optional)...'
              />
            </div>

            {/* Test Cases */}
            <div>
              <div className='flex justify-between items-center mb-4'>
                <label className='block text-sm font-medium text-slate-700'>
                  Additional Test Cases
                </label>
                <button
                  type='button'
                  onClick={addTestCase}
                  className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm'
                >
                  Add Test Case
                </button>
              </div>

              {formData.testCases.map((testCase, index) => (
                <div key={index} className='border border-slate-200 rounded-lg p-4 mb-4'>
                  <div className='flex justify-between items-center mb-3'>
                    <h4 className='font-medium text-slate-700'>Test Case {index + 1}</h4>
                    {formData.testCases.length > 1 && (
                      <button
                        type='button'
                        onClick={() => removeTestCase(index)}
                        className='text-red-600 hover:text-red-800 text-sm'
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className='grid md:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm text-slate-600 mb-1'>Input</label>
                      <textarea
                        value={testCase.input}
                        onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                        rows={3}
                        className='w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                        placeholder='Test case input...'
                      />
                    </div>
                    
                    <div>
                      <label className='block text-sm text-slate-600 mb-1'>Expected Output</label>
                      <textarea
                        value={testCase.output}
                        onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
                        rows={3}
                        className='w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                        placeholder='Expected output...'
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className='flex justify-center'>
              <button
                type='submit'
                disabled={loading}
                className={`px-8 py-3 rounded-lg font-medium ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white transition duration-200`}
              >
                {loading ? 'Submitting...' : 'Submit Problem'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}