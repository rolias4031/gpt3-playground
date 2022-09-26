import { useMutation } from 'react-query';

async function sendCompletionData(config) {
  const url = '/api/completion';
  const fetchOptions = {
    method: 'POST',
    body: JSON.stringify({
      model: 'text-ada-001',
      prompt: config.promptInput,
      max_tokens: 100,
    }),
  };
  const response = await fetch(url, fetchOptions);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
}

export const useMakeCompletion = () => {
  return useMutation(sendCompletionData, {
    onSuccess: (data, variables) => {
      variables.raiseState(() => {
        return data.ai_response.choices[0].text;
      });
    },
  });
};
