'use strict';

import React from 'react';

export default

class ChatHistory extends React.Component {
  constructor() {
    super();
    this.state = {msgs : []};
  }

  render() {
    let styles = {listStyleType: 'none', width: '5%'};
    let listyle = {display: 'block', backgroundColor: '#36d1f7', borderRadius: '15px',
                    color: '#f6fdff', margin: '5px', width: '100%', textAlign: 'center', resize: 'horizontal'};

    let messageList = this.props.messages.map(function(message) {
      return (
        <li style = {listyle}>{message}</li>
      );
    });
    return (
      <ul style = {styles}>
        {messageList}
      </ul>
    );
  }
};
