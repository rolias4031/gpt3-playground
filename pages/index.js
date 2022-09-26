import React, { useState } from 'react';
import Display from '../components/Display';
import InterfaceForm from '../components/InterfaceForm';

export default function Home() {
  const [response, setResponse] = useState();
  return (
    <>
      <Display curState={response} />
      <InterfaceForm raiseState={setResponse} />
    </>
  );
}
