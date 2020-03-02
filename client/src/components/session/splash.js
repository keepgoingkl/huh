import React from 'react';
import Waldo from "../../assets/images/waldo.jpg";
import Register from "./register";
import Login from "./login";

class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            waldo: false
        }
    }

    toggleWaldo(e) {
        this.setState({ waldo: !this.state.waldo }, () => {
            const menu = document.querySelector(".session-container");
            if (this.state.waldo) {
                Array.from(menu.children).forEach(child => {
                    child.classList.add("disappear");
                })
            } else {
                Array.from(menu.children).forEach(child => {
                    child.classList.remove("disappear");
                })
            }
        })
    }

    render() {
        return (
            <div className="splash">
                <span className="toggle-waldo" onClick={e => this.toggleWaldo(e)}>
                    (｡◕‿‿◕｡) find waldo!
                </span>
                <img className="waldo" src={Waldo}></img>
                <div className={this.state.waldo ? "session-container fadeout" : "session-container"}>
                    <h1>huh?</h1>
                    <h2>A place to quench your curiosity and cure imposter syndrome</h2>
                    <div className="session">
                        <Register />
                        <Login />
                    </div>
                </div>
            </div>
        )
    }
}

export default Splash;