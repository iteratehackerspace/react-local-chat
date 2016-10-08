'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class ChatApp extends React.Component {

  render() {
    return (
      <div>
	Hello World
      </div>
    );
  }
};


ReactDOM.render(<ChatApp />,
		document.getElementById('react-container'));
