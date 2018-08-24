import React, {Component} from 'react'
import LoginForm from "./LoginForm";
import {Link, Redirect} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {logout} from "../../actionCreators";

class FormHolder extends Component {

    alreadyLoggedIn() {
        return <Redirect to={"/users/".concat(this.props.currentUser.username)}/>

    }

    render() {
        if (this.props.currentUser.username) return this.alreadyLoggedIn();
        return (
            <div className="row" style={{marginTop: "20px", justifyContent: "center"}}>

                <div className="card card-info-border-users col-5" style={{width: "35%"}}>
                    <LoginForm/>
                </div>

                <div className="card card-info-border-users col-3" style={{width: "10%"}}>
                    <form>
                        <div className="form-group">
                            <h4>Don't have an account?</h4>
                            <h5>Get it free:</h5>

                            <Link to="/register/">
                                <button className="btn btn-info">Sign Up</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>)
    }
}

export default connect(
    (state, ownProps) => ({
        currentUser: state.currentUser,
        ownProps
    }),
    dispatch => ({
        onLogout: () => {
            dispatch(logout());
        }
    }))(FormHolder);
