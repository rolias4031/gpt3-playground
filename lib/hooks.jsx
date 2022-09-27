import { useEffect, useState } from 'react';

/*
* this hook:
1. create state variables for dialogue.
2. get the localStorage dialogue after render and push that to state
3. define a function for turning dialogue to array of text
*/
export const useManageDialogue = () => {
  class Entry {
    // takes info = { text, from, timestamp }
    constructor(text, from, timestamp) {
      this.text = text;
      this.from = from;
      this.timestamp = timestamp;
    }
  }
  function getDialogueText(dialogue) {
    return dialogue.map((entry) => entry.text);
  }
  function addEntriesToDialogue(userText, userFrom, aiText, aiFrom) {
    const ls = window.localStorage;
    // create new entries
    const timestamp = Date();
    const userEntry = new Entry(userText, userFrom, timestamp);
    const aiEntry = new Entry(aiText, aiFrom, timestamp);
    // get existing dialogue, push to existing dialogue
    let dialogueRaw = JSON.parse(ls.getItem('dialogue'));
    dialogueRaw.push(userEntry, aiEntry);
    // save newDialogue to localStorage
    ls.setItem('dialogue', JSON.stringify(dialogueRaw));
    setDialogue(() => dialogueRaw);
  }
  function createNewDialogue() {
    const newDialogue = [];
    setDialogue(() => newDialogue);
    window.localStorage.setItem('dialogue', JSON.stringify(newDialogue));
  }
  const [dialogue, setDialogue] = useState();

  useEffect(() => {
    let dialogue = window.localStorage.getItem('dialogue');
    if (!dialogue) {
      createNewDialogue();
    } else {
      dialogue = JSON.parse(dialogue);
      setDialogue(() => dialogue);
    }
  }, []);
  return { dialogue, addEntriesToDialogue, createNewDialogue, getDialogueText };
};
