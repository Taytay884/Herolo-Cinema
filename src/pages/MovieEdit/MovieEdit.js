import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Modal} from 'react-bootstrap';
import Swal from 'sweetalert2'


import MovieForm from '../../components/MovieForm/MovieForm'
import {setSelectedMovieToEdit, saveMovie} from "../../store/MovieAction";

class MovieEdit extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: true,
            movieToEdit: (props.movieToEdit) ? props.movieToEdit : {}
        };
    }

    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    handleSubmit = (values) => {
        let movieNameAvilable = this.props.movies.findIndex(movie => movie.title === values.title);
        if (movieNameAvilable !== -1) {
            Swal(
                <div>
                    <h1>Error</h1>
                    <p>The same movie name already exist</p>
                </div>
            )
        }
        else {
            (this.state.movieToEdit) ?
                this.props.saveMovie({...this.state.movieToEdit, ...values}, this.props.movies)
                : this.props.saveMovie(values, this.props.movies)
        }


    }

    render() {
        const selectedMovie = this.state.movieToEdit;
        const initialValues = {
            title: selectedMovie.title || '',
            year: selectedMovie.year || '',
            runtime: selectedMovie.runtime || '',
            genre: selectedMovie.genre || '',
            director: selectedMovie.director || ''
        }
        return (
            <div>
                <Modal show={this.props.show && this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <MovieForm initialValues={initialValues} onSubmit={this.handleSubmit}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movieReducer.movies
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedMovieToEdit: (id) => dispatch(setSelectedMovieToEdit(id)),
        saveMovie: (values, movies) => dispatch(saveMovie(values, movies))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MovieEdit);