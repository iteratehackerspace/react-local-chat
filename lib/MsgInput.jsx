'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
export default
class MsgInput extends React.Component {

  constructor(){
    super();
    this.click_handler = this.click_handler.bind(this);
  }

   async click_handler(event) {
    let req_opts = {
      method:'post',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({'msg':'123'})
    };
    await fetch('http://localhost:8000/message', req_opts);
  }

  render() {
    let msgButtonStyle = {
      backgroundColor: '#4CAF50',
      border: 'none',
      color: 'white',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '20'}

    let msgDivStyle = {
      position: "fixed",
      bottom: "0",
      width: "90%"
    }

    return (
      <div style = {msgDivStyle}>
        <input type = "text" placeholder = "Write your message here">
        </input>
        <button style = {msgButtonStyle} onClick = {this.click_handler}>
	        Send
        </button>
      </div>
    );
  }
}
