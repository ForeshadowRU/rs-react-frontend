import React, {Component} from 'react'
import Vacancy from "./Vacancy";

class VacancyList extends Component {

    constructor(props) {
        super(props);
        this.value = this.props.vacancies;

    }

    render() {

        let result = this.value.map(vacancy =>
            <div className="col-md">
                <Vacancy name={vacancy.name} description={vacancy.description} author={vacancy.author}
                         requirements={vacancy.requirements}/>
            </div>
        );


        return (
            <div className="container-fluid col-12">
                <div className="row">
                    {result}
                </div>
            </div>
        )
    }

}

export default VacancyList;