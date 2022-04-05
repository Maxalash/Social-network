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
        console.log(res.status)
        if(res.ok) {
            return res.status;
        }else{
            <Navigate to="/login" ></Navigate>
        }
        throw new Error('Network response was not ok.');
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ', 
        error.message);
       });
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: checkSession()
        };
    
        // this.handleunam = this.handleunam.bind(this);
        // this.handlepass = this.handlepass.bind(this);
        // this.handlesubmit = this.handlesubmit.bind(this);
        // this.handlesubmit2 = this.handlesubmit2.bind(this);
      }
    

    // handlepass(event){
    //     this.setState({passwrd: event.target.value});
    // }
    // handleunam(event){
    //     this.setState({username: event.target.value})
    // }

    // handlesubmit(event){
    //     alert('A name was submitted: ' + this.state.username + this.state.passwrd);
    //     this.request()
    //     event.preventDefault();
    // }



    // request(){
    //     const requestOptions = {
    //         method:'POST',
    //         headers: { 
    //             'Content-Type': 'application/json'
    //         },   
    //         body: JSON.stringify({
    //             username: this.state.username,
    //             password: this.state.passwrd
    //         })
    //     };
    //     fetch('http://127.0.0.1:8000/post/register/', requestOptions)
    //     .then(res => {
    //         return res.json();
    //       })
    //       .then(data => {
    //         console.log(data)
    //       })
    // }

    render(){
        return (
            <div className = "body">

                <Header />
                {/* <BrowserRouter>
                  <div>
                    <Routes>
                      <Route path="/login" element= {<Navigate to="/login" />}></Route>
                      <Route path="/register" element= {Register}></Route>
                    </Routes>
                  </div>
                </BrowserRouter> */}
                <div className='postscontain'>
                    POsts
                </div>
                <Footer />
                
            </div>
        )
    }
}

export default Home;