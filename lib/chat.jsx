'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import MsgInput from './MsgInput';
//import StatusBar from './statusBar';
import ChatHistory from './chathistory';

import {server_addr} from './globals';

class ChatApp extends React.Component {

  constructor() {
    super();
    this.state = {msgs : []};
  }

  componentDidMount() {

    setInterval(async () => {
      let request = server_addr + '/all_messages';
      let messageHistory = await fetch(request);
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
