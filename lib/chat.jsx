'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import MsgInput from './MsgInput';
import StatusBar from './StatusBar';
import ChatHistory from './chathistory';

import {server_addr} from './globals';

class ChatApp extends React.Component {

  constructor() {
    super();
    this.state = {msgs : []};
  }

  async componentWillUnmount() {
    await fetch(`${server_addr}/disconnect`);
  }

  async componentDidMount() {

    await fetch(`${server_addr}/connected`);

    setInterval(async () => {
      let request = server_addr + '/all_messages';
      let messageHistory = await fetch(request);
      let all_history = await messageHistory.json();
      this.setState({msgs: all_history.payload});
    }, 500);

  }

  render() {
    let main_container = {
      marginTop:'10px',
      width: '950px',
      height: '350px',
      margin: '0px auto'
    };
    let status_bar_style = {
      color: '#00ff9f',
      textAlign:'center',
      borderRadius:'10px',
      backgroundColor:'#7e7a85',
      marginLeft:'auto',
      marginRight:'auto'
    };
    let chat_history_style = {
      container:{
	marginLeft:'5px',
	marginRight:'5px',
	overflowY:'scroll',
	height:'300px'
      },
      list_items:{
	listStyleType:'none',
	backgroundColor: '#36d1f7',
	borderRadius: '5px 5px',
	color: '#f6fdff',
	margin:'0.5em auto',
	padding: '.50rem',
	width: '100%'
      }
    };
    let message_input_style = {
      button:{
	backgroundColor: '#4CAF50',
	border: 'none',
	width: '100%',
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
          updater={
	    (msg) => this.setState({msgs:this.state.msgs.concat([msg])})
	  }
	  />
      </div>
    );
  }
  
};

ReactDOM.render(<ChatApp />,
		document.getElementById('react-container'));
