import React from 'react';
import { Link } from 'react-router-dom';
import Searchbar from "./searchbar";

class NavBar extends React.Component {
    constructor(props) {
        super(props);


    }

    render() {
        return (
            <div className="nav-container">
                <div className="nav-content">
                    <div className="nav-logo">
                        <Link to="/">huh?</Link>
                    </div>
                    <ul className="nav-links">
                        <Link to="/home">
                            <li className="nav-home">
                                <i className="far fa-list-alt"></i>
                                <span>Home</span>
                            </li>
                        </Link>
                        <Link to="/answer">
                            <li className="nav-answer">
                                <i className="far fa-edit"></i>
                                <span>Answer</span>
                            </li>
                        </Link>
                        <Link to="/topics">
                            <li className="nav-topics">
                                <i className="far fa-comments"></i>
                                <span>Topics</span>
                            </li>
                        </Link>
                        <li className="nav-notifications">
                            <i className="far fa-bell"></i>
                            <span>Notifications</span>
                        </li>
                    </ul>
                    <Searchbar />
                    <button className="nav-ask-btn">
                        Add Question
                    </button>
                </div>
            </div>

        );
    }
}

export default NavBar;