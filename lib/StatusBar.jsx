import React from 'react';
import {serverAddress} from './globals';

export default
class StatusBar extends React.Component {

  render() {
    return (
      <div style={this.props.my_style}>
        <h1>
          <center>
            <a href={'https://iteratehackerspace.github.io'}>
              <img
                style={this.props.my_style.logo}
                src={`${serverAddress}/logo.png`}
                width={'150'} alt={'Logo'}
              />
            </a>
            programmers online: {this.props.users}
          </center>
        </h1>
      </div>
    );
  }
}
