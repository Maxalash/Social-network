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
      images: null,
      video: null,
      audio: null
    }
    this.refs = React.createRef()
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleVideoUpload = this.handleVideoUpload.bind(this);
    this.handleAudioUpload = this.handleAudioUpload.bind(this);
    this.closePost = this.closePost.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.closen()
    let form_data = new FormData();
    if (this.state.images) form_data.append('image', this.state.images, this.state.images.name);
    if (this.state.video) form_data.append('audio', this.state.video, this.state.video.name);
    if (this.state.audio) form_data.append('video', this.state.audio, this.state.audio.name);
    // if (this.state.video.length > 0) form_data.append('video', this.state.video, this.state.video.name);
    // if (this.state.audio.length > 0) form_data.append('audio', this.state.audio, this.state.audio.name);

    form_data.append('title', this.state.title);
    form_data.append('text', this.state.text);
    // console.log(form_data)
    for (var pair of form_data.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
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
    this.closePost(event)
  }

  imagesCopy() {
    if (this.state.images) return 'added'
  }
  videosCopy() {
    if (this.state.video) return 'added'
  }
  audioCopy() {
    if (this.state.audio) return 'added'
  }

  handleImageUpload(event) {
    event.preventDefault()
    // let images1 = event.target.files;
    // let filesim = [...this.state.images]
    // console.log(images1)
    // for (let i = 0; i < images1.length; i++) {

    //   filesim.push(images1[i])
    // }
    // console.log(filesim)

    this.setState({ images: event.target.files[0] });
    // console.log([...filesim])
    console.log(this.state.images)
  }
  handleVideoUpload(event) {
    event.preventDefault()
    // let images1 = event.target.files;
    // let filesim = [...this.state.images]
    // console.log(images1)
    // for (let i = 0; i < images1.length; i++) {

    //   filesim.push(images1[i])
    // }
    // console.log(filesim)

    this.setState({ video: event.target.files[0] },
      () => { console.log(this.state.video) });
    // console.log([...filesim])

  }
  handleAudioUpload(event) {
    event.preventDefault()
    // let images1 = event.target.files;
    // let filesim = [...this.state.images]
    // console.log(images1)
    // for (let i = 0; i < images1.length; i++) {

    //   filesim.push(images1[i])
    // }
    // console.log(filesim)

    this.setState({ audio: event.target.files[0] });
    // console.log([...filesim])
    console.log(this.state.audio)
  }


  closePost(e) {
    const main = e.target.parentNode.parentNode.parentNode.parentNode.parentNode
    main.style.display = 'none'
    document.body.style.overflow = 'scroll'
    this.setState({
      audio: null,
      video: null,
      images: null,
      title: '',
      text: ''
    })
  }
  render() {
    return (
      <div className="blur-screen">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Create post</Modal.Title>
          </Modal.Header>
          <br />
          <Container>
            <Row>
              <Col xs lg='1' />
              <Col>
                <input
                  ref="fileInput1"
                  onChange={this.handleImageUpload}
                  type="file"
                  style={{ display: "none" }}
                  // multiple={true}
                  accept="image/*"
                />
                <button className="inputbtn" onClick={(ev) => { this.refs.fileInput1.click() }} >Add Image</button>
                <p >{this.imagesCopy()}</p>
              </Col>
              <Col>
                <input
                  ref="fileInput2"
                  onChange={this.handleVideoUpload}
                  type="file"
                  style={{ display: "none" }}
                  // multiple={true}
                  accept="video/*"
                />
                <button className="inputbtn" onClick={(ev) => { this.refs.fileInput2.click() }} >Add Video</button>
                <p >{this.videosCopy()}</p>
              </Col>
              <Col>
                <input
                  ref="fileInput3"
                  onChange={this.handleAudioUpload}
                  type="file"
                  style={{ display: "none" }}
                  // multiple={true}
                  accept="audio/*"
                />
                <button className="inputbtn" onClick={(ev) => { this.refs.fileInput3.click() }} >Add Audio</button>
                <p >{this.audioCopy()}</p>
              </Col>
            </Row>
          </Container>
          <hr />
          <Form >
            <Form.Group className="mb-3 m-3">

              <Form.Control
                type="text"
                placeholder="Title"
                onChange={(event) => {
                  this.setState({ title: event.target.value })
                }}
                value={this.state.title}
                required /><br />
              <Form.Control
                as="textarea"
                placeholder="Text"
                style={{ height: '100px' }}
                onChange={(event) => {
                  this.setState({ text: event.target.value })
                }}
                value={this.state.text}
                required
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
              <Button variant="secondary" onClick={this.closePost}>Close</Button>
              <Button variant="primary" type="submit" onClick={(event) => this.handleSubmit(event)}>Create</Button>
            </Modal.Footer>
          </Form>

        </Modal.Dialog>
      </div>
    )
  }
}

export default CreatePost
