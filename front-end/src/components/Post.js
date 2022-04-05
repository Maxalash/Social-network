import React from "react";
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import './Post.css'

function print(lyn){
  console.log(lyn, "here i am");
  console.log("dfsgfdsryxtr")
}

class Post extends React.Component{
    constructor(props) {
        super(props);
        
    }
    render() {
        return(
            <Card >
              <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
              
              <Card.Body>
                <Card.Title>{this.props.title}</Card.Title>
                <Card.Text>{this.props.text}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>{this.props.pub_date}</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                <ListGroupItem>Author: {this.props.author}</ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
          
        )
    }
}
//Create post{Title, }, write comment
export default Post