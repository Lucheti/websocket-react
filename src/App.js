import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { textChanged } from './constants'


const client = new W3CWebSocket('ws://localhost:8000');

function App() {

  const [text, setText] = useState("")

  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      console.log(message)
      const { data } = message
      const { data: data2, type } = JSON.parse(data)
      if(type === textChanged) setText(data2)
    };
  },[])

  const handleChange = (evt) => {
    client.send(JSON.stringify({type: textChanged, data: evt.target.value }))
  }

  return (
    <div className="App">
      <header className="App-header">
        <textarea value={text} onChange={ handleChange }/>
      </header>
    </div>
  );
}

export default App;
