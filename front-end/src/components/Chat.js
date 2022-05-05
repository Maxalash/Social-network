import React, { Component} from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
// import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import "./Myprofile.css";
import axios from "axios";
import Cookies from 'universal-cookie';

import "./style.css";

// let id = 0;

const cookie = new Cookies()

function cookieIdGet(){
    const gid = cookie.get('id');
    // console.log(typeof gid +" "+gid)
    return gid;
}

function cookieGet(){
    return cookie.get('token');
}


const client = new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/1/',['Token', cookieGet()]);




class Chat extends Component {
  chatContainer = React.createRef();

  state = {
    id:null,
    messages: [],
    value: ""
  };
  loadMessages(){
    let url = 'http://localhost:8000/chat/load_messages/1';
    const toke = cookieGet()
    axios.get(url, {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization':'Token ' + toke
      }
    })
        .then(res => {
            var string1 = JSON.stringify(res.data);
            var data = JSON.parse(string1);
            let messages = [...this.state.messages];
            data['messages'].map((getts)=>{
              let curid;
              if(getts.yours){
                curid=data['session_id']
              }else{
                curid=data['session_id']+1
              }
                var message_dat = {
                    id: getts.id,
                    chat_id: getts.chat,
                    text: getts.text,
                    send_date: getts.send_date,
                    user_id: curid,
                    username: getts.owner
                };//send_date: data.send_date, owner: data.owner, chat: data.chat
                // console.log(message)
                messages.push(message_dat);
            });
            this.setState({id: data['session_id']})
            console.log(data['session_id'])
            this.setState(
                {
                  messages
                },
                () => this.scrollToMyRef()
              );
            // console.log(this.state.messages);
        })
        .catch(err => console.log(err))
}
componentDidMount(){
    // const roomName = location.pathname.substr(1);
    this.loadMessages()
  
    client.onopen = (e) =>{
        console.log("Connected")
    }
    
    client.onmessage = (e) => {
        // console.log(JSON.parse(e.data))
        var data = JSON.parse(e.data);
        var message_dat = {
            id: data.message_id,
            chat_id: data.chat_id,
            text: data.message,
            send_date: data.send_date,
            user_id: data.session_id,
            username: data.username
        };//send_date: data.send_date, owner: data.owner, chat: data.chat
        console.log(data.session_id)
        let messages = [...this.state.messages];
        messages.push(message_dat);
        this.setState(
            {
              messages
            },
            () => this.scrollToMyRef()
          );
        // console.log(this.state.messages)
        this.scrollToMyRef();
    };

    client.onclose = (e) => {
        console.error('Chat socket closed unexpectedly');
    };

    document.querySelector('#chat-message-input').focus();
// document.querySelector('#chat-message-input').onkeyup = (e) => {
//     this.clickSubmitMessage
// };

    document.querySelector('#chat-message-submit').onclick = (e) => {
        var messageInputDom = document.querySelector('#chat-message-input');
        var message = messageInputDom.value;
        
        if (message) client.send(JSON.stringify({

                        // 'id':(this.state.id ? this.state.id: ''),
                        'message': message
        }));
        messageInputDom.value = '';
        this.scrollToMyRef()
        // this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    };
    
    // this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
}

  handleChange = ({ target: { value } }) => {
    this.setState({
      value
    });
  };
  // riseID(){
  //   let ids = this.state.id;
  //   ids +=1;
  //   this.setState({id:ids})
  //   return (ids-1);
  // }

//   sendMessage = () => {
//     let messages = [...this.state.messages, this.state.value];

//     this.setState(
//       {
//         messages
//       },
//       () => this.scrollToMyRef()
//     );
//   };

  scrollToMyRef = () => {
    const scroll =
      this.chatContainer.current.scrollHeight -
      this.chatContainer.current.clientHeight;
    this.chatContainer.current.scrollTo(0, scroll);
  };

  render() {
    return (
      <div className="chatwindow">
        <div ref={this.chatContainer} className="chatdatascroller">
        {this.state.messages?.map((txs, index)=>{
                //   console.log(txs.user_id+" "+this.state.id+" "+(txs.user_id==this.state.id))
              if(txs.user_id==this.state.id){
                return <div key={txs.id} className="sendedmessage">
                <p className='sent_date sent'>{txs.send_date}</p><br /><p>{txs.text}</p></div>
              }else{
                return <div key={txs.id} className="receivedmessage"><p className='sent_date sent'>{txs.username}</p>
                <p className='sent_date sent'>{txs.send_date}</p><br /><p>{txs.text}</p></div>
             }
        })}
        </div>

        {/* <input value={this.state.value} onChange={this.handleChange} />
        <button onClick={this.sendMessage}>SEND</button> */}
        <form className = "messaging" >
              <textarea className = "chatting" name="chatting" id="chat-message-input" placeholder="message..." value={this.state.value} onChange={this.handleChange}  autoFocus></textarea>
              <button id="chat-message-submit" type = 'button' className = "sendmessage" >Send</button>
          </form>
      </div>
    );
  }
}

export default Chat;
