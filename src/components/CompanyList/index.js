import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import NavPanel from "../NavPanel";

class CompaniesPage extends Component {

    render() {
        return (
            <div>
                <NavPanel/>
                <div className="container">
                    <ul>
                        {this.props.companies.map((company) => {
                            return <li key={company.id}>
                                <div>{company.id}</div>
                                <div><Link to={"/companies/".concat(company.id)}>{company.name}</Link></div>
                                <div>{company.foundationDate}</div>
                            </li>
                        })}
                    </ul>

                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        companies: state.companies,
    }),
    dispatch => ({})
)(CompaniesPage);

