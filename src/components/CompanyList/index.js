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
        if (this.props.isFetching)
            return (
                <div className="row">
                    <div className="col">{getLoadingAnimation(loading, "Fetching...")}</div>
                </div>
            );
        else return (
            <div className="container">
                <div className="col">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Name</th>
                            <th scope="col">Founder</th>
                            <th scope="col">Foundation Date</th>
                            <th scope="col">Registration Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.companies.values.map(
                            (company, i) => {
                                return (
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td><Link to={"/companies/".concat(company.id)}>{company.name}</Link></td>
                                        <td><Link to={"/users/".concat(company.owner)}>{company.owner}</Link></td>
                                        <td>{company.foundationDate}</td>
                                        <td>{company.registrationDate}</td>
                                    </tr>
                                )
                            }
                        )}

                        </tbody>
                    </table>


                </div>

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
    (store) => ({
        companies: store.companies,
        users: store.users.values,
        isFetching: store.companies.isFetching || store.users.isFetching
    }),
    dispatch => ({
            onFetchData: () => {
                dispatch(fetchCompanyStart());
                dispatch(asyncFetchCompanies());
            },
        }
    )
)(CompaniesPage);

