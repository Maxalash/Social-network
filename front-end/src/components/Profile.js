import React from "react";
import './Profile.css';
import { ButtonGroup, Button, Row, Col } from 'react-bootstrap';
import axios from "axios";
import background from '../assets/images/profile.jpg';
import back2 from './images/bg11.jpg'



export default function Profile(props) {
    //   const [chat, setChat]=React.useState()
    // const addChat
    return (
        <div className="profilepage">
            <div className="backimage d-flex justify-content-end"style={{
                backgroundImage: `url(${back2})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'}}
            >
                <h1 className="d-flex justify-content-end">Almas Baisultan</h1>
            </div>
            <ButtonGroup>
                <Row className="row1">
                    <Col xs ><Button onClick={(e) => { props.posts.current.click() }}>My posts</Button></Col>
                    <Col xs><Button onClick={(e) => { props.friends.current.click() }}> Edit profile</Button></Col>
                    <Col xs><Button onClick={(e) => { props.books.current.click() }}> My bookmarks</Button></Col>
                </Row>
            </ButtonGroup>
            <div className="avatar" style={{
                backgroundImage: `url(${background})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}></div>
            <div className="bio"></div>
        </div>)
}