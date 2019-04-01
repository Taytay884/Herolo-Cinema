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
    return new Promise((resolve, reject) => {
        movie.id = uniqid();
        movie.picture = imgNotA;
        movies.push(movie);
        resolve(movies)
    })
}

function saveMovie(movie, movies) {
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