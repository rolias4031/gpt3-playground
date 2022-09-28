import React, { useState } from 'react';
import PropTypes from 'prop-types';

/*
input id format: [inputType]-[info]-[location] -> check-conversationMode-interface
*/

function InterfaceFormSettings({ visible }) {
  const [modelInput, setModelInput] = useState('ada');
  const [modeInput, setModeInput] = useState('conversation');

  const modelButtons = ['ada', 'babbage', 'curie', 'davinci'].map((model) => {
    const btnStyle = model === modelInput ? 'text-yellow-200' : 'text-gray-400';
    return (
      <button
        onClick={(event) => setModelInput(event.target.name)}
        key={model}
        name={model}
        type="button"
        className={`font-medium ${btnStyle}`}
      >
        {model}
      </button>
    );
  });

  const modeButtons = ['conversation', 'single'].map((mode) => {
    const btnStyle = mode === modeInput ? 'text-yellow-200' : 'text-gray-400';
    return (
      <button
        onClick={(event) => setModeInput(event.target.name)}
        key={mode}
        name={mode}
        type="button"
        className={`font-medium ${btnStyle}`}
      >
        {mode}
      </button>
    );
  });
  return (
    <div
      className={`flex flex-col mt-5 p-3 space-y-2 bg-gray-800 rounded ${
        !visible && 'hidden'
      }`}
    >
      <div className="flex items-center">
        <label className="w-44 label" htmlFor="">
          GPT-3 Model
        </label>
        <div className="flex space-x-4" role="group">
          {modelButtons}
        </div>
      </div>
      <div className="flex items-center">
        <label className="w-44 label" htmlFor="">
          Mode
        </label>
        <div className="flex space-x-4">
          {modeButtons}
        </div>
      </div>
      <div className="flex items-center">
        <label className="w-44 label" htmlFor="">
          Temperature
        </label>
        <input
          className="appearance-none rounded-full w-20 h-2 p-0 accent-gray-400 border-black bg-gray-100"
          type="range"
          id="slider-temperature-interface"
          name="temperature"
        />
      </div>
    </div>
  );
}

InterfaceFormSettings.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default InterfaceFormSettings;
