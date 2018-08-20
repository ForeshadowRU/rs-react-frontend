import React, {Component} from 'react'
import LoginForm from "./LoginForm";
import {Link} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {logout} from "../../actionCreators";

class FormHolder extends Component {

    alreadyLoggedIn() {
        return (
            <div className="row" style={{justifyContent: "center", marginTop: "25px"}}>
                <div className="alert alert-warning col-5">
                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                    <h4 className="alert-heading">Warning!</h4>
                    <p className="mb-0">You already logged in as: {this.props.currentUser.username}</p>
                    <button className="btn btn-info" onClick={this.props.onLogout}>Log out</button>
                </div>
            </div>)
    }

    render() {
        if (this.props.currentUser.username) return this.alreadyLoggedIn();
        return (
            <div className="row" style={{marginTop: "20px", justifyContent: "center"}}>

                <div className="card card-info-border col-5" style={{width: "35%"}}>
                    <LoginForm/>
                </div>

                <div className="card card-info-border col-3" style={{width: "10%"}}>
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
