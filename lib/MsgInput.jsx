import React from 'react';

export default
class MsgInput extends React.Component {

  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this);
    this.formChanged = this.formChanged.bind(this);
    this.formChanged2 = this.formChanged2.bind(this);
    this.state = { msg: '', username: '' };
  }

  clickHandler(event) {
    if ((event.button === 0 || event.key === 'Enter') &&
    this.state.msg.trim() !== '' && this.state.username.trim() !== '') {
      const now = (new Date()).toLocaleTimeString();
      const newMessage = `${this.state.username}[${now}]:${this.state.msg}`;

      this.props.sendMessage(newMessage, this.state.msg);
      this.setState({ ...this.state, msg: '' });
    }
  }

  formChanged2(e) {
    const userName = e.currentTarget.value;
    this.setState({ msg: this.state.msg, username: userName });
  }

  formChanged(e) {
    const letter = e.currentTarget.value;
    this.setState({ msg: letter, username: this.state.username });
  }

  render() {
    const styling = {
      position: 'absolute',
      bottom: 0,
      width: '100%',
    };
    return (
      <div style={styling}>
        <input
          type={'text'}
          onChange={this.formChanged2}
          value={this.state.username}
          placeholder={'Your Name'}
          style={this.props.nameStyle}
        />
        <input
          type={'text'}
          onChange={this.formChanged}
          value={this.state.msg}
          onKeyDown={this.clickHandler}
          placeholder={"Message"}
          style={this.props.messageStyle}
        />
        <button onClick={this.clickHandler} style={this.props.myStyle}>
          Send
      </button>
      </div>
    );
  }
}
