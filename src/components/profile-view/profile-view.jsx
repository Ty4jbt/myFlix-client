import React, { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import config from '../../config';
import { Link } from 'react-router-dom';
 
export function ProfileView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const updateUserInfo = (e) => {
        e.preventDefault();
        axios.post(`${config.APIURL}/users`, {
            Username: username,
            Password: password,
            Email: email,
            Birthdate: birthdate
        })
        .then(response => {
            const data = response.data;
            console.log(data);
            window.open('/', '_self');
        })
        .catch(e => {
            console.log('error registering the user')
        });
    }

    return (
        <div>
            <h2>Update Information</h2>
            <Form>
                <Form.Group controlId='registerUsername'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type='text' onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='registerPassword'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type='password' onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='registerEmail'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type='text' onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='registerBirthdate'>
                    <Form.Label>Birthdate:</Form.Label>
                    <Form.Control type='text' onChange={e => setBirthdate(e.target.value)} />
                </Form.Group>
                
                <Button variant='success' type='submit' onClick={updateUserInfo}>
                    Submit
                </Button>  
            </Form>
            <Link to={`/`}>
                <Button variant='primary'>Back</Button>
            </Link>
            <h2>Favorite Movies</h2>
            {props.favoriteMovies.map((m) => <MovieCard key={m._id} movie={m} />)}
            <Button variant='danger'>Deregister</Button>
        </div>
    )
}