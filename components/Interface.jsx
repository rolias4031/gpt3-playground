import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CogIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import { useManageDialogue } from '../lib/hooks';
import { useMakeCompletion } from '../lib/mutations';
import InterfaceFormSettings from './InterfaceFormSettings';
import IsLoading from './IsLoading';

/*
* DUTIES: 
- make mutation to openAPI using useMakeCompletion hook
- raises data to state
- conditionally renders children after success.

*/

function Interface({ curState, raiseState }) {
  const { addEntriesToDialogue, createNewDialogue } = useManageDialogue(
    curState,
    raiseState,
  );
  const [textareaInput, setTextareaInput] = useState('');
  const [settings, setSettings] = useState({
    on: false,
    conversationMode: false,
  });
  const { mutate, isLoading, isSuccess, data } = useMakeCompletion();

  function submitHandler(event) {
    event.preventDefault();
    // combine existing dialogue with new input to continue context. should
    const config = { prompt: textareaInput };
    mutate(config, {
      onSuccess: (data, variables) => {
        // add two entries to localStorage and update dialogue state
        const newDialogue = addEntriesToDialogue(
          variables.prompt,
          'user',
          data.ai_response.choices[0].text,
          'ai',
        );
        // resetTextareaInput
        setTextareaInput('');
      },
    });
  }
  function toggleHandler() {
    setSettings((prev) => ({ ...prev, on: !prev.on }));
  }
  return (
    <>
      {isLoading && <IsLoading message="GPT-3 is thinking..."/>}
      <form onSubmit={submitHandler} className="border-black mx-auto">
        <textarea
          onChange={(event) => setTextareaInput(event.target.value)}
          className="border-gray-800 focus:border-yellow-500 border-2 rounded w-full h-36 p-2 mx-auto my-5 block"
          value={textareaInput}
        ></textarea>
        <div className="items-center flex">
          <button
            onClick={toggleHandler}
            className="rounded mr-auto"
            type="button"
          >
            <AdjustmentsHorizontalIcon
              className={`w-9 h-9 ${settings.on ? 'text-gray-800' : 'text-gray-400'}`}
            />
          </button>
          <button
            onClick={() => createNewDialogue()}
            className="bg-gray-400 text-gray-100 btn"
            type="button"
          >
            Clear
          </button>
          <input
            className="bg-gray-800 text-gray-100 btn ml-2"
            type="submit"
            value="Send"
          />
        </div>
        <InterfaceFormSettings visible={settings.on} />
      </form>
    </>
  );
}

Interface.propTypes = {
  raiseState: PropTypes.func.isRequired,
  curState: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default Interface;
