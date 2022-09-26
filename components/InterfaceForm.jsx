import React, { useState } from 'react';
import { useMakeCompletion } from '../lib/mutations';

/*
* DUTIES: 
- make mutation to openAPI using useMakeCompletion hook
- raises data to state
- conditionally renders children after success.

*/

function InterfaceForm({ raiseState }) {
  const [promptInput, setPromptInput] = useState('')
  const { mutate, isLoading, isSuccess, isError, data } = useMakeCompletion()

  function submitHandler(event) {
    event.preventDefault()
    const config = { promptInput, raiseState }
    mutate(config)
  }
  function changeHandler(event) {
    setPromptInput(event.target.value)
  }
  return (
    <>
      <form onSubmit={submitHandler} className="lg:w-1/3 md:w-1/2 border-black mx-auto">
        <textarea onChange={changeHandler} className="border-gray-400 border-2 rounded w-full h-36 p-2 mx-auto my-5 block"></textarea>
        <input
          className="rounded bg-black text-white px-3 py-1 block ml-auto"
          type="submit"
          value="Send"
        />
      </form>
    </>
  );
}

export default InterfaceForm;
