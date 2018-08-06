import React, {Component} from 'react'
import VacancyCard from "./VacancyCard";

class VacancyCardList extends Component {

    constructor(props) {
        super(props);
        this.value = this.props.vacancies;

    }

    render() {

        let result = this.value.map(vacancy =>
            <div className="col-md">
                <VacancyCard id={vacancy.id}/>
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

export default VacancyCardList;