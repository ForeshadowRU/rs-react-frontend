import React, {Component} from 'react'
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import {logout} from "../actionCreators";
import persistor from '../index'

class NavPanel extends Component {

    userBar() {
        if (this.props.currentUser.username)
            return (<div className="">

                    <form className="form-inline my-2 my-lg-0">
                        <div style={{marginRight: "50px"}} className="navbar-text">Current
                            User:<span><Link
                                to={"/users/".concat(this.props.currentUser.username)}>{this.props.currentUser.username}</Link></span>
                        </div>
                        <Link to="/signup">
                            <button className="btn btn-secondary my-2 my-sm-0" type="button"
                                    onClick={this.props.onLogout}>Log Out
                            </button>
                        </Link>
                    </form>
                </div>
            );
        else return (
            <form className="form-inline my-2 my-lg-0">
                <Link to="/signup">
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit">Login / Sign Up</button>
                </Link>
            </form>
        )
    }

    render() {
        const user = this.userBar();
        return <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="/">RS</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                    aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item ">
                        <Link to="/" className="nav-link">
                            Home <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className={"nav-item".concat((this.props.location.pathname.indexOf("/companies") !== -1)
                        ? " active" : "")}>
                        <Link to="/companies" className="nav-link">
                            Companies <span className="sr-only"/>
                        </Link>
                    </li>
                    <li className="nav-item" onClick={this.props.onPurge}>
                        <div className="nav-link">
                            PURGE STORE <span className="sr-only"/>
                        </div>
                    </li>
                </ul>
                {user}

            </div>
        </nav>
    }


}

export default connect(
    (state) => ({
        currentUser: state.currentUser,
        location: state.router.location
    }),
    dispatch => ({
        onLogout: () => {
            dispatch(logout())
        },
        onPurge: () => {
            persistor.purge().then(response => console.log(response, "PURGED"));
        }
    })
)(NavPanel);
