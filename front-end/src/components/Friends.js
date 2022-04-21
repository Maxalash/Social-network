import React from "react";
import Home from "../Home";
import './Myprofile.css';
import {ListGroup, NavLink, Accordion} from 'react-bootstrap';
import ReactAudioPlayer from 'react-audio-player';
import Header from './Header'
import axios from "axios";
import Footer from './Footer';

class Friends extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        messes:null
      };
      
      this.handleSend = this.handleSend.bind(this);
      this.getMessages();
  }
  getMessages(){

  }
  handleSend(event){
    event.preventDefault();
    const mess = document.getElementById("text7").value;
    console.log(mess)
    let curr = [];
    if (Array.isArray(this.state.messes)){
      console.log("yes yes")
      // let prevState = this.state.messes
      this.setState({messes: [... this.state.messes, mess]})
      console.log(this.state.messes)
      document.getElementById("text7").value = "";
    }else{
      this.setState({messes: [mess]} )
      document.getElementById("text7").value = "";
    }
    

  }
  render(){
    return (
      <Accordion flush>
    <Accordion.Item eventKey="0">
      <Accordion.Header>Friend 1</Accordion.Header>
      <Accordion.Body>
        <div className = "chatdata">
          <div className = "chatdatascroller">
            
              <div className = "sendedmessage">Ah Hiiiii</div>
              <div className = "sendedmessage">Iam good, im good</div>
              <div className = "receivedmessage">What about you?</div>
              <div className = "sendedmessage">Hey dude what r doin?</div>
              <div className = "sendedmessage">i am fine</div>
              <div className = "receivedmessage">{this.props.mess}</div>
              {this.state.messes?.map((txs, index)=>{
              if(1){
                return <div key={index} className="sendedmessage">{txs}</div>
              }else{
                return <div className="receivedmessage">{txs}</div>
              }
            })}

          </div>
          <form className = "messaging" >
              <textarea className = "chatting" name="chatting" id="text7" placeholder="message..." autoFocus></textarea>
              <button type = 'button' className = "sendmessage" onClick={(event)=>{this.handleSend(event)}}>Send</button>
          </form>
        </div>
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="1">
      <Accordion.Header>Friend 2</Accordion.Header>
      <Accordion.Body>
  
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>
  
    )
  }
}
  
export default Friends;