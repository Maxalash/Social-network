import React from 'react';
import { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios"
import { Link } from 'react-router-dom';
import { Card, Alert } from 'react-bootstrap';
import Cookies from 'universal-cookie';
const cookie = new Cookies()


 function createCookies(toke){
    cookie.set('token', toke['token'], {path: '/'})
}
function cookieGet(){
    return cookie.get('token');
}


// const Alerting = ()=>{
//   this.props.history.push('/')
// }

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: "damir4",
            password: "damir123",
            loggedIN: cookieGet()
        };

        this.loginSubmit = this.loginSubmit.bind(this);
      }
    

//   handleValidation(event){
    // let formIsValid = true;

    // if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
    //   formIsValid = false;
    //   this.setState({usernameError:"Email not valid"});
    //   return false;
    // } else {
    //   this.setState({usernameError:""});
    //   formIsValid = true;
    // }

    // if (!password.match(/^[a-zA-Z]{8,22}$/)) {
    //   formIsValid = false;
    //   this.setState({passwordError:"Only Letters and length must best min 8 Chracters and Max 22 Chracters"});
      
    //   return false;
    // } else {
    //   this.setState({passwordError:""});
    //   formIsValid = true;
    // }

    // return formIsValid;
//   };

  loginSubmit(e){
    e.preventDefault();
    const requestOptions = {
        method:'POST',
        headers: { 
            'Content-Type': 'application/json'
        },   
        body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
        })
    };
    fetch('http://127.0.0.1:8000/post/login/', requestOptions)
    .then(res => {
        return res.json();
      })
      .then(data => {
        var tooken = data
        createCookies(data)
        // this.props.history.push('/')
        console.log(tooken)
        this.setState({loggedIN: cookieGet()})
      })
  };

  render(){
    return (
        <div> 
        {this.state.loggedIN === undefined ? "":"history.push('/')"}
        <Card className="text-center" style={{maxWidth:400+"px", margin: 50 +"px auto", borderRadius:50+"px"}}>
        <Card.Header style = {{background: "#e1a7fa", borderTopLeftRadius:50+"px", borderTopRightRadius:50+"px"}}>Login</Card.Header>
        <Card.Body>
        <form id="loginform" onSubmit={this.loginSubmit}>
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      type="text"
                      className="form-control"
                    //   id="EmailInput"
                    //   name="EmailInput"
                    //   aria-describedby="emailHelp"
                      placeholder="Enter email"
                      onChange={(event) => {
                          this.setState({username: event.target.value})
                        }}
                    />
                    <small id="emailHelp" className="text-danger form-text">
                      {}
                    </small>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="text"
                      className="form-control"
                    //   id="exampleInputPassword1"
                      placeholder="Password"
                      onChange={(event) => {
                          this.setState({password: event.target.value})
                        }}
                    />
                    <small id="passworderror" className="text-danger form-text">
                      {}
                    </small>
                  </div>
                  <div className="form-group form-check">
                    {/* <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    /> */}
                    {/* <label className="form-check-label">Check me out</label> */}
                  </div>
                  <button type="submit" className="btn" style={{background: '#350f4f', color: 'white'}}>
                    Submit
                  </button>
                </form>
        </Card.Body>
        <Card.Footer className="text" style={{borderBottomLeftRadius:50+"px", borderBottomRightRadius:50+"px"}}><Link to="/register">Register</Link></Card.Footer>
      </Card>
      </div> 
      );
      
  }
  
}



export default Login;