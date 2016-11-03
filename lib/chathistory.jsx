import React from 'react';
import validator from 'validator'

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
      const validatorOps = {
        protocols: ['http','https','ftp'],
        require_tld: true,
        require_protocol: true,
        require_host: true,
        require_valid_protocol: true,
        allow_underscores: false,
        host_whitelist: false,
        host_blacklist: false,
        allow_trailing_dot: true,
        allow_protocol_relative_urls: true,
      };
      const startingChar = actualMessage[1].indexOf('http');
      const endingChar = actualMessage[1].indexOf(' ', startingChar);
      const link = endingChar>0 ? actualMessage[1].substring(startingChar,endingChar) : actualMessage[1].substring(startingChar);
      const test = actualMessage[1].split(link);
      if(validator.isURL(link, validatorOps))
        return (
          <li key={idx} style={this.props.myStyle.list_items}>
            {actualMessage[0]}]:{test[0]}<a href={link} target={'_blank'}>{link}</a>
          </li>
        );
      else
      return (
        <li key={idx} style={this.props.myStyle.list_items}>
          {message}
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
