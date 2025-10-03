// HTTP CLIENT: Handles all API requests with consistent error handling
// Connects frontend components to backend services
const httpAction = async ({ url, method = 'GET', body = null }) => {
  try {
    const options = {
      method,
      headers: {},
    };

    // Handle FormData for file uploads
    if (body && !(body instanceof FormData)) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(body);
    } else if (body) {
      options.body = body; // FormData - let browser set headers
    }

    console.log('Making API request:', { url, method, body: options.body });
    
    // For demo purposes - simulate API response
    if (url === '/api/assignments' && method === 'GET') {
      return {
        success: true,
        assignments: [
          {
            id: 1,
            title: "Sample Assignment",
            description: "This is a sample assignment",
            dueDate: "2024-12-31",
            totalMarks: "100"
          }
        ]
      };
    }

    if (url === '/api/assignments' && method === 'POST') {
      console.log('Received assignment data:', body);
      return {
        success: true,
        message: "Assignment created successfully"
      };
    }

    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Request failed');
    }

    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.message || 'Network error');
  }
};

export default httpAction;