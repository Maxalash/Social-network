import React from "react";
import {Form, Button, FloatingLabel,
    Modal,
    handleClose
} from "react-bootstrap";

import axios from "axios";
import Cookies from 'universal-cookie';
const cookie = new Cookies()
function cookieGet(){
    return cookie.get('token');
}

// function submitPost(event){

// }

class CreatePost extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            show: "true",
            title: "",
            text: "",
            images: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.uploadimg = this.uploadimg.bind(this);
    }
    
    // uploadimg(e){
    //   e.preventDefault();
    //   this.setState
    // }
    handleSubmit(event){
        event.preventDefault()
        // var datapost = {
        //   title: this.state.title,
        //   text: this.state.text,
        //   image: this.state.images
        // }
        
        // const requestOptions = {
        //     method:'POST',
        //     headers: { 
        //         'Content-Type': 'application/json',
        //         'Authorization':'Token 765e59b48f17a2d38d1ba9d24da3c3564a4da902 '
        //     },
        //     body: JSON.stringify(datapost)

        // };
        // console.log(datapost)
        // fetch('http://127.0.0.1:8000/post/make_post/', requestOptions)
        //     .then(res => {
        //         return res.json();
        //       })
        //       .then(data => {
        //         var tooken = data
        //         // this.props.history.push('/')
        //         console.log(tooken)
        //       })
        console.log(this.state);
        let form_data = new FormData();
        form_data.append('image', this.state.images, this.state.images.name);
        form_data.append('title', this.state.title);
        form_data.append('text', this.state.text);
        let url = 'http://localhost:8000/post/make_post/';
        axios.post(url, form_data, {
          headers: {
            'content-type': 'multipart/form-data',
            'Authorization':'Token 765e59b48f17a2d38d1ba9d24da3c3564a4da902 '
          }
        })
            .then(res => {
              this.props.updatepost(res.data)
            })
            .catch(err => console.log(err))
    }

    render(){
        return(
            <Modal.Dialog>
              <Modal.Header y>
                <Modal.Title>Create post</Modal.Title>
              </Modal.Header>
              <Form onSubmit={(event)=>this.handleSubmit(event)}>
              <Form.Group className="mb-3 m-3">
                <Form.Control type="file"  placeholder="upload images"onChange={(event) => {
                          this.setState({images: event.target.files[0]})
                          console.log(this.state.images)
                        }}
                        accept="image/png, image/jpeg"
                         required></Form.Control><br />
                <Form.Control type="text" placeholder="Title" onChange={(event) => {
                          this.setState({title: event.target.value})
                        }} required /><br />
                <Form.Control
                  as="textarea"
                  placeholder="Text"
                  style={{ height: '100px' }}
                  onChange={(event) => {
                    this.setState({text: event.target.value})
                  }} required
                />
                  {/* <FloatingLabel controlId="floatingTextarea2" label="Comments">
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: '100px' }}
                    />
                  </FloatingLabel> */}
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary">Close</Button>
                <Button variant="primary" type="submit">Create</Button>
              </Modal.Footer>
            </Form>
              
            </Modal.Dialog>
            // <div>
            //     <Button variant="primary" onClick={this.setState({show:"true"})}>
            //         Launch static backdrop modal
            //       </Button>

            // <Modal
            //       show={this.state.show}
            //       onHide={handleClose}
            //       backdrop="static"
            //       keyboard={false}
            //     >
            //       <Modal.Header closeButton>
            //         <Modal.Title>Modal title</Modal.Title>
            //       </Modal.Header>
            //       <Modal.Body>
            //         I will not close if you click outside me. Don't even try to press
            //         escape key.
            //       </Modal.Body>
            //       <Modal.Footer>
            //         <Button variant="secondary" onClick={this.setState({show: "false"})}>
            //           Close
            //         </Button>
            //         <Button variant="primary">Understood</Button>
            //       </Modal.Footer>
            //     </Modal>
                
            // </div>

            
        )
    }
}

export default CreatePost
