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
        axios.put(`${config.APIURL}/users/${props.user}`, {
            Username: username,
            Password: password,
            Email: email,
            Birthdate: birthdate
        },
        {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}    
        })
        .then(response => {
            const data = response.data;
            // console.log(data);
            // window.open('/', '_self');
            localStorage.setItem('user', username);
            props.updateLocalUserData({
                Username: username,
                Password: password,
                Email: email,
                Birthdate: birthdate
            })
            props.history.push('/')
        })
        .catch(e => {
            console.log('error updating the user')
        });
    }

    function deregisterUser() {
        axios.delete(`${config.APIURL}/users/${props.user}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}

        })
        .then(response => {
            // console.log(response);
            console.log(`${props.user} has been deleted`);
            // window.open('/', '_self');
            props.onLoggedOut()
        })
        .catch(e => {
            console.error(e)
        })
    }

    return (
        <div>
            <h2>Update Information</h2>
            <Form>
                <Form.Group controlId='registerUsername'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type='text' placeholder='required length of 5 min.' onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='registerPassword'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type='password' placeholder='required' onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='registerEmail'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type='email' placeholder='required' onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='registerBirthdate'>
                    <Form.Label>Birthdate:</Form.Label>
                    <Form.Control type='Date' placeholder='not required' onChange={e => setBirthdate(e.target.value)} />
                </Form.Group>
                
                <Button 
                    variant='success' 
                    type='submit' 
                    onClick={updateUserInfo}
                >
                    Submit
                </Button>  
            </Form>
            <Link to={`/`}>
                <Button variant='primary'>Back</Button>
            </Link>
            <h2>Favorite Movies</h2>
            {props.favoriteMovies.map((m) => 
                <MovieCard 
                    user={props.user}
                    userData={props.userData}
                    addFavoriteToUserData={props.addFavoriteToUserData}
                    removeFavoriteFromUserData={props.removeFavoriteFromUserData} 
                    key={m._id} 
                    movie={m}
                />)}
            <Button variant='danger' onClick={deregisterUser}>Deregister</Button>
        </div>
    )
}