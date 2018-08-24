import React, {Component} from 'react'
import "bootswatch/dist/flatly/bootstrap.css"
import RequirementList from "../RequirementList";
import {Link} from 'react-router-dom'

class VacancyCard extends Component {
    render() {
        const vacancy = this.props.vacancy;
        return (
            <div className="card card-info-border-users">
                <div className="card-header">
                    <button className="btn btn-outline-danger float-right">x</button>
                    <h4><Link to={"/vacancies/".concat(vacancy.id)}> {vacancy.name}</Link></h4>

                    <Link to={"/companies/".concat(vacancy.author.id)}><h6 className="text-muted">
                        <u>{vacancy.author.name}</u></h6></Link>
                </div>


                <div className="card-body">
                    {vacancy.fullDescription}
                </div>

                <div style={{"margin": "5px"}}>
                    <RequirementList requirements={vacancy.requirements}/>
                </div>
                <div className="card-footer">
                    <span className="float-right">Created At: {vacancy.creationDate.split("T")[0]}</span>
                </div>

            </div>
        )
    }
}

export default VacancyCard;