import { useMutation } from 'react-query';

async function sendCompletionData(config) {
  // variables passed on object b/c useMutation requires that.
  const url = '/api/completion';
  const fetchOptions = {
    method: 'POST',
    body: JSON.stringify({
      model: 'text-ada-001',
      prompt: config.promptInput,
      max_tokens: 100
    }),
  };
  const response = await fetch(url, fetchOptions);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
}

// onSuccess: mutation raises state, saves to localStorage
export const useMakeCompletion = () => {
  return useMutation(sendCompletionData);
};
