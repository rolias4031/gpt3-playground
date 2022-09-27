import React, { useState } from 'react';
import PropTypes from 'prop-types';

/*
* EVENTUALLY: conversation state to be an array of objects -> { message: String, timestamp: Date, from: User || GPT3 } this allows tracking of conversation, saving, etc.
* map through conversation to display chat in decorated <p> tags
* eventually, need a way to store prompts. supabase or just fs

* for now: conversation is object with input and response
*/

function Display({ curState }) {
  console.log(curState);
  let dialogueContent;
  if (curState) {
    dialogueContent = curState.map((entry) => {
      const entryClass = `${
        entry.from === 'user' ? 'text-gray-600' : 'text-gray-800'
      }`;
      return (
        <p className={`${entryClass}`} key={`${entry.timestamp}-${entry.from}`}>
          {entry.text}
        </p>
      );
    });
  }
  return <div>{dialogueContent}</div>;
}

Display.propTypes = {
  curState: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};

export default Display;
