import React from 'react';
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import { withRouter } from "react-router-dom";
const { REGISTER_USER } = Mutations;

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e, registerUser) {
        e.preventDefault();
        registerUser({
            variables: this.state
        }).catch(err => console.log(err));
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    updateCache(client, { data }) {
        console.log(data);
        client.writeData({
            data: { isLoggedIn: data.register.loggedIn }
        });
    }

    render() {
        const { firstName, lastName, email, password } = this.state;
        return (
            <Mutation 
                mutation={REGISTER_USER}
                onCompleted={data => {
                    const { token } = data.register;
                    localStorage.setItem("auth-token", token);
                    this.props.history.push("/");
                }}
                update={(client, data) => this.updateCache(client, data)}

            >
                {registerUser => (
                    <form className="session-signup" 
                        onSubmit={e => this.handleSubmit(e, registerUser)}>
                        <h3>Sign Up</h3>
                        <div className="signup-name">
                            <div className="signup-fn">
                                <h4>First Name</h4>
                                <input type="text"
                                    value={firstName}
                                    onChange={this.update("firstName")}
                                />
                            </div>
                            <div className="signup-ln">
                                <h4>Last Name</h4>
                                <input type="text"
                                    value={lastName}
                                    onChange={this.update("lastName")}
                                />
                            </div>
                        </div>
                        <div className="signup-email">
                            <h4>Email</h4>
                            <input type="text"
                                value={email}
                                onChange={this.update("email")}
                            />
                        </div>
                        <div className="signup-password">
                            <h4>Password</h4>
                            <input type="password"
                                value={password}
                                onChange={this.update("password")}
                            />
                        </div>
                        <button className="signup-btn">Sign Up</button>
                    </form>
                )}

            </Mutation>
        )
    }
}

export default withRouter(Register);