import React from 'react';
// import {
//   Navigate
// } from "react-router-dom";
// import {Button, Card, ListGroup, ListGroupItem, Accordion} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { MemoryRouter, Switch, Route } from 'react-router-dom';
// import { LinkContainer } from 'react-router-bootstrap';
import './Home.css';
import Header from './components/Header'
import axios from "axios";
import Footer from './components/Footer';
import Listposts from './components/Listposts';
import Post from './components/Post';
import Cookies from 'universal-cookie';
import CreatePost from './components/CreatePost';
const cookie = new Cookies()

function cookieGet(){
    return cookie.get('token');
}


// function checkSession(){
//     var toke = cookieGet('token')
//     const requestOptions = {
//         method:'GET',
//         headers: { 
//             'Content-Type': 'application/json',
//             'Authorization':'Token '+toke
//         }
//     };
//     fetch('http://127.0.0.1:8000/post/posts/', requestOptions)
//     .then(res => {
//         // console.log(res.status)
//         if(res.ok) {
//             return res.status;
//         }
//         // else{
//         //     <Navigate to="/login" ></Navigate>
//         // }
//         throw new Error('Network response was not ok.');
//       })
//       .catch(function(error) {
//         // console.log('There has been a problem with your fetch operation: ', 
//         // error.message);
//        });
// }
// function CrePst(){
//     return <CreatePost />
// }



class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts:[]
            // status: checkSession()
        };
        this.getPosts = this.getPosts.bind(this);
        this.opencrPost = this.opencrPost.bind(this);
        this.checkLog();
      }
      componentDidMount(){
        this.getPosts();

      }
   
      
      checkLog(){
        let data = cookieGet()
        if(data==undefined){
           document.location.href='/login'
        }
      }

    getPosts(){
        const toke = cookieGet()
        // console.log(toke)
        if(toke === undefined){
            console.log('token is empty')
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
            //   console.log(this.state.posts)
              return data
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
    opencrPost(e){
        document.body.style.overflow = 'hidden';
        e.target.nextSibling.style.display = 'block';
    }
    
    

    render(){
        return (
            <div className = "body">
                <Header currloc='home'/>
                <div className='postscontain'>
                <button className='createpost' onClick={(e)=>{this.opencrPost(e)}}>Create POST</button>
                <CreatePost updatepost = {this.getPosts} closen = {(e)=>{this.setState({crshow:false})}}/><br />

                {this.state.posts?.map((ps, key) => {
                    // console.log(ps)
                    return (
                        <Post
                            key = {ps.id}
                            author={ps.author_name}
                            id= {ps.id}
                            pub_date= {ps.pub_date}
                            text= {ps.text}
                            title= {ps.title}
                            images = {ps.images}
                            video = {ps.videos}
                            audio = {ps.audios}
                            liked={ps.liked}
                            likes_count ={ps.embedded_likes_count}
                            bookmarked = {ps.bookmarked}
                            updpost = {this.getPosts}
                            currloc='home'
                            commcount = {ps.comments_count}
                        />  
                    )})}
                {/* <Listposts data={this.state.posts}/> */}
                
                </div>
                <Footer />
                
            </div>
        )
    }
}

export default Home;