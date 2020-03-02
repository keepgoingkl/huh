import React from 'react';
import { Mutation } from 'react-apollo';
import Mutations from "../../graphql/mutations";
import { withRouter } from "react-router-dom";
const { LOGIN_USER } = Mutations;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e, loginUser) {
        e.preventDefault();
        loginUser({
            variables: this.state
        }).catch(err => console.log(err));
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    updateCache(client, { data }) {
        console.log(data);
        client.writeData({
            data: { isLoggedIn: data.login.loggedIn }
        });
    }

    render() {
        const { email, password } = this.state;
        return (
            <Mutation 
                mutation={LOGIN_USER}
                onCompleted={data => {
                    const { token } = data.login;
                    localStorage.setItem("auth-token", token);
                    this.props.history.push("/");
                }}
                update={(client, data) => this.updateCache(client, data)}
            >
                {loginUser => (
                    <form className="session-login" onSubmit={e => this.handleSubmit(e, loginUser)}>
                        <h3>Login</h3>
                        <input type="text"
                            className="login-email"
                            value={email}
                            placeholder="Email"
                            onChange={this.update("email")}
                        />
                        <input type="password"
                            className="login-pw"
                            value={password}
                            placeholder="Password"
                            onChange={this.update("password")}
                        />
                        <button className="login-btn">Login</button>
                    </form>
                )}
            </Mutation>


        )
    }
}

export default withRouter(Login);