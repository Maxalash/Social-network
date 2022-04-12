import React from "react";
import {Card, ListGroup, ListGroupItem, Button, ButtonGroup,
  Container, Row, Col, Accordion, InputGroup, Form
} from 'react-bootstrap';
import './Post.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import EditPost from "./EditPost";
import Comment from "./Comment";


import Cookies from 'universal-cookie';
const cookie = new Cookies()
function cookieGet(){
    return cookie.get('token');
}


class Post extends React.Component{
    constructor(props) {
        super(props);
        this.state={
          show:false,
          bkmark:"false",
          likes: "false",
          comments:[]
        }

        this.sendId = this.sendId.bind(this);
        this.showmod = this.showmod.bind(this);
       this.bookmrk = this.bookmrk.bind(this);
       this.closemod = this.closemod.bind(this);

       this.bookmrk()
       this.likes()
    }
    bookmrk(e){
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
        
        fetch('http://127.0.0.1:8000/post/bookmark_post/'+this.props.id+"/",requestOptions)
        .then(res => {
            return res.json();
          })
          .then(data => {
              this.setState({bkmark: data })
          });
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
        
        fetch('http://127.0.0.1:8000/post/like_post/'+this.props.id+"/",requestOptions)
        .then(res => {
            return res.json();
          })
          .then(data => {
              this.setState({likes: data['Liked'] })
          });
    }
    sendId(ev){
      ev.preventDefault()
      console.log(ev.target.value)
    }
    showmod(e){
      e.preventDefault()
      this.setState({show:true})
  }
    closemod(e){
      e.preventDefault();
      this.setState({show: false})
    }

    getComments(){
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
        
        fetch('http://127.0.0.1:8000/post/post_comments/'+this.props.id,requestOptions)
        .then(res => {
            return res.json();
          })
          .then(data => {
              this.setState({comments: data })
          });
    }
    // creatComment(e){

    // }
    delPost(e){
      e.preventDefault()
      const toke = cookieGet()
        if(toke === null){
            return []
        }
        const requestOptions = {
            method:'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization':'Token '+toke
            }
        };
        
        fetch('http://127.0.0.1:8000/post/delete_post/'+this.props.id+"",requestOptions)
        .then(res => {
            return res.json();
          })
          .then(data => {
              this.setState({comments: data })
          });
    }
    render() {
        return(
            <div>
            {this.state.show === true ? <EditPost id={this.props.id} title={this.props.title} text={this.props.text} closemod={this.closemod}/>:""}
              <Card >
              <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
              <Card.Body>
                <Card.Title>{this.props.title}</Card.Title>
                <Card.Text>{this.props.text}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
              </ListGroup>
              <Card.Body>
                <Container>
                  <Row>
                    <Col>
                      <ButtonGroup onClick={this.sendId}>
                        <Row>
                        <Col xs md="5"><Button value={this.props.id} onClick={(e)=>this.showmod(e)}>Edit</Button></Col>
                        <Col xs md="5"><Button  value={this.props.id}onClick={(e)=>this.delPost(e)}> Delete</Button></Col></Row>
                      </ButtonGroup>
                    </Col>
                    <Col xs lg="2">
                    <i className="bi bi-bookmark-check-fill" onClick={(e)=>this.bookmrk(e)}></i>
                      {this.state.bkmark===true ? <p>Bookmarked</p>:""}
                    </Col>
                    <Col xs lg="1">
                      <i className="bi bi-heart "  onClick={(e)=>this.likes(e)}></i>
                      {this.state.likes === true ? <p>Liked</p>:""}
                      </Col>
                  </Row>
                </Container>
              
              </Card.Body>
              <Card.Footer>
              <Container>
                <Row>
                  <Col>Author: {this.props.author}</Col>
                  <Col xs>Last update: {this.props.pub_date}</Col>
                </Row>
              </Container>
              </Card.Footer>
              <Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header>Comments</Accordion.Header>
    <Accordion.Body>
    {this.state.comments.map((ps, key) => {
                    return (
                        <Comment
                            key = {ps.id}
                            // author={ps.author}
                            // embedded_likes_count= {ps.embedded_likes_count}
                            id= {ps.id}
                            text= {ps.text}
                        />  
                    );
                })}
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="comment"
                    aria-label="comment"
                    aria-describedby="basic-addon2"
                  />
                  <Button variant="outline-secondary" id="button-addon2" onClick={(event) => {
                          this.creatComment(event.target.value)
                        }}>
                    Send
                  </Button>
                </InputGroup>
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
            </Card>
            </div>
          
        )
    }
}
//Create post{Title, }, write comment
export default Post