import { useEffect, useState } from 'react';

export const useDialogue = () => {
  const [dialogue, setDialogue] = useState([]);
  const { createNewDialogue } = useManageDialogue();
  useEffect(() => {
    let dialogue = window.localStorage.getItem('dialogue');
    if (!dialogue) {
      createNewDialogue();
    } else {
      dialogue = JSON.parse(dialogue);
      setDialogue(() => dialogue);
    }
  }, []);
  return { dialogue, setDialogue };
};

/*
* this hook:
1. manages the dialogue state from useDialogue
2. accepts as arguments the getter and setter from useDialogue
*/
export const useManageDialogue = (state, raiseState) => {
  class Entry {
    // takes info = { text, from, timestamp }
    constructor(text, from, timestamp) {
      this.text = text;
      this.from = from;
      this.timestamp = timestamp;
    }
  }

  function addEntriesToDialogue(userText, userFrom, aiText, aiFrom) {
    const ls = window.localStorage;
    // create new entries
    const timestamp = Date();
    const userEntry = new Entry(userText, userFrom, timestamp);
    const aiEntry = new Entry(aiText, aiFrom, timestamp);
    // create new dialogue with entries, raiseState, then save to LS
    let newDialogue = [...state, userEntry, aiEntry];
    raiseState(() => newDialogue);
    ls.setItem('dialogue', JSON.stringify(newDialogue));
    return newDialogue;
  }

  function createNewDialogue() {
    const newDialogue = [];
    raiseState(() => newDialogue);
    window.localStorage.setItem('dialogue', JSON.stringify(newDialogue));
  }

  return { addEntriesToDialogue, createNewDialogue };
};
