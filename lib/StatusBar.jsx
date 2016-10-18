import React from 'react';
import { serverAddress } from './globals';

export default
class StatusBar extends React.Component {

  render() {
    return (
      <div style={this.props.myStyle}>
        <div style={this.props.sourceCodeStyle}>
          <a href={'https://github.com/iteratehackerspace/react-local-chat'}>
            Source code
          </a>
        </div>
        <div>
          <a href={'https://iteratehackerspace.github.io'} >
            <img
              style={this.props.myStyle.logo}
              src={`${serverAddress}/logo.png`}
              width={'150'} alt={'Logo'}
            />
          </a>
        </div>
        <div style={this.props.programmersOnlineStyle} >
          programmers online: {this.props.users}
        </div>
      </div>
    );
  }
}
