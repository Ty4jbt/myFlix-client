import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import config from '../../config'

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${config.APIURL}/login`, {
            Username: username,
            Password: password
        })
        .then(response => {
            const data = response.data;
            props.onLoggedIn(data);
        })
        .catch(e => {
            console.log('no such user')
        });
    };

    return (
        <Form>
            <Form.Group controlId='formUsername'>
                <Form.Label>Username:</Form.Label>
                <Form.Control type='text' placeholder='Enter Username' onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='formPassword'>
                <Form.Label>Password:</Form.Label>
                <Form.Control type='password' placeholder='Enter Password' onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant='success' type='submit' onClick={handleSubmit}>
                Submit
            </Button>
            <Button variant='primary' onClick={props.toggleRegister}>
                New User
            </Button>
        </Form>
    );
}