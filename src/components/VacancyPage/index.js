import React, {Component} from "react";
import RequirementList from "../RequirementList";
import {connect} from "react-redux";
import NavPanel from "../NavPanel";


class VacancyPage extends Component {
    render() {
        const vacancy = this.props.vacancy;
        console.log(this.props);
        return (
            <div>
                <NavPanel/>
                <div className="container" style={{borderColor: "blue", borderWidth: "3px"}}>
                    <div className="border-dark">
                        <h2>{vacancy.name}</h2>
                    </div>
                    <div className="border-dark">
                        <h4><u className="text-muted">Author:</u>{vacancy.author}</h4>
                    </div>
                    <div className="border-dark">
                        Published At:<h6>{vacancy.publishDate}</h6>
                    </div>
                    <div className="border-dark">
                        <RequirementList requirements={vacancy.requirements}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => ({
        vacancy: state.vacancies[ownProps.match.params.id],
    }),
    dispatch => ({})
)(VacancyPage);