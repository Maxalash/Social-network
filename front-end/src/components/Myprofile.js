import React from "react";
import Home from "../Home";
import './Myprofile.css';
import { ListGroup, NavLink, Accordion } from 'react-bootstrap';
import ReactAudioPlayer from 'react-audio-player';
import Header from './Header'
import axios from "axios";
import Footer from './Footer';
import Post from './Post';
import Chat from './Chat';


import Cookies from 'universal-cookie';
const cookie = new Cookies()
function cookieGet() {
  return cookie.get('token');
}


class Myprofile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      chats: null
    };
    this.friendsref = React.createRef()
    this.postref = React.createRef()
    this.addClasses = this.addClasses.bind(this)
    this.loadChats = this.loadChats.bind(this)
    this.rvclass = this.rvclass.bind(this)
  }

  // getPosts() {
  //   const toke = cookieGet()
  //   // console.log(toke)
  //   if (toke === undefined) {
  //     console.log('token is empty')
  //     return []
  //   }
  //   const requestOptions = {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Token ' + toke
  //     }
  //   };

  //   fetch('http://127.0.0.1:8000/post/author_posts/', requestOptions)
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(data => {
  //       this.setState({ posts: data })
  //       //   console.log(this.state.posts)
  //       return data
  //     });


  // }
  componentDidMount() {
    this.loadChats()
  }
  getFriends() {
    const toke = cookieGet()
    // console.log(toke)
    if (toke === undefined) {
      console.log('token is empty')
      return []
    }
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + toke
      }
    };

    fetch('http://127.0.0.1:8000/chat/load_chats/', requestOptions)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ friends: data })
        console.log(this.state.friends)
        return data
      });
  }
  toggle(ev, elem) {
    ev.preventDefault()
    const friend = this.friendsref.current;
    const abby = document.location.toString();
    switch (elem) {
      case 'friend':
        this.friendsref.current.style.display = 'block';
        this.postref.current.style.display = 'none';
        document.location.href = abby.substr(0, abby.indexOf('#')) + '#friend'
        break;
      case 'post':
        this.friendsref.current.style.display = 'none';
        this.postref.current.style.display = 'block';
        document.location.href = abby.substr(0, abby.indexOf('#')) + '#post'
        break;
      default:
    }
  }

  addClasses(e) {
    const elem = e.target;
    const prnt = elem.parentNode;
    const grand = prnt.parentNode;
    console.log(prnt.children[2])
    const sibls = []
    let sibl = grand.firstElementChild;
    do {
      if (sibl != prnt) {
        sibls.push(sibl);
      }
    } while (sibl = sibl.nextElementSibling);

    sibls.forEach((el) => {
      el.style.display = 'none'
    })

    prnt.children[2].style.display = "block"
    prnt.children[0].style.display = "inline-block"
  }
  rvclass(e){
    const elem = e.target;
    const prnt = elem.parentNode;
    const grand = prnt.parentNode;
    const sibls = []
    let sibl = grand.firstElementChild;
    do {
      if (sibl != prnt) {
        sibls.push(sibl);
      }
    } while (sibl = sibl.nextElementSibling);

    sibls.forEach((el) => {
      el.style.display = 'block'
    })

    prnt.children[2].style.display = "none"
    prnt.children[0].style.display = "none"

  }

  // const btns = this.friendsref.current.querySelectorAll('.btn-close');
  // console.log(btns)
  // btns.forEach((elem) => {
  //   elem.addEventListener("click", function () {
  //     const ind = Array.from(btns).indexOf(elem)
  //     const chatwd = document.querySelectorAll('.chatwindow')[ind]
  //     console.log(chatwd);
  //     chatwd.style.display = 'none';
  //     const sibls = []
  //     let sibl = elem.parentNode.parentNode.firstElementChild;
  //     do {
  //       if (sibl != elem) {
  //         sibls.push(sibl);
  //       }
  //     } while (sibl = sibl.nextElementSibling);

  //     sibls.forEach((el) => {
  //       el.style.display = 'block'
  //     })
  //     elem.style.display = 'none';


  //   })
  // })

  loadChats() {
    let url = 'http://localhost:8000/chat/load_chats/';
    const toke = cookieGet()
    axios.get(url, {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': 'Token ' + toke
      }
    })
      .then(res => {
        var string1 = JSON.stringify(res.data);
        var data = JSON.parse(string1);
        let chats = [];
        data.map((getts) => {
          var message_dat = {
            id: getts.id,
            friend: getts.friend,
            user: getts.user,
            created_date: getts.created_date
          };//send_date: data.send_date, owner: data.owner, chat: data.chat
          // console.log(message)
          chats.push(message_dat);
        });
        this.setState(
          {
            chats
          }
          // , function () {
          //   console.log('chats loaded')
          //   console.log(this.state.chats)
          // }
        );
        // console.log(this.state.messages);
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <Header />
        <ListGroup variant="flush" className="bg-purple menu-bar list-group1">
          <ListGroup.Item ><NavLink className="navbar-item"
            activeclassame="is-active"
            href="/"
            exact="true">My profile</NavLink></ListGroup.Item>
          <ListGroup.Item ><NavLink className="navbar-item"
            activeclassame="is-active"
            href="#friends"
            onClick={(event) => { this.toggle(event, 'friend') }}
            exact="true">Friends</NavLink></ListGroup.Item>
          <ListGroup.Item ><NavLink className="navbar-item"
            activeclassame="is-active"
            href="#post"
            onClick={(event) => { this.toggle(event, 'post') }}
            exact="true">My Posts</NavLink></ListGroup.Item>
        </ListGroup>
        <main>
          <section id="friends" className="friend-list" ref={this.friendsref}>

            <ListGroup id="friendsList">
              {this.state.chats?.map((ps, key) => {
                return (
                  <ListGroup.Item key={ps.id}>
                    <button type="button" className="btn-close" aria-label="Close" onClick={(ev)=>{this.rvclass(ev)}}/>
                    <div style={{ display: 'inline-block', width: '90%' }} onClick={(ev) => { this.addClasses(ev) }}>
                      {ps.friend}
                    </div>
                    <Chat
                      id={ps.id}
                    />
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </section>
          <section id="post" ref={this.postref}>
            <Post
              key='2'
              author='sa'
              embedded_likes_count='{ps.embedded_likes_count}'
              id='{ps.id}'
              pub_date='{ps.pub_date}'
              text='{ps.text}'
              title='{ps.title}'
              images={null}
              video={null}
              audio={null}
              liked='{ps.liked}'
              likes_count='{ps.likes_count}'
              bookmarked='{ps.bookmarked}'
              updpost='{this.getPosts}'
            />
          </section>
        </main>
        <Footer />
      </div>

    )
  }

}

export default Myprofile