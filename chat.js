// This file goes in: api/chat.js
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get the message from the request body
  const { message, conversationHistory } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307', // Fast and cheap for demo
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content: `You are an AI assistant helping developers debug technical issues. Be concise and helpful. When users solve problems, encourage them to document their learnings. Current message: ${message}`
          }
        ]
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Claude API error:', data);
      return res.status(500).json({ error: 'Failed to get AI response' });
    }

    // Return the AI's response
    return res.status(200).json({ 
      response: data.content[0].text 
    });

  } catch (error) {
    console.error('Error calling Claude API:', error);
    return res.status(500).json({ 
      error: 'Failed to connect to AI service' 
    });
  }
}