import React from 'react';
import { serverAddress } from './globals';

export default
class StatusBar extends React.Component {

  render() {
    return (
      <div style={this.props.myStyle.container}>
        <div style={this.props.myStyle.sourceCode}>
          <a href={'https://github.com/iteratehackerspace/react-local-chat'}
             style={this.props.myStyle.sourceCode.linkStyle}>
            Source code
          </a>
        </div>
        <div>
          <div style={this.props.myStyle.logoContainer}>
            <a href={'https://iteratehackerspace.github.io'} >
              <img
                style={this.props.myStyle.logo}
                src={`${serverAddress}/logo.png`}
                width={'150'} alt={'Logo'}
              />
            </a>
          </div>
          <div style={this.props.myStyle.programmersOnline}>
            programmers online: {this.props.users}
          </div>
        </div>
      </div>
    );
  }
}
