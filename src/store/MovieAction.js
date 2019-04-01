import movieService from '../services/MovieService'
import movieTitles from '../constants/MovieTitles'


//types
const LOAD_MOVIES = 'LOAD_MOVIES';
const LOAD_MOVIE = 'LOAD_MOVIE';
const DELETE_MOVIE = 'DELETE_MOVIE';
const SET_SELECTED_MOVIE_EDIT = 'SET_SELECTED_MOVIE_EDIT';
const SAVE_MOVIE = 'SAVE_MOVIE';

export function loadMovies() {
    return (dispatch) => {
        movieService.getMovies(movieTitles)
            .then((movies) => {
                dispatch({
                    type: LOAD_MOVIES,
                    payload: movies
                })
            })
    }
}

export function loadMovieById(id, movies) {
    return (dispatch) => {
        movieService.getMovieById(id, movies)
            .then((movie) => {
                dispatch({
                    type: LOAD_MOVIE,
                    payload: movie
                })
            })
    }

}

export function deleteMovie(id, movies) {
    return (dispatch) => {
        movieService.deleteMovie(id, movies)
            .then((movies) => {
                dispatch({
                    type: DELETE_MOVIE,
                    payload: movies
                })
            })
    }
}

// variable values is a terrible name.
export function saveMovie(values, movies) {
    // I don't understood why it's a promise...
    return (dispatch) => {
        movieService.saveMovie(values, movies)
            .then((movie) => {
                dispatch({
                    type: SAVE_MOVIE,
                    payload: movie
                })
            })
    }
}

export function setSelectedMovieToEdit(id) {
    return (dispatch) => {
        dispatch({
            type: SET_SELECTED_MOVIE_EDIT,
            payload: id
        })
    }
}