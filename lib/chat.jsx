import React from 'react';
import ReactDOM from 'react-dom';
import MsgInput from './MsgInput';
import StatusBar from './StatusBar';
import ChatHistory from './chathistory';
import { webSocketAddr } from './globals';
import { mainContainer,statusBarStyle,chatHistoryStyle,MsgInputStyle } from './styles';
class ChatApp extends React.Component {

  constructor() {
    super();
    this.state = { msgs: [], usersNumber: 0 };
    this.conn = new WebSocket(webSocketAddr);
  }

  componentDidMount() {
    this.conn.onmessage = (message) => {
      const reply = JSON.parse(message.data);
      switch (reply.message_type) {
        case 'user_count':
          this.setState({ usersNumber: reply.users_count });
          break;
        case 'initial_message_load':
          this.setState({ msgs: reply.payload });
          break;
        case 'new_chat_message':
          this.setState({ msgs: [...this.state.msgs, reply.payload] });
          break;
        default:
          console.error('Unknown message reply type from server');
      }
    };

    const initialMessageSendTimer = setInterval(() => {
      if (this.conn.readyState === 1) {
        this.conn.send(JSON.stringify({
          cmd: 'connect',
        }));
        clearInterval(initialMessageSendTimer);
      }
    }, 500);

    setInterval(() => {
      if (this.conn.readyState === 1) {
        this.conn.send(JSON.stringify({
          cmd: 'user_count',
        }));
      }
    }, 10 * 1000);
  }

  render() {

    return (
        <div style={mainContainer}>
          <StatusBar
            myStyle={statusBarStyle}
            users={this.state.usersNumber}
          />
          <ChatHistory
            myStyle={chatHistoryStyle}
            messages={this.state.msgs}
          />
          <MsgInput
            myStyle={MsgInputStyle}
            sendMessage={(msg, rawMsg) => this.conn.send(JSON.stringify({
              cmd: 'new_message',
              payload: msg,
              rawMessage:rawMsg,
            }))}
          />
        </div>
    );
  }
}

ReactDOM.render(<ChatApp />, document.getElementById('react-container'));
