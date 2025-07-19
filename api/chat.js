// This file goes in: api/chat.js
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // Debug: Check if API key is present
  if (!process.env.CLAUDE_API_KEY) {
    console.error('CLAUDE_API_KEY is not set in environment variables');
    return res.status(500).json({ 
      error: 'Server configuration error: API key not found. Please set CLAUDE_API_KEY in Vercel environment variables.' 
    });
  }
  
  // Log that we have an API key (but not the key itself)
  console.log('API Key present:', process.env.CLAUDE_API_KEY ? 'Yes' : 'No');
  console.log('API Key length:', process.env.CLAUDE_API_KEY?.length);
  
  const { action, message, conversationHistory, captureData } = req.body;
  
  // Available models:
  // - claude-3-haiku-20240307: Fast, efficient for quick tasks
  // - claude-3-5-sonnet-20241022: Balanced performance and capability
  // - claude-3-opus-20240229: Most capable Claude 3 model
  
  try {
    // Different actions based on request type
    switch (action) {
      case 'chat':
        return handleChat(req, res, message, conversationHistory);
      case 'analyze':
        return handleAnalyze(req, res, conversationHistory, captureData);
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Failed to process request',
      details: error.message 
    });
  }
}

// Handle regular chat messages
async function handleChat(req, res, message, conversationHistory) {
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  // Get model from request or use default
  const model = req.body.model || 'claude-3-5-sonnet-20241022';
  
  console.log('Chat request:', { 
    messageLength: message.length, 
    historyLength: conversationHistory?.length || 0,
    model: model 
  });
  
  try {
    // Build messages array with conversation history
    const messages = [
      {
        role: 'system',
        content: `You are Meno, an AI assistant named after the character in Plato's dialogue about learning. 
        You help people solve problems through thoughtful questioning and clear explanations. 
        You work with all kinds of users - students, professionals, researchers, and lifelong learners.
        Be concise, helpful, and encouraging. When users solve problems, encourage them to capture their learnings.
        Use the Socratic method when appropriate to deepen understanding.`
      }
    ];
    
    // Add conversation history
    if (conversationHistory && conversationHistory.length > 0) {
      conversationHistory.forEach(msg => {
        messages.push({
          role: msg.role,
          content: msg.content
        });
      });
    }
    
    // Add current message
    messages.push({
      role: 'user',
      content: message
    });
    
    // Call Claude API
    console.log('Calling Claude API with model:', model);
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: model,
        max_tokens: 1000,
        messages: messages
      })
    });
    
    console.log('Claude API response status:', response.status);
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Claude API error:', data);
      // More detailed error information
      if (data.error?.type === 'authentication_error') {
        return res.status(500).json({ error: 'API authentication failed. Please check your CLAUDE_API_KEY.' });
      } else if (data.error?.type === 'invalid_request_error') {
        return res.status(500).json({ error: 'Invalid request to Claude API: ' + (data.error?.message || 'Unknown error') });
      } else if (data.error?.type === 'rate_limit_error') {
        return res.status(500).json({ error: 'Rate limit exceeded. Please try again later.' });
      }
      return res.status(500).json({ error: 'Claude API error: ' + (data.error?.message || JSON.stringify(data)) });
    }
    
    return res.status(200).json({ 
      response: data.content[0].text 
    });
  } catch (error) {
    console.error('Error in handleChat:', error);
    return res.status(500).json({ error: 'Failed to connect to AI service' });
  }
}

// Handle capture analysis and enhancement
async function handleAnalyze(req, res, conversationHistory, captureData) {
  if (!captureData) {
    return res.status(400).json({ error: 'Capture data is required' });
  }
  
  // Get model from request or use default
  const model = req.body.model || 'claude-3-5-sonnet-20241022';
  
  try {
    // Create analysis prompt
    const analysisPrompt = `Based on this conversation and the user's capture, provide learning enhancements.

Conversation context:
${conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

User's capture:
- Problem: ${captureData.problem}
- Cause: ${captureData.cause}
- Solution: ${captureData.solution}
- Intended audience: ${captureData.audience}

Please provide:
1. An assessment of how well their summary captures the essence of the conversation
2. A Socratic question specific to their audience (${captureData.audience === 'team' ? 'their team' : captureData.audience === 'future' ? 'their future self' : 'new hires'})
3. The key learning principle from this experience
4. Any suggestions if they missed important aspects

Format your response as JSON with these fields:
{
  "alignment": "assessment of their summary",
  "socraticQuestion": "a thoughtful question for deeper understanding",
  "keyLearning": "the main principle or insight",
  "suggestions": "any recommendations or missing elements"
}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: model,
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: analysisPrompt
          }
        ]
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Claude API error:', data);
      // More detailed error information for analyze endpoint
      if (data.error?.type === 'authentication_error') {
        return res.status(500).json({ error: 'API authentication failed. Please check your CLAUDE_API_KEY.' });
      } else if (data.error?.type === 'invalid_request_error') {
        return res.status(500).json({ error: 'Invalid request to Claude API: ' + (data.error?.message || 'Unknown error') });
      } else if (data.error?.type === 'rate_limit_error') {
        return res.status(500).json({ error: 'Rate limit exceeded. Please try again later.' });
      }
      return res.status(500).json({ error: 'Claude API error: ' + (data.error?.message || JSON.stringify(data)) });
    }
    
    // Parse the JSON response
    try {
      if (data.content && data.content[0] && data.content[0].text) {
        const analysis = JSON.parse(data.content[0].text);
        return res.status(200).json(analysis);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.error('Raw response:', data);
      // If JSON parsing fails, return structured response
      return res.status(200).json({
        alignment: "Your summary captures the key points well.",
        socraticQuestion: "What patterns might help prevent similar issues in the future?",
        keyLearning: "Understanding root causes leads to better solutions.",
        suggestions: "Consider adding specific metrics or tools used."
      });
    }
  } catch (error) {
    console.error('Error in handleAnalyze:', error);
    return res.status(500).json({ error: 'Failed to analyze capture' });
  }
}
