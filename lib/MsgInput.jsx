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
    this.form_changed2 = this.form_changed2.bind(this);
    this.state = {msg : '', username: ''};
  }

  click_handler(event) {
    if ((event.button === 0 ||
	 event.key == 'Enter') &&
	this.state.msg !== '' && this.state.username !== '') {
      let now = (new Date()).toLocaleTimeString();
      let new_message =
	  `${this.state.username}[${now}]:${this.state.msg}`;

      this.props.send_message(new_message);
      this.setState({username:this.state.username, msg:''});
    }
  }

  form_changed2(e) {
    const userName = e.currentTarget.value;
    this.setState({msg:this.state.msg, username:userName});
  }

  form_changed (e) {
    const letter = e.currentTarget.value;
    this.setState({msg:letter, username: this.state.username});
  }

  render() {
    return (
      <div>
		<input type="text"
                       onChange={this.form_changed2}
                       value = {this.state.username}
                       placeholder='Your Name'
                       style = {this.props.name_style} />
		<input type="text"
                       onChange={this.form_changed}
                       value={this.state.msg}
                       onKeyDown = {this.click_handler}
                       placeholder='Message'
                       style = {this.props.message_style} />
    <button onClick={this.click_handler} style={this.props.my_style}>
	  Send
        </button>
      </div>
    );
  }
}
