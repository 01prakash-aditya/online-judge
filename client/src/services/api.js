const API_BASE_URL = 'http://localhost:8000';

export const compileAndRun = async (language = 'cpp', code) => {
  try {
    const response = await fetch(`${API_BASE_URL}/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language,
        code,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Compilation failed');
    }

    const data = await response.json();
    return {
      success: true,
      output: data.output,
      filePath: data.filePath
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};