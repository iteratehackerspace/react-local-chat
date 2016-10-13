'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import MsgInput from './MsgInput';
import StatusBar from './statusBar';
import ChatHistory from './chathistory';

class ChatApp extends React.Component {

  constructor() {
    super();
    this.state = {msgs : []};
  }

  componentDidMount() {

    setInterval(async () => {
      console.log('Called');
  
      let messageHistory = await fetch('http://192.168.1.216:8000/all_messages');
      let all_history = await messageHistory.json();
      this.setState({msgs: all_history.payload});
    }, 500);

  }


  render() {
    return (
      <div>
        <ChatHistory
          messages={this.state.msgs}
          />
        <MsgInput
          updater={(msg) =>
            this.setState({msgs:this.state.msgs.concat([msg])})
          }
          />
      </div>
    );
  }

};


ReactDOM.render(<ChatApp />,
		document.getElementById('react-container'));
