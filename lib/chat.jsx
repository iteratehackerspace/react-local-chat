'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import MsgInput from './MsgInput';
import StatusBar from './StatusBar';
import ChatHistory from './chathistory';

import {server_addr, web_sock_addr} from './globals';

class ChatApp extends React.Component {

  constructor() {
    super();
    this.state = {msgs : []};
    this.conn = new WebSocket(web_sock_addr);
  }

  componentWillUnmount() {
    this.conn.send(JSON.stringify({
      cmd:'disconnect'
    }));
    this.conn.close();
  }

  componentDidMount() {

    this.conn.onmessage = message => {
      const reply = JSON.parse(message.data);
      switch (reply.message_type) {
      case 'initial_message_load':
	this.setState({msgs:reply.payload});
	break;
      case 'new_chat_message':
	this.setState({msgs:this.state.msgs.concat([reply.payload])});
	break;
      default:
	console.error('Unknown message reply type from server');
      }
    };

    const initial_message_send_timer = setInterval(() => {
      if (this.conn.readyState === 1) {
	this.conn.send(JSON.stringify({
	  cmd:'connect'
	}));
	clearInterval(initial_message_send_timer);
      }
    }, 500);

    // Heart beat, to keep the web socket alive, web browser's
    // amazingly don't provide a spec for this
    setInterval(() => {
      if (this.conn.readState === 1) {
	this.conn.send(JSON.stringify({
	  cmd:'ping'
	}));
      }
    }, 15 * 1000);

  }

  render() {
    const main_container = {
      marginTop:'10px',
      width: '950px',
      height: '350px',
      margin: '0px auto'
    };
    const status_bar_style = {
      color: '#00ff9f',
      textAlign:'center',
      borderRadius:'10px',
      backgroundColor:'#7e7a85',
      marginLeft:'auto',
      marginRight:'auto'
    };
    const chat_history_style = {
      container:{
	marginLeft:'5px',
	marginRight:'5px',
	height:'90%',
	overflowY:'scroll'
      },
      list_items:{
	listStyleType:'none',
	backgroundColor: '#36d1f7',
	borderRadius: '5px 5px',
	color: '#f6fdff',
	margin:'0.5em auto',
	padding: '.50rem',
	width: '85%'
      }
    };
    const message_input_style = {
      button:{
	backgroundColor: '#4CAF50',
	border: 'none',
	height: '1.5rem',
	color: 'white',
	margin: '.25rem',
	justifyContent: 'center',
	borderRadius: '5px'
      }
    };
    return (
      <div style={main_container}>
        <StatusBar my_style={status_bar_style}/>
        <ChatHistory
	  my_style={chat_history_style}
	  messages={this.state.msgs}
	  />
        <MsgInput
	  my_style={message_input_style}
	  send_message={msg => this.conn.send(JSON.stringify({
	    cmd:'new_message',
	    payload:msg
	  }))}
	  />
      </div>
    );
  }
  
};

ReactDOM.render(<ChatApp />,
		document.getElementById('react-container'));
