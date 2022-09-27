export default async function handler(req, res) {
  console.log(req.body, typeof req.body);
  const inputs = JSON.parse(req.body);
  // config request
  const url = 'https://api.openai.com/v1/completions';
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: inputs.model,
      prompt: inputs.prompt,
      max_tokens: inputs.max_tokens,
    }),
  };
  // make request
  try {
    const response = await fetch(url, fetchOptions);
    const result = await response.json();
    console.log(result);
    if (!response.ok) {
      throw new Error(result.message);
    }
    return res.status(200).json({
      message: 'Success',
      ai_response: result,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
