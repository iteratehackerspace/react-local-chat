'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {server_addr} from './globals';

export default
class MsgInput extends React.Component {
  constructor(){
    super();
    this.click_handler = this.click_handler.bind(this);
    this.form_changed = this.form_changed.bind(this);
    this.state = {msg : ''};

  }

   async click_handler(event) {
    if(event.button == 0 || event.key == 'Enter') {
      let req_opts = {
        method:'post',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        body:JSON.stringify({'msg':this.state.msg})
      };
      let request = server_addr + '/message'
      await fetch(request, req_opts);
      this.props.updater(this.state.msg);
      this.setState({msg: ''});
  }

  }



  form_changed (e) {
    const letter = e.currentTarget.value;
    this.setState({msg:letter});
  }

  render() {
    let sendMsgButton = {
      backgroundColor: '#4CAF50',
      border: 'none',
      width: '90%',
      height: '1.5rem',
      color: 'white',
      margin: '.25rem',
      justifyContent: 'center',
      borderRadius: '5px'
    };

    let msgContainer = {
      display: 'inline',
      flexDirection: 'column',
      width: '100%',
      postition: 'fixed',
      bottom: '0px'

    };
    let textInput = {
      display: 'flex',
      justifyContent: 'center',
      width: '90%',
      height: '1rem'


    };
//
    return (
      <div style = {msgContainer}>
        <input type="text"
                style={textInput}
                onChange={this.form_changed}
                value={this.state.msg} onKeyDown = {this.click_handler} />
        <button style = {sendMsgButton} onClick = {this.click_handler}>
	        Send
        </button>
      </div>
    );
  }
}
