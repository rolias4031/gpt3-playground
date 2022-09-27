import React from 'react';
import Display from '../components/Display';
import InterfaceForm from '../components/InterfaceForm';
import { useDialogue } from '../lib/hooks';

export default function Home() {
  const { dialogue, setDialogue } = useDialogue();
  return (
    <>
      <Display curState={dialogue} />
      <InterfaceForm curState={dialogue} raiseState={setDialogue} />
    </>
  );
}
