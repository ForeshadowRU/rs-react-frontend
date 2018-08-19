import React, {Component} from "react";
import {connect} from "react-redux";
import NavPanel from "../NavPanel";
import axios from "axios";
import {BACKEND_URL} from "../../constants";
import {fetchCompanySuccess} from "../../actionCreators";


class CompanyPage extends Component {

    constructor(props) {
        super(props);
        if (props.companies && props.companies.filter(company => company.id === props.own.match.params.id).length > 0)
            this.state = {
                company: Object.assign({},
                    props.companies.filter(company => company.id === props.own.match.param.id)[0],
                    {isFetching: false}),
            };
        else {
            const id = props.own.match.params.id;
            this.fetchCompany(id);
            this.state = {
                company:
                    {
                        id: id,
                        isFetching: true
                    }
            }
        }
    }

    fetchCompany(id) {
        this.props.onFetchVacancies(id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(
            {
                company: Object.assign(
                    {},
                    nextProps.companies.filter((company) => company.id === nextProps.own.match.params.id)[0],
                    {isFetching: false}
                )
            }
        );
    }

    render() {
        console.log(this.state);
        if (this.state.company.isFetching) return (
            <div>
                <NavPanel/>
                <h1 style={{textAlign: "justify"}}> Loading ...</h1>
            </div>
        );
        return <div>
            <NavPanel/>
            <div className="container" style={{borderColor: "blue", borderWidth: "3px"}}>
                <div className="border-dark">
                    <h2>{this.state.company.name}</h2>
                </div>
                <div className="border-dark">
                    <h6>{this.state.company.description}</h6>
                </div>
                <div className="border-dark">
                    Registered At:<h6>{this.state.company.registrationDate}</h6>
                </div>
            </div>
        </div>
    }
}

export default connect(
    (store, ownProps) => ({
        companies: store.companies,
        own: ownProps,
    }),
    dispatch => ({
        onFetchVacancies: (id) => {
            const asyncFetchCompany = (id) => dispatch => {

                axios.get(BACKEND_URL.concat("/companies/".concat(id)))
                    .then(
                        (response) => {
                            console.log("STATUS:", response.status);
                            if (response.status === 200) {
                                console.log("DISPATCH:", response.data);
                                dispatch(fetchCompanySuccess(response.data));
                            }
                            else if (response.status === 404) {

                            }
                        }
                    );

            };

            dispatch(asyncFetchCompany(id));
        }


    })
)(CompanyPage);