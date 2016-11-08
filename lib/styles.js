const mainContainer = {
  marginTop: '10px',
  margin: '0px auto',
  height: '100vh',
};
const statusBarStyle = {
  container: {
    color: '#00ff9f',
    textAlign: 'center',
    backgroundColor: '#000000',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    opacity: '0.7',
  },
  logo: {
    height: '6em',
    width: '6em',
  },
  logoContainer: {
    textAlign: 'right',
  },
  sourceCode: {
    flexGrow: '1',
    fontSize: '30px',
    padding: '14px 25px',
    textAlign: 'left',
    linkStyle: {
      color: 'white',
      textDecoration: 'none',
    },
  },
  programmersOnline: {
    flexGrow: '1',
    fontSize: '15px',
    color: 'white',
    padding: '14px 25px',
    textDecoration: 'none',
    textAlign: 'right',
  },
};
const chatHistoryStyle = {
  middleStyle: {
    display: 'flex',
  },
  button: {
    backgroundColor: '#D9D904',
    border: 'none',
    color: 'black',
    justifyContent: 'center',
    borderRadius: '10px',
    width: '100%',
    fontSize: '20px',
  },
  container: {
    marginTop: '2em',
    marginLeft: '5px',
    marginRight: '5px',
    minHeight: '10vh',
    overflowY: 'scroll',
    maxHeight: '60vh',
    flexGrow: '3',
  },
  commandBox: {
    flexGrow: '1',
    textAlign: 'center',
    backgroundColor: '#000000',
    opacity: '0.7',
    marginTop: '2.5em',
    borderRadius: '5px',
    height: '60vh',
  },
  cheastsheet: {
    overflow: 'auto',
    width: '40%',
    justifyContent: 'flex-end',
    textAlign: 'center',
    backgroundColor: '#000000',
    opacity: '0.7',
    marginTop: '2.5em',
    borderRadius: '5px',
    height: '60vh',
  },
  dropBox: {
    flexGrow: '1',
    textAlign: 'center',
    backgroundColor: '#000000',
    opacity: '0.7',
    marginTop: '2.5em',
    borderRadius: '5px',
    height: '60vh',
  },
  list_items: {
    listStyleType: 'none',
    fontFamily: 'sans-serif',
    fontSize: '18px',
    color: 'white',
    margin: '0.5em auto',
    padding: '.50rem',
    minWidth: '30px',
    maxWidth: '50%',
    backgroundColor: '#000000',
    opacity: '0.85',
    borderRadius: '10px',
    wordWrap: 'break-word',
    // message: {
    //   flexGrow: '6',
    //   display: 'inline-block',
    //   textAlign: 'left',
    // }
    // time: {
    //   flexGrow: '1',
    //   display: 'inline-block',
    //   textAlign: 'right',
    // }
  },
};
const MsgInputStyle = {
  buttonStyle: {
    backgroundColor: '#2eb2a2',
    border: 'none',
    height: '1.5rem',
    color: 'white',
    justifyContent: 'center',
    borderRadius: '5px',
    width: '100%',
  },
  nameInput: {
    fontFamily: 'sans-serif',
    transition: 'box-shadow 0.3s, border 0.3s',
    border: 'solid 1px #707070',
    fontSize: '12px',
    boxShadow: '0 0 5px 1px #969696',
  },
  messageInput: {
    display: 'block',
    fontFamily: 'sans-serif',
    fontSize: '18px',
    transition: 'box-shadow 0.3s, border 0.3s',
    border: 'solid 1px #707070',
    width:'99.7%',
    boxShadow: '0 0 5px 1px #969696',
  }
}
// const task_window_style = {
//     width: '950px',
//     height: '350px',
//     margin: 'auto',
//     backgroundColor: '#01409c',
//     color: 'white',
//     fontSize: '20px',
//     textAlign: 'center',
//     borderRadius: '40px'
// };
export {
  mainContainer,
  statusBarStyle,
  chatHistoryStyle,
  MsgInputStyle,
};
