'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import MsgInput from './MsgInput';
class ChatApp extends React.Component {

  render() {
    return (
      <div>
	Hello World
  <MsgInput />
      </div>
    );
  }
};


ReactDOM.render(<ChatApp />,
		document.getElementById('react-container'));
