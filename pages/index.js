import React from 'react';
import Display from '../components/Display';
import Interface from '../components/Interface';
import { useDialogue } from '../lib/hooks';

export default function Home() {
  const { dialogue, setDialogue } = useDialogue();
  return (
    <>
      <div className='w-5/6 md:w-1/2 mx-auto mt-20'>
        <Display curState={dialogue} />
      </div>
      <div className='w-5/6 md:w-1/2 mx-auto'>
        <Interface curState={dialogue} raiseState={setDialogue} />
      </div>
    </>
  );
}
