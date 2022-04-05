import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Routes,
  Router,
  Route,
  NavLink
} from "react-router-dom";
import Login from "./Login"
import Register from "./Register"
// import { MemoryRouter, Switch, Route } from 'react-router-dom';
// import { LinkContainer } from 'react-router-bootstrap';
import './Home.css';
import Header from './components/Header'
import axios from "axios";
import Footer from './components/Footer';
import Post from './components/Post';
import Cookies from 'universal-cookie';
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

const listPost = (list)=>{  
    const listItems = list.map((ps) =>  
        <Post 
            author={ps['author']}
            embedded_likes_count= {ps['embedded_likes_count']}
            id= {ps['id']}
            pub_date= {ps['pub_date']}
            text= {ps['text']}
            title= {ps['title']}
        />  
    );  
    return listItems
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts:[]
            // status: checkSession()
        };
        this.getPosts();
      }
   
    getPosts(){
        const requestOptions = {
            method:'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization':'Token b28d98c8c36b06500d73f255db11d07722df2c8d'
            }
        };
        
        fetch('http://127.0.0.1:8000/post/all_posts/',requestOptions)
        .then(res => {
            return res.json();
          })
          .then(data => {
              this.setState({posts: data })
              console.log(data)
          });
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

    render(){
        return (
            <div className = "body">
                <Header />
                <div className='postscontain'>
                {this.state.posts.map((ps, key) => {
                    return (
                        <Post 
                            author={ps.author}
                            embedded_likes_count= {ps.embedded_likes_count}
                            id= {ps.id}
                            pub_date= {ps.pub_date}
                            text= {ps.text}
                            title= {ps.title}
                        />  
                    );
                })}
                </div>
                <Footer />
                
            </div>
        )
    }
}

export default Home;