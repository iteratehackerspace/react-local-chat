import React from 'react';
import Markdown from 'react-remarkable';

export default
class ChatHistory extends React.Component {

  constructor() {
    super();
    this.state = { msgs: [] };
  }

  shouldComponentUpdate(nextProps) {
    const next = nextProps.messages;
    const current = this.props.messages;
    return next[next.length - 1] !== current[current.length - 1];
  }

  componentDidUpdate() {
    const panel = this.refs.chat_container;
    if (panel.lastChild) panel.lastChild.scrollIntoView();
  }

  render() {
    const messageList = this.props.messages.map((message, idx) => {
      const actualMessage = message.split(']:');
      return (
        <li key={idx} style={this.props.myStyle.list_items}>
          {actualMessage[0]}]:
          <Markdown
            source={actualMessage[1]}
            options={{
              html: true,
              linkify: true,
              typographer: true
            }}
          />
        </li>
      );
    });
    return (
      <div ref={'chat_container'} style={this.props.myStyle.container}>
        {messageList}
      </div>
    );
  }
}

class CommandBox extends React.Component {
  render() {
    const textDec = {
      listStyleType: 'none',
      wordWrap: 'break-word',
    };
    return (
        <div style={this.props.myStyle.commandBox}>
          <li style={textDec}>
            CommandBox
          </li>
          <li style={textDec}>
            <button
              title={'Checks your mood'}
              className={"foo"}
              onClick={this.props.sendCmd}>
              !hyebot.sentiment=>
            </button>
          </li>
        </div>
    );
  }
}
export {ChatHistory, CommandBox};
