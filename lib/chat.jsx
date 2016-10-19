import React from 'react';
import ReactDOM from 'react-dom';
import MsgInput from './MsgInput';
import StatusBar from './StatusBar';
import ChatHistory from './chathistory';
import { webSocketAddr } from './globals';

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
    // const theBiggestContainer = {
    //   backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/c/cd/Tatev_Monastery_from_a_distance.jpg')",
    //   backgroundRepeat: 'no-repeat',
    //   backgroundPosition: 'botton left',
    //   backgroundAttachment: 'fixed',
    //   backgroundSize: 'cover',
    //   height: '100vh',
    // };
    const programmersOnline = {
      flexGrow: '1',
      fontSize: '30px',
      color: 'white',
      padding: '14px 25px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      textAlign: 'right',
    };
    const sourceCode = {
      flexGrow: '1',
      fontSize: '30px',
      color: 'white',
      padding: '14px 25px',
      textAlign: 'left',
      textDecoration: 'none',
      display: 'inline-block',
    };
    const mainContainer = {
      marginTop: '10px',
      // height: '900px',
      margin: '0px auto',
      height: '100vh',
    };
    const statusBarStyle = {
      color: '#00ff9f',
      textAlign: 'center',
      backgroundColor: '#acb2ff',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      opacity: '0.7',
      logo: {
        height: '6em',
        width: '6em',
      },
    };
    const chatHistoryStyle = {
      container: {
        marginTop:'2em',
        marginLeft: '5px',
        marginRight: '5px',
        minHeight: '20%',
        overflowY: 'scroll',
        maxHeight:'60%'
      },
      list_items: {
        listStyleType: 'none',
        fontFamily: 'sans-serif',
        fontSize: '18px',
        color: 'white',
        margin: '0.5em auto',
        padding: '.50rem',
        minWidth: '30px',
        maxWidth: '50%',
        backgroundColor: '#6641a7',
        opacity: '0.85',
        // message: {
        //   flexGrow: '6',
        //   display: 'inline-block',
        //   textAlign: 'left',
        // }
        // time: {
        //   flexGrow: '1',
        //   display: 'inline-block',
        //   textAlign: 'right',
        // }
      },
    };

    const buttonStyle = {
      backgroundColor: '#4CAF50',
      border: 'none',
      height: '1.5rem',
      color: 'white',
      justifyContent: 'center',
      borderRadius: '5px',
      width: '100%',
    };
    const nameInput = {
      fontFamily: 'sans-serif',
      transition: 'box-shadow 0.3s, border 0.3s',
      border: 'solid 1px #707070',
      fontSize: '12px',
      boxShadow: '0 0 5px 1px #969696',
    };
    const messageInput = {
      display: 'block',
      fontFamily: 'sans-serif',
      fontSize: '18px',
      transition: 'box-shadow 0.3s, border 0.3s',
      border: 'solid 1px #707070',
      width:'99.7%',
      boxShadow: '0 0 5px 1px #969696',
    };
    // const task_window_style = {
    //     width: '950px',
    //     height: '350px',
    //     margin: 'auto',
    //     backgroundColor: '#01409c',
    //     color: 'white',
    //     fontSize: '20px',
    //     textAlign: 'center',
    //     borderRadius: '40px'
    // };
    return (
      //<div style={theBiggestContainer}>
        <div style={mainContainer}>
          <StatusBar
            myStyle={statusBarStyle}
            users={this.state.usersNumber}
            sourceCodeStyle={sourceCode}
            programmersOnlineStyle={programmersOnline}
          />
          <ChatHistory
            myStyle={chatHistoryStyle}
            messages={this.state.msgs}
          />
          <MsgInput
            myStyle={buttonStyle}
            nameStyle={nameInput}
            messageStyle={messageInput}
            sendMessage={(msg, rawMsg) => this.conn.send(JSON.stringify({
              cmd: 'new_message',
              payload: msg,
              rawMessage:rawMsg,
            }))}
          />
        </div>
      //</div>
    );
  }
}

ReactDOM.render(<ChatApp />, document.getElementById('react-container'));
