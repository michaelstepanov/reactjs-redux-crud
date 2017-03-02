import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ActiveLink from './components/global/ActiveLink';
import PostsPage from './components/posts/PostsPage';
import UsersPage from './components/users/UsersPage';
import PostFormPage from './components/posts/PostFormPage';
import HomePage from './HomePage';
import './App.css';

class App extends Component {
  render() {
    return (
        <div>
            <nav>
                <div className="container">
                    <div className="nav-wrapper">
                        <ul className="left">
                            <ActiveLink activeOnlyWhenExact className="item" to="/" label="Home" />
                            <ActiveLink className="item" to="/posts" label="Posts" />
                            <ActiveLink className="item" to="/users" label="Users" />
                        </ul>
                    </div>
                </div>
            </nav>
            
            <div className="container">
                <Route exact path="/" component={HomePage} />
                <Route exact path="/posts" component={PostsPage} />
                <Route path="/posts/create" component={PostFormPage} />
                <Route path="/posts/:id/edit" component={PostFormPage} />
                <Route exact path="/users" component={UsersPage} />
            </div>

            <footer className="page-footer">
                <div className="container">
                    <div className="row">
                        <div className="col l6 s12">
                            <h5 className="white-text">Footer Content</h5>
                            <p className="grey-text text-lighten-4">Some footer content.</p>
                        </div>
                        <div className="col l4 offset-l2 s12">
                            <h5 className="white-text">Links</h5>
                            <ul>
                                <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
                                <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
                                <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
                                <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        © 2017 Copyright Text
                        <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
                    </div>
                </div>
            </footer>
        </div>
        );
    }
}

export default App;