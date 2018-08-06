import React, {Component} from "react";
import {connect} from "react-redux";
import NavPanel from "../NavPanel";


class CompanyPage extends Component {
    render() {
        const company = this.props.company;
        console.log(this.props);
        return (
            <div>
                <NavPanel/>
                <div className="container" style={{borderColor: "blue", borderWidth: "3px"}}>
                    <div className="border-dark">
                        <h2>{company.name}</h2>
                    </div>
                    <div className="border-dark">
                        <h6>{company.description}</h6>
                    </div>
                    <div className="border-dark">
                        Registered At:<h6>{company.registrationDate}</h6>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => ({
        company: state.companies[ownProps.match.params.id],
    }),
    dispatch => ({})
)(CompanyPage);