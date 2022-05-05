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
      friends: []

    };
    this.friendsref = React.createRef()
    this.postref = React.createRef()
    this.addClasses = this.addClasses.bind(this)
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
    this.addClasses()
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

  addClasses() {
    const wlwm = this.friendsref.current.querySelectorAll('.list-group-item');
    console.log(wlwm)
    wlwm.forEach((elem) => {
      console.log(elem)
      elem.addEventListener("click", function () {
          const ind = Array.from(wlwm).indexOf(elem)
          console.log(ind)
          const chatwd = document.querySelectorAll('.chatwindow')[ind]
          chatwd.style.display = 'block'
          // elem2.style.display = 'block'
          // this.friendsref.current.children[0].style.display = 'none'
      })
    })
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

            <ListGroup >
              {this.state.friends?.map((ps, key) => {
                console.log(ps)
                return (
                  <ListGroup.Item></ListGroup.Item>
                )
              })}

              <ListGroup.Item>Friend</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
            <Chat/>
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