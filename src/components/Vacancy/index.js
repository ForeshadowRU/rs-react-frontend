import React, {Component} from 'react'
import "bootswatch/dist/flatly/bootstrap.css"
import RequirementList from "../RequirementList";

class Vacancy extends Component {
    render() {
        const vacancy = this.props;

        return (
            <div className="card card-info-border">
                <div className="card-header">
                    <button className="btn btn-outline-danger float-right">x</button>
                    <h4>{vacancy.name}</h4>

                    <h6 className="text-muted"><u>{vacancy.author}</u></h6>
                </div>


                <div className="card-body">
                    {vacancy.description}
                </div>

                <div style={{"margin": "5px"}}>
                    <RequirementList requirements={vacancy.requirements}/>
                </div>
                <div className="card-footer">
                    <button className="btn btn-dark">Expand</button>
                </div>

            </div>
        )
    }
}

export default Vacancy;