import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetalis/MovieDetails'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/:id" component={MovieDetails}/>
                        <Route path="/" component={Movies}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
