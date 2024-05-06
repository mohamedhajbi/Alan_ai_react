const API_KEY = "AIzaSyBTWYZ7YqIBL85_HXeE8waA-pucJQMJoX8";
const MODEL_NAME = "gemini-1.5-pro-latest";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY;

const headers = {
  "Content-Type": "application/json",
  "User-Agent": "Alan AI",
};

intent('(Ask|) Gemini about $(query* (.*))', async (p, { query }) => {
  try {
    const data = {
      "contents": [
        {
          "parts": [
            {
              "text": query.value
            }
          ]
        }
      ]
    };

    const response = await api.request({
      url: API_URL,
      method: 'POST',
      headers,
      body: JSON.stringify(data),
      
    });

    const completionText = response.results[0].completion_text.trim();
    console.log(data)
    console.log("aaaaaaaaaaaaaaaaaaaaaaa")
    console.log(completionText)
    p.play({ command: 'text', text: completionText });
    p.play(`Here is the response from Gemini: ${completionText}`);

  } catch (error) {
    console.error('API Request Error:', error);
    p.play('Sorry, I encountered an error while processing your request.');
  }
});
