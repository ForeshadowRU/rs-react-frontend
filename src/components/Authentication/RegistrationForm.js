import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import NavPanel from "../NavPanel";
import axios from "axios";
import {BACKEND_URL, USER_AUTH_ERROR, USER_AUTH_STARTED, USER_AUTH_SUCCESSFUL} from "../../constants";
import {getLoadingAnimation} from "../../functions";
import cube from '../../resources/svg/cube-loading.gif'

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            request: {
                firstName: null,
                secondName: null,
                phoneNumber: null,
                email: null,
                username: null,
                companyId: null,
                password: null,
                passwordMatch: null,
            }
        };
    }

    onFirstNameChanged(event) {
        this.setState({
            request: {...this.state.request, firstName: event.target.value}
        })
    }

    onLastNameChanged(event) {
        this.setState({
            request: {...this.state.request, secondName: event.target.value}
        })
    }

    onUsernameChanged(event) {
        this.setState({
            request: {...this.state.request, username: event.target.value}
        })
    }

    onPasswordChanged(event) {
        this.setState({
            request: {...this.state.request, password: event.target.value}
        })
    }

    onRpasswordChanged(event) {
        this.setState({
            request: {...this.state.request, passwordMatch: this.state.request.password === event.target.value}
        })
    }

    onEmailChanged(event) {
        this.setState({
            request: {...this.state.request, email: event.target.value}
        })
    }

    onPhoneNumberChanged(event) {
        this.setState({
            request: {...this.state.request, phoneNumber: event.target.value}
        })
    }

    onCompanyChanged(event) {
        this.setState({
            request: {...this.state.request, companyId: event.target.value}
        })
    }


    submitRequest() {
        let json = {...this.state.request, passwordMatch: undefined, authorities: ["ROLE_USER"]};
        this.props.onSubmission(JSON.stringify(json));

    }

    showFeedback() {
        if (this.state.request.passwordMatch === false)
            return <div className="invalid-feedback">Passwords didn't match. Try again, please</div>
        else return <div/>
    }

    static showLoadingIndication() {
        return getLoadingAnimation(cube, "");
    }

    showRegisterButton() {
        return <button className="btn btn-info col-6" style={{alignment: "justify"}} type="button"
                       onClick={this.submitRequest.bind(this)}>
            Register
        </button>
    }

    render() {


        return (
            <div>
                <NavPanel/>
                <div className="row" style={{justifyContent: "center"}}>

                    <form method="POST" style={{margin: "15px"}} className="card card-info-border-users col-6">
                        <fieldset>
                            <legend>Registration</legend>
                            <div className="form-group row" style={{marginLeft: "10px", marginRight: "10px"}}>
                                <label htmlFor="username">Username:</label>
                                <input className="form-control" type="text" id="username" maxLength='50'
                                       onChange={(event) => this.onUsernameChanged(event)}/>
                            </div>
                            <div className="form-group row" style={{marginLeft: "10px", marginRight: "10px"}}>
                                <label htmlFor="password">Password:</label>
                                <input className="form-control" type="password" id="password" maxLength='50'
                                       onChange={(event) => this.onPasswordChanged(event)}/>
                            </div>
                            <div className="form-group row " style={{marginLeft: "10px", marginRight: "10px"}}>
                                <label htmlFor="rpassword">Repeat Password:</label>
                                <input
                                    className={"form-control ".concat(this.state.request.passwordMatch === false ? "is-invalid" : "")}
                                    type="password" id="rpassword" maxLength='50'
                                    onChange={(event) => this.onRpasswordChanged(event)}/>
                                {this.showFeedback()}
                            </div>
                            <div className="form-group row" style={{marginLeft: "10px", marginRight: "10px"}}>
                                <label htmlFor="firstname">First Name:</label>
                                <input className="form-control" type="text" id="firstname" maxLength='50'
                                       onChange={(event) => this.onFirstNameChanged(event)}/>
                            </div>
                            <div className="form-group row" style={{marginLeft: "10px", marginRight: "10px"}}>
                                <label htmlFor="lastname">Last Name:</label>
                                <input className="form-control" type="text" id="lastname" maxLength='50'
                                       onChange={(event) => this.onLastNameChanged(event)}/>
                            </div>
                            <div className="form-group row" style={{marginLeft: "10px", marginRight: "10px"}}>
                                <label htmlFor="email">Email :</label>
                                <input className="form-control" type="email" id="email" maxLength='50'
                                       onChange={(event) => this.onEmailChanged(event)}/>
                            </div>
                            <div className="form-group row" style={{marginLeft: "10px", marginRight: "10px"}}>
                                <label htmlFor="phone-number">PhoneNumber:</label>
                                <input className="form-control" type="text" id="phone-number" maxLength='50'
                                       onChange={(event) => this.onPhoneNumberChanged(event)}/>
                            </div>
                            <div className="form-group row" style={{marginLeft: "10px", marginRight: "10px"}}>
                                <label htmlFor="company">Company:</label>
                                <input className="form-control" type="text" id="company" maxLength='50'
                                       onChange={(event) => this.onCompanyChanged(event)}/>
                            </div>

                            <div className="form-group row" style={{margin: "10px"}}>

                            </div>
                        </fieldset>
                        {(this.props.isFetching === true) ? RegistrationForm.showLoadingIndication() : this.showRegisterButton()}
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => ({
        companies: state.companies,
        isFetching: state.currentUser.isFetching
    }),
    dispatch => ({
        onSubmission: (json) => {
            console.log("DISPATCHING WITH:", json);
            dispatch(asyncPost(json))
        }
    }))(RegistrationForm);

const asyncPost = (json) => dispatch => {
    dispatch({type: USER_AUTH_STARTED});
    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };
    axios.post(BACKEND_URL.concat("/public/register"), json, config)
        .then(
            (response) => {
                console.log(response);
                dispatch({
                    type: USER_AUTH_SUCCESSFUL,
                    payload: response.data,
                });

            }
        ).catch(error => {
            dispatch({
                type: USER_AUTH_ERROR,
            });
            console.log(error);
        }
    );

};