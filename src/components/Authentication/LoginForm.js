import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import {BACKEND_URL, USER_AUTH_SUCCESSFUL} from "../../constants";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginInputValue: '',
            passwordInputValue: ''
        };
    }

    submitLoginRequest() {
        console.log(this.state.loginInputValue);
        console.log(this.state.passwordInputValue);

        const Json = JSON.stringify({
            login: this.state.loginInputValue,
            password: this.state.passwordInputValue
        });
        this.props.onSubmission(Json);

    }

    updateLoginValue(evt) {
        this.setState({
            loginInputValue: evt.target.value
        });
    }

    updatePasswordValue(evt) {
        this.setState({
            passwordInputValue: evt.target.value
        });
    }


    render() {


        return (
            <form method="POST" style={{margin: "15px"}}>
                <fieldset>
                    <legend>Login</legend>

                    <div className="form-group">

                        <label htmlFor="exampleInputEmail1">Email or Login</label>
                        <input type="text" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp" placeholder="Login"
                               value={this.state.loginInputValue}
                               onChange={evt => this.updateLoginValue(evt)}/>
                        <small id="emailHelp" className="form-text text-muted">Username, email, and phone number are
                            valid login
                        </small>
                    </div>
                    <div className="form-group">

                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" id="password"
                               aria-describedby="passwordHelp" placeholder="Password"
                               value={this.state.passwordInputValue}
                               onChange={evt => this.updatePasswordValue(evt)}/>
                    </div>

                    <button className="btn btn-info" type="button" onClick={this.submitLoginRequest.bind(this)}>Login
                    </button>
                </fieldset>

            </form>
        )
    }
}

export default connect(
    (state, ownProps) => ({
        currentUser: state.currentUser,
        ownProps
    }),
    dispatch => ({
        onSubmission: (json) => {
            console.log("DISPATCHING WITH:", json);
            dispatch(asyncPost(json))
        }
    }))(LoginForm);

export const asyncPost = (json) => dispatch => {
    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };
    axios.post(BACKEND_URL.concat("/public/login"), json, config)
        .then(
            (response) => {
                console.log(response);
                if (response.status === 200) {
                    dispatch({
                        type: USER_AUTH_SUCCESSFUL,
                        payload: response.data,
                    });
                }
            }
        ).catch(error => console.log(error));

};