import React from 'react';
import PropTypes from 'prop-types';

// import './MoviePreview.css'
import imgNotA from '../../assets/imageNotFound.jpg'

const MoviePreview = ({movie}) => {
    const movieImage = movie.img || imgNotA

    return (
        <div >
            <img src={movieImage} alt="Movie" width="300" height="300" />
            <h1>{movie.title}</h1>
            <span>Director: {movie.director}</span>
        </div>
    )
}

MoviePreview.propTypes = {
    movie: PropTypes.object.isRequired
}

export default MoviePreview;