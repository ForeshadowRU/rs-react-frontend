import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import {Redirect} from "react-router-dom";
import {asyncPost} from "../../functions";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        console.log("KAK TO TAK:", props);
        this.state = {
            loginInputValue: '',
            passwordInputValue: '',
            successful: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser.username !== this.props.currentUser.username) {
            this.setState({...this.state, successful: true})
        }
    }

    submitLoginRequest() {
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

    componentDidMount() {
        if (this.props.currentUser.username) {
            this.setState({...this.state, successful: true})
        }
    }

    render() {

        if (this.state.successful) {
            const path = "/user/".concat(this.props.currentUser.username);
            return <Redirect to={path}/>;
        }
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
        },

    }))(LoginForm);
