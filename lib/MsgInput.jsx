import React from 'react';

export default
class MsgInput extends React.Component {

  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this);
    this.formChanged = this.formChanged.bind(this);
    this.formChanged2 = this.formChanged2.bind(this);
    this.state = { msg: '', username: '', prevMsg: [], currElm: 0};
  }

  clickHandler(event) {
    if ((event.button === 0 || event.key === 'Enter') &&
    this.state.msg.trim() !== '' && this.state.username.trim() !== '') {
      const now = (new Date()).toLocaleTimeString();
      const newMessage = `${this.state.username}[${now}]:${this.state.msg}`;

      this.props.sendMessage(newMessage, this.state.msg);
      this.setState({ ...this.state, prevMsg: [...this.state.prevMsg, this.state.msg], currElm: this.state.prevMsg.length, msg: '' });
    }
    if(event.key === "ArrowUp") {
      if(this.state.currElm <= 0){
        this.setState({...this.state, msg: this.state.prevMsg[0], currElm: 0})
      }
      else {
      this.setState({...this.state, msg: this.state.prevMsg[this.state.currElm], currElm: this.state.currElm-1});
      }
    }
    if(event.key === "ArrowDown") {
      if(this.state.currElm >= this.state.prevMsg.length-1){
        this.setState({...this.state, msg: '', currElm: this.state.prevMsg.length-1})
      }
      else {
        this.setState({...this.state,  currElm: this.state.currElm+1, msg: this.state.prevMsg[this.state.currElm]})
      }
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


  componentWillReceiveProps(nextProps) {
    if(!this.state.msg.includes(nextProps.com)) {
      this.setState({msg: `${nextProps.com}${this.state.msg}`});
      this.props.cleanCom();
    }
  }

  render() {
    const styling = {
      position: 'fixed',
      bottom: 0,
      width: '100%',
      flexGrow: '1',
    };

    return (
      <div style={styling}>
        <input
          type={'text'}
          onChange={this.formChanged2}
          value={this.state.username}
          placeholder={'Your Name'}
          style={this.props.myStyle.nameInput}
        />
        <input
          type={'text'}
          onChange={this.formChanged}
          value={this.state.msg}
          onKeyDown={this.clickHandler}
          placeholder={"Message"}
          style={this.props.myStyle.messageInput}
        />
        <button onClick={this.clickHandler} style={this.props.myStyle.buttonStyle}>
          Send
        </button>
      </div>
    );
  }
}
