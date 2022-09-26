async function sendCompletionData(options) {
  console.log(process.env.OPENAI_API_KEY)
  const url = 'https://api.openai.com/v1/completions'
  const fetchOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: options.model,
      prompt: options.prompt,
    }),
  }
  const response = await fetch(url, fetchOptions)
  const result = await response.json()
  console.log(result);
  if (!response.ok) {
    throw new Error(result.message)
  }
  return result
}