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
    this.state.msg !== '' && this.state.username !== '') {
      const now = (new Date()).toLocaleTimeString();
      const newMessage = `${this.state.username}[${now}]:${this.state.msg}`;

      this.props.send_message(newMessage);
      this.setState({ username: this.state.username, msg: '' });
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
    return (
      <div>
        <input
          type="text"
          onChange={this.formChanged2}
          value={this.state.username}
          placeholder="Your Name"
          style={this.props.name_style}
        />
        <input
          type="text"
          onChange={this.formChanged}
          value={this.state.msg}
          onKeyDown={this.clickHandler}
          placeholder="Message"
          style={this.props.message_style}
        />
        <button onClick={this.clickHandler} style={this.props.my_style}>
          Send
        </button>
      </div>
    );
  }
}
