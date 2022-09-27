import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useManageDialogue } from '../lib/hooks';
import { useMakeCompletion } from '../lib/mutations';

/*
* DUTIES: 
- make mutation to openAPI using useMakeCompletion hook
- raises data to state
- conditionally renders children after success.

*/

function InterfaceForm({ raiseState }) {
  const { dialogue, addEntriesToDialogue, createNewDialogue } =
    useManageDialogue(raiseState);
  console.log('form', dialogue);

  const [textareaInput, setTextareaInput] = useState();
  const { mutate, isLoading, isSuccess, data } = useMakeCompletion();

  function submitHandler(event) {
    event.preventDefault();
    const config = { textareaInput };
    mutate(config, {
      onSuccess: (data, variables) => {
        // add two entries to localStorage and update dialogue state
        const newDialogue = addEntriesToDialogue(
          variables.textareaInput,
          'user',
          data.ai_response.choices[0].text,
          'ai',
        );
        // resetTextareaInput
        setTextareaInput('');
        // raise dialogue for Display
        raiseState(() => newDialogue);
        console.log('mutate', dialogue);
      },
    });
  }
  function changeHandler(event) {
    setTextareaInput(event.target.value);
  }
  function clearHandler() {
    // just want to reset dialogue, not remove it.
    createNewDialogue();
  }
  return (
    <>
      <form
        onSubmit={submitHandler}
        className="lg:w-1/3 md:w-1/2 border-black mx-auto"
      >
        <textarea
          onChange={changeHandler}
          className="border-gray-400 border-2 rounded w-full h-36 p-2 mx-auto my-5 block"
          value={textareaInput}
        ></textarea>
        <div className="text-right">
          <button
            onClick={clearHandler}
            className="rounded bg-gray-600 text-white px-3 py-1"
            type="button"
          >
            Clear
          </button>
          <input
            className="rounded bg-black text-white px-3 py-1 ml-2"
            type="submit"
            value="Send"
          />
        </div>
      </form>
    </>
  );
}

InterfaceForm.propTypes = {
  raiseState: PropTypes.func.isRequired,
};

export default InterfaceForm;
