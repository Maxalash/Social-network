import React from "react";
import {
  Form, Button, FloatingLabel,
  Modal,
  handleClose, Container, Row, Col
} from "react-bootstrap";
import "./Post.css"
import axios from "axios";
import Cookies from 'universal-cookie';
const cookie = new Cookies()
function cookieGet() {
  return cookie.get('token');
}


class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: "",
      images: [],
      video: [],
      audio: []
    }
    this.refs = React.createRef()
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.closen()
    let form_data = new FormData();
    // if (this.state.images.length > 0) {
    
      for (let i = 0 ; i < this.state.images.length ; i++) {
        console.log(this.state.images[i])
        form_data.append("images", this.state.images[i]);
    // }
    }
    if (this.state.video.length > 0) form_data.append('video', this.state.video, this.state.video.name);
    if (this.state.audio.length > 0) form_data.append('audio', this.state.audio, this.state.audio.name);
    form_data.append('title', this.state.title);
    form_data.append('text', this.state.text);
    // console.log(form_data)
    for (var pair of form_data.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
    let url = 'http://localhost:8000/post/make_post/';
    const toke = cookieGet()
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': 'Token ' + toke
      }
    })
      .then(res => {
        this.props.updatepost(res.data)
        console.log(res.status)
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  imagesCopy() {
    return this.state.images?.length
  }
  videosCopy() {
    return [...this.state.video]
  }
  audioCopy() {
    return [...this.state.audio]
  }

  handleImageUpload(event) {
    event.preventDefault()
    let images1 = event.target.files;
    let filesim = [...this.state.images]
    console.log(images1)
    for (let i = 0; i < images1.length; i++) {
      
      filesim.push(images1[i])
    }
    console.log(filesim)

    this.setState({ images: [...filesim]});
    console.log([...filesim])
    console.log(this.state.images)





  }
  render() {
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Create post</Modal.Title>
        </Modal.Header>
        <br />
        <Container>
          <Row>
            <Col>
              <input
                ref="fileInput1"
                onChange={this.handleImageUpload}
                type="file"
                style={{ display: "none" }}
                multiple={true}
                accept="image/*"
              />
              <button className="inputbtn" onClick={() => this.refs.fileInput1.click()} >Add Images</button>
              <p >{this.imagesCopy()}</p>
            </Col>
            <Col>
              <input
                ref="fileInput2"
                onChange={this.handleImageUpload}
                type="file"
                style={{ display: "none" }}
                multiple={true}
                accept="video/*"
              />
              <button className="inputbtn" onClick={() => this.refs.fileInput2.click()} >Add Videos</button>
              <p >{this.videosCopy()?.length}</p>
            </Col>
            <Col>
              <input
                ref="fileInput3"
                onChange={this.handleImageUpload}
                type="file"
                style={{ display: "none" }}
                multiple={true}
                accept="audio/*"
              />
              <button className="inputbtn" onClick={() => this.refs.fileInput3.click()} >Add Audios</button>
              <p >{this.audioCopy()?.length}</p>
            </Col>
          </Row>
        </Container>
        <hr />
        <Form onSubmit={(event) => this.handleSubmit(event)}>
          <Form.Group className="mb-3 m-3">
            
            <Form.Control type="text" placeholder="Title" onChange={(event) => {
              this.setState({ title: event.target.value })
            }} required /><br />
            <Form.Control
              as="textarea"
              placeholder="Text"
              style={{ height: '100px' }}
              onChange={(event) => {
                this.setState({ text: event.target.value })
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
            <Button variant="secondary" onClick={this.props.closen}>Close</Button>
            <Button variant="primary" type="submit">Create</Button>
          </Modal.Footer>
        </Form>

      </Modal.Dialog>

    )
  }
}

export default CreatePost
