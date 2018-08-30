import React, {Component} from 'react'
import "bootswatch/dist/flatly/bootstrap.css"
import RequirementList from "../RequirementList";
import {Link} from 'react-router-dom'
import connect from "react-redux/es/connect/connect";

class VacancyCard extends Component {

    static currencySign(currency) {
        switch (currency) {
            case "RUB":
                return "₽";
            case "EUR":
                return "€";
            case "USD":
                return "$";
            default:
                return currency;
        }
    }

    static getTypeLetter(type) {
        if (type.substr(0, 3) === "PER") return type.split("_")[1][0];
        else return type[0];
    }

    render() {
        const vacancy = this.props.vacancy;
        const author = this.props.companies.values.filter(cmp => cmp.id === vacancy.authorId)[0];
        return (
            <div className="card card-info-border-users">
                <div className="card-header">
                    <h4><Link to={"/vacancies/".concat(vacancy.id)}> {vacancy.name}</Link></h4>

                    <Link to={"/companies/".concat(vacancy.authorId)}><h6 className="text-muted">
                        <u>{author.name}</u></h6></Link>
                </div>


                <div className="card-body">
                    {vacancy.description}
                </div>

                <div style={{"margin": "5px"}}>
                    <RequirementList requirements={vacancy.requirements} limit={3}/>
                </div>
                <div className="card-footer">
                    <h6>{vacancy.salary} {VacancyCard.currencySign(vacancy.currency)}/{VacancyCard.getTypeLetter(vacancy.type)}
                        <span className="float-right">Created At: {vacancy.creationDate.split("T")[0]}</span>
                    </h6>
                </div>

            </div>
        )
    }
}

export default connect(
    (store, ownProps) => ({
        companies: store.companies,
        vacancies: store.vacancies,
        users: store.users,
        ownProps,
    }),
    dispatch => ({}
    ))(VacancyCard);
