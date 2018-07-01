import React, {Component} from 'react'
import Link from "react-router-dom/es/Link";

class NavPanel extends Component {

    render() {
        return <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="#">RS</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                    aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to="/">
                            <a className="nav-link">Home <span className="sr-only">(current)</span></a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Features</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Pricing</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">About</a>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <Link to="/signup">
                        <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                    </Link>
                </form>
            </div>
        </nav>
    }


}

export default NavPanel;