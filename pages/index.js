import React, { useState } from 'react';
import Display from '../components/Display';
import InterfaceForm from '../components/InterfaceForm';

export default function Home() {
  const [dialogue, setDialogue] = useState();
  return (
    <>
      <Display curState={dialogue} />
      <InterfaceForm raiseState={setDialogue} />
    </>
  );
}
