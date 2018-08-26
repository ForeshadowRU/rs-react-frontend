import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import NavPanel from "../NavPanel";
import {fetchCompanyStart} from "../../actionCreators";
import {asyncFetchCompanies, getLoadingAnimation} from "../../functions";
import loading from '../../resources/svg/cube-loading.gif'

class CompaniesPage extends Component {

    componentDidMount() {
        if (this.props.companies.values.length === 0 && !this.props.companies.isFetching)
            this.props.onFetchData();
    }


    getData() {
        if (this.props.companies.isFetching)
            return (
                <div className="row">
                    <div className="col">{getLoadingAnimation(loading, "Fetching...")}</div>
                </div>
            );
        else return (
            <div className="container">
                <ul>
                    {this.props.companies.values.map((company) => {
                        return <li key={company.id}>
                            <div>{company.id}</div>
                            <div><Link to={"/companies/".concat(company.id)}>{company.name}</Link></div>
                            <div>{company.foundationDate}</div>
                        </li>
                    })}
                </ul>

            </div>)
    }


    render() {
        return (
            <div>
                <NavPanel/>
                {this.getData()}
            </div>
        )
    }
}

export default connect(
    (state) => ({
        companies: state.companies,
    }),
    dispatch => ({
            onFetchData: () => {
                dispatch(fetchCompanyStart());
                dispatch(asyncFetchCompanies());
            },
        }
    )
)(CompaniesPage);

