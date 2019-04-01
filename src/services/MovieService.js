import axios from 'axios'
import uniqid from 'uniqid'

import imgNotA from '../assets/imageNotFound.jpg'



function getMovies(movieTitles) {
    const moviesPromises = movieTitles.map((movieTitle) => {
        return fetchMovie(movieTitle);
    })
    return Promise.all(moviesPromises).then((movies) => {
        return (movies)
    })

}

function getMovieById(id, movies) {
    return new Promise((resolve, reject) => {
        const movie = movies.find(movie => movie.id === id)
        movie ? resolve(movie) : reject(`Movie id ${id} not found!`)
    })
}

function deleteMovie(id, movies) {
    return new Promise((resolve) => {
        const index = movies.findIndex(movie => movie.id === id)
        if (index !== -1) {
            movies.splice(index, 1)
        }
        resolve(movies)
    })
}

function _updateMovie(movie,movies) {
    return new Promise(resolve => {
        const index = movies.findIndex(m => movie.id === m.id)
        if (index !== -1) {
            movies[index] = movie
        }
        resolve(movies)
    })
}

function _addMovie(movie,movies) {
    // Good job, uniqId, nice, empty img.
    return new Promise((resolve, reject) => {
        movie.id = uniqid();
        movie.picture = imgNotA;
        /*
        *
        * Your mistake is here,  I said, don't use push.
        * In React you cannot use push, it's the same pointer!
        * Debugging your code is the most important thing you have to know.
        * Use CTRL + SHIFT + ALT + L to format your code, please.
        * The whole code looks good, good job Niti. <3
        *
        *
        * */
        // movies.push(movie); // <<<< WRONGGGGGG
        movies = [...movies, movie];
        resolve(movies)
    })
}

function saveMovie(movie, movies) {
    // Very good! the only thing is that values changed to movies. 0.o (It's took me time to understood).
    return movie.id ? _updateMovie(movie, movies) : _addMovie(movie, movies)
}


function fetchMovie(movieTitle) {
    return new Promise(resolve => {
        axios.get(`http://www.omdbapi.com/?t=+${movieTitle}&&apikey=388ebc5`)
            .then(res => {
                const {Title, Director, Genre, Year, Runtime, Poster} = res.data;
                resolve({
                    'id': uniqid(),
                    'title': Title,
                    'director': Director,
                    'genre': Genre,
                    'year': Year,
                    'runtime': Runtime,
                    'img': Poster
                })
            })
    })
}


export default {
    getMovies,
    getMovieById,
    deleteMovie,
    saveMovie
}