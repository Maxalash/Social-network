import React from 'react';
import {
  Navigate
} from "react-router-dom";
import {Button, Card, ListGroup, ListGroupItem, Accordion} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { MemoryRouter, Switch, Route } from 'react-router-dom';
// import { LinkContainer } from 'react-router-bootstrap';
import './Home.css';
import Header from './components/Header'
import axios from "axios";
import Footer from './components/Footer';
import Post from './components/Post';
import Cookies from 'universal-cookie';
import CreatePost from './components/CreatePost';
const cookie = new Cookies()

function cookieGet(){
    return cookie.get('token');
}


function checkSession(){
    var toke = cookieGet('token')
    const requestOptions = {
        method:'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization':'Token '+toke
        }
    };
    fetch('http://127.0.0.1:8000/post/posts/', requestOptions)
    .then(res => {
        // console.log(res.status)
        if(res.ok) {
            return res.status;
        }else{
            <Navigate to="/login" ></Navigate>
        }
        throw new Error('Network response was not ok.');
      })
      .catch(function(error) {
        // console.log('There has been a problem with your fetch operation: ', 
        // error.message);
       });
}
function CrePst(){
    return <CreatePost />
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts:null,
            crshow: false
            // status: checkSession()
        };
        this.showmod = this.showmod.bind(this);
        this.getPosts();
      }
   
    getPosts(){
        const toke = cookieGet()
        if(toke === null){
            return []
        }
        const requestOptions = {
            method:'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization':'Token '+toke
            }
        };
        
        fetch('http://127.0.0.1:8000/post/all_posts/',requestOptions)
        .then(res => {
            return res.json();
          })
          .then(data => {
              this.setState({posts: data })
          });
    }

    updpost(data){
        console.log(this.state.posts)
        // this.state.posts.push(data)
    }

    // renderPost(ps){
    //     console.log(ps);
    //     return (<Post 
    //         author={ps['author']}
    //         embedded_likes_count= {ps['embedded_likes_count']}
    //         id= {ps['id']}
    //         pub_date= {ps['pub_date']}
    //         text= {ps['text']}
    //         title= {ps['title']}
    //     />);
    // }

    // listPosts(){
    //     return this.state.props.map((ps)=>(<Post 
    //         author={ps['author']}
    //         embedded_likes_count= {ps['embedded_likes_count']}
    //         id= {ps['id']}
    //         pub_date= {ps['pub_date']}
    //         text= {ps['text']}
    //         title= {ps['title']}
    //     />))
    // }
    showmod(){
        this.setState({crshow:true})
    }
    render(){
        return (
            <div className = "body">
                <Header />
                <div className='postscontain'>
                <Button onClick={this.showmod}>Create POST</Button>
                {this.state.crshow === true ? <CreatePost updatepost = {this.updpost}/>:""}
                {this.state.posts?.map((ps, key) => {
                    return (
                        <Post
                            key = {ps.id}
                            author={ps.author}
                            embedded_likes_count= {ps.embedded_likes_count}
                            id= {ps.id}
                            pub_date= {ps.pub_date}
                            text= {ps.text}
                            title= {ps.title}
                        />  
                    );
                })}
                {/* <Post 
                            author="Auth"
                            embedded_likes_count= "5"
                            id= "1"
                            pub_date= "date"
                            text= "Text"
                            title= "Title"
                        />  */}
                </div>
                <Footer />
                
            </div>
        )
    }
}

export default Home;