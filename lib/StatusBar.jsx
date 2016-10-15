"use strict";

import React from "react";
import {server_addr} from './globals';

export default
class StatusBar extends React.Component{

  constructor(){
    super();
    this.state = {usersNumber : 0};
  }

  componentDidMount(){

    // setInterval(async()=>{
    //   const resp = await fetch(server_addr+"/users");
    //   const users = await resp.json();

    //   if (users != this.state.usersNumber)
    // 	this.setState({usersNumber: users});

    // }, 4000);

  }

  render(){
    return(
      <div style={this.props.my_style}>
        <h1>
	  <center>
	    <em><a href={'https://iteratehackerspace.github.io'}>
		iterate hackerspace</a>
	    </em>
	    programmers online: {this.state.usersNumber}
	  </center>
	</h1>
      </div>
    );
  }
}
