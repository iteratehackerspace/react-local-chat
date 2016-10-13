'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
export default
class MsgInput extends React.Component {

  constructor(){
    super();
    this.click_handler = this.click_handler.bind(this);
    this.form_changed = this.form_changed.bind(this);
    this.state = {msg : ''};

  }

   async click_handler(event) {
    let req_opts = {
      method:'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body:JSON.stringify({'msg':this.state.msg})
    };
    await fetch('http://192.168.1.216:8000/message', req_opts);
    this.props.updater(this.state.msg);
    this.setState({msg: ''});

  }

  form_changed (e) {
    const letter = e.currentTarget.value;
    this.setState({msg:letter});
  }

  render() {
    let msgButtonStyle = {
      backgroundColor: '#4CAF50',
      border: 'none',
      color: 'white',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '20px'}

    let msgDivStyle = {
      position: "fixed",
      bottom: "0",
      width: "90%"
    }
//
    return (
      <div style = {msgDivStyle}>
        <input type="text"
                onChange={this.form_changed}
                value={this.state.msg}/>
        <button style = {msgButtonStyle} onClick = {this.click_handler} >
	        Send
        </button>
      </div>
    );
  }
}
