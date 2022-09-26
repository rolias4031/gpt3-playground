import React, { useState } from 'react'

/*
* EVENTUALLY: conversation state to be an array of objects -> { message: String, timestamp: Date, from: User || GPT3 } this allows tracking of conversation, saving, etc.
* map through conversation to display chat in decorated <p> tags
* eventually, need a way to store prompts. supabase or just fs

* for now: conversation is object with input and response
*/

function Display({ curState }) {
  return (
    <p>{curState}</p>
  )
}

export default Display