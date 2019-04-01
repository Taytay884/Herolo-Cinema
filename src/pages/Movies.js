import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Button} from 'react-bootstrap';


import {loadMovies} from "../store/MovieAction";
import MovieList from '../components/MovieList/MovieList'
import MovieEdit from '../pages/MovieEdit/MovieEdit'


// import PropTypes from 'prop-types';

class Movies extends Component {
    state = {
        showModal: false,
        movies: ''
    }

    componentDidMount() {
        if (!this.props.movies.length)
            this.props.loadMovies()
        
    }
    componentWillUpdate(){
        this.setState({...this.state,movies:this.props.movies})
    }


    render() {
        return (
            <div>
                <Button
                    variant="primary"
                    onClick={() => this.setState({...this.state, showModal: true})}
                >Add Movie</Button>
                {this.state.showModal ? <MovieEdit show={true}/> : null}
                <MovieList movies={(this.state.movies)?this.state.movies:this.props.movies}/>
            </div>
        );
    }
}

//
const mapStateToProps = (state) => {
    return {
        movies: state.movieReducer.movies
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadMovies: () => dispatch(loadMovies())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
