import React, {Component} from 'react'
import VacancyCard from "./VacancyCard";
import "bootswatch/dist/flatly/bootstrap.css"

class VacancyCardList extends Component {

    shouldComponentUpdate() {
        return true;
    }

    render() {

        if (!this.props.vacancies || this.props.vacancies.length === 0)
            return (
                <div className="card-info-border">
                    <span>No Data Available</span>
                </div>
            );
        let vacancies = this.props.vacancies.slice();
        let rows = [];
        while (vacancies.length > 0) {
            let row = [];
            let i = 0;
            while (i < 3 && vacancies.length > 0) {
                row.push(vacancies.pop());
                i++;
            }
            rows.push(row);
        }

        let result = rows.map(row => {

            let vacancies = row.map(vacancy => {
                    return (
                        <div className="col-4">
                            <VacancyCard vacancy={vacancy}/>
                        </div>
                    )
                }
            );
            return (
                <div className="row" style={{width: "100%"}}>
                    {vacancies}
                </div>
            )
        });
        return (
            <div className="container-fluid">
                {result}
            </div>
        );

    }

}

export default VacancyCardList;