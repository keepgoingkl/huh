import React from 'react';
import NavBar from "./components/navigation/navbar";
import "./assets/css/main.css";
import "./assets/css/navbar.css";

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main">
               <NavBar />
            </div>
        )
    }
}

export default Main;