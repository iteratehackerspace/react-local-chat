import React from 'react';

export default
class ChatHistory extends React.Component {

  constructor() {
    super();
    this.state = { msgs: [] };
  }

  componentDidUpdate() {
    const panel = this.refs.chat_container;
    if (panel.lastChild) panel.lastChild.scrollIntoView();
  }

  render() {
    const messageList = this.props.messages.map((message, idx) => {
      return (
        <li key={idx} style={this.props.my_style.list_items}>
          {message}
        </li>
      );
    });

    return (
      <div ref={'chat_container'} style={this.props.my_style.container}>
        {messageList}
      </div>
    );
  }
}
