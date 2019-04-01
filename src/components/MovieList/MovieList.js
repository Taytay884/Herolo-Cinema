import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import MoviePreview from '../MoviePreview/MoviePreview'

const MovieList = (props) => {
    const moviePreview = props.movies.map((movie, i) => {
        return (
            <li key={movie.id}>
                <Link to={`/${movie.id}`}>
                    <MoviePreview movie={movie}/>
                </Link>
            </li>
        )
    });

    return (
        <div>
            <ul>
                {moviePreview}
            </ul>
        </div>
    );
}

MovieList.propTypes = {
    movies: PropTypes.array.isRequired
}


export default MovieList;
