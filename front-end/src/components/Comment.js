import React from "react";
import {Card, ListGroup, ListGroupItem, Button, ButtonGroup,
    Container, Row, Col,Form, Modal 
  } from  "react-bootstrap";


  import Cookies from 'universal-cookie';
  const cookie = new Cookies()
  function cookieGet(){
      return cookie.get('token');
  }

  

class Comment extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            edit:false,
            text:this.props.text,
            likes:false
        }
        this.editComment= this.editComment.bind(this);
        this.editCommentComp = this.editCommentComp.bind(this);
    }
    setedit(e){
        e.preventDefault()
        this.setState({edit:true})
    }
    editComment(event){
        event.preventDefault()
        
        var toke = cookieGet('token')
        const requestOptions = {
            method:'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization':'Token '+toke
            },
            body: JSON.stringify({
                text: this.state.text
            })
        };
        console.log(requestOptions)
        fetch('http://127.0.0.1:8000/post/edit_comment/'+this.props.id+"/", requestOptions)
            .then(res => {
                return res.json();
              })
              .then(data => {
                var tooken = data
                // this.props.history.push('/')
                console.log(tooken)
              })
    }

    likes(e){
        if (e) e.preventDefault()
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
          
          fetch('http://127.0.0.1:8000/post/like_comment/'+this.props.id+"/",requestOptions)
          .then(res => {
              return res.json();
            })
            .then(data => {
                this.setState({likes: data['Liked'] })
            });
      }

    editCommentComp(){
        return (
            <Form onSubmit={(event)=>this.editComment(event)}>
            <br /><br />
             <Form.Group className="mb-3">
               <Form.Control
                 as="textarea"
                 placeholder="Text"
                 value = {this.state.text}
                 style={{ height: '100px' }}
                 onChange={(event) => {
                   this.setState({text: event.target.value})
                 }}
               />
             </Form.Group>
               <Button variant="secondary">Close</Button>
               <Button variant="primary" type="submit">Edit</Button>
           </Form>
        )
   }

    render(){
        return(
            <Card>
              <Card.Body onChange={(event) => {this.setState({text: event.target.value})}}>{this.props.text}</Card.Body>
              <ButtonGroup className="justify-content-end">
                <Row>
                <Col xs md="5"><Button onClick={(e)=>this.setedit(e)}>Edit</Button></Col>
                <Col xs md="5"><Button > Delete</Button></Col></Row>
                <Col xs lg="1">
                      <i className="bi bi-heart" onClick={(e)=>this.likes(e)}></i>
                      {this.state.likes === true ? <p>Liked</p>:""}
                      </Col>
              </ButtonGroup><br />
              {this.state.edit === true ? this.editCommentComp():""}
            </Card>
            )
    }
}

export default Comment