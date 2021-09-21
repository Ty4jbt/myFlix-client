import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import config from '../../config';

export class MovieView extends React.Component {

    addToFavs= () => {
        axios.post(`${config.APIURL}/users/${this.props.user}/movies/${this.props.movie._id}`, {}, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}

        })
        .then(result => {
            this.props.addFavoriteToUserData(this.props.movie._id)

        })
        .catch(e => {
            console.error(e)
        })
    }

    removeFromFavs= () => {
        axios.delete(`${config.APIURL}/users/${this.props.user}/movies/${this.props.movie._id}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}

        })
        .then(result => {
            // console.log(result);

            this.props.removeFavoriteFromUserData(this.props.movie._id)

        })
        .catch(e => {
            console.error(e)
        })
    }

    render() {
        const { movie } = this.props;

        return (
            <div className='movie-view'>
                <div className='movie-poster'>
                    <img src={`/img/${movie.ImagePath}`} />
                </div>
                <div className='movie-title'>
                    <span className='label'>Title: </span>
                    <span className='value'>{movie.Title}</span>
                </div>
                <div className='movie-description'>
                    <span className='label'>Description: </span>
                    <span className='value'>{movie.Description}</span>
                </div>
                <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant='link'>Director</Button>
                </Link>
                <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant='link'>Genre</Button>
                </Link>
                <Link to={`/`}>
                    <Button variant='primary'>Back</Button>
                </Link>
                {!this.props.userData.FavoriteMovies.includes(movie._id) && <Button variant='primary' onClick={this.addToFavs}>Add to Favorites</Button>}
                {this.props.userData.FavoriteMovies.includes(movie._id) && <Button variant='danger' onClick={this.removeFromFavs}>Remove from Favorites</Button>}
            </div>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string,
        }),
    }).isRequired
};