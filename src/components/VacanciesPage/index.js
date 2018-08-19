import React, {Component} from 'react'
import {connect} from "react-redux";
import NavPanel from "../NavPanel";
import VacancyCardList from "../VacancyCardList";

class VacanciesPage extends Component {

    render() {
        return (
            <div>
                <NavPanel/>
                <VacancyCardList vacancies={this.props.vacancies}/>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        vacancies: state.vacancies,
    }),
    dispatch => ({})
)(VacanciesPage);
