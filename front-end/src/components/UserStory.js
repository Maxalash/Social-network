import React, { useState } from "react";
import {
    ListGroup, NavLink, Accordion,
    InputGroup, FormControl, Button,
    Modal, Form
} from 'react-bootstrap';
import axios from "axios";
import '../Home.css';
import backim from "../assets/images/anonym.png"


import Cookies from 'universal-cookie';
const cookie = new Cookies()
function cookieGet() {
    return cookie.get('token');
}

function Window(props) {
    console.log(props)
    return (

        <div className="blur-screen" style={{ display: 'block' }} onClick={(e)=>{props.close(e)}}>
            <Modal.Dialog >
                <Modal.Header >
                    <Modal.Title>{props.user}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={props.results[0].image} />
                </Modal.Body>

            </Modal.Dialog>
        </div>
    )
}


export default function Search(props) {
    // const [win, setwin] = useState(false);
    const [str, setstr] = useState(null);

    const ref = React.createRef();
    const handleClick = (e) => {
        e.preventDefault()
        const toke = cookieGet();
        axios.get('http://' + window.server_url + '/post/user_stories/' + props.id, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': 'Token ' + toke
            }
        }).then(res => {
            return res.data
        }).then(data => {
            // setwin(true)
            setstr(<Window
                count={data.count}
                next={data.next}
                previous={data.previous}
                results={data.results}
                user = {props.uname}
                close = {close}
            />)
        })

    }
    const close=(e)=>{
        e.preventDefault();
        setstr(null);
        document.querySelector('#userstory').click = 'none'
    }
    React.useEffect(() => {
        // console.log(str);
    }, [str]);

    return (

        <div className="userstory" style={{
            backgroundImage: `url(${backim})`
        }}
            onClick={(e) => { handleClick(e) }}
        >
            {str}
        </div>
    )

}