import React, {Component} from "react";
import RequirementList from "../RequirementList";
import {connect} from "react-redux";
import NavPanel from "../NavPanel";
import {Link} from "react-router-dom";
import {fetchCompanyStart, fetchVacancies} from "../../actionCreators";
import {asyncFetchCompanies, asyncFetchVacancies, getLoadingAnimation} from "../../functions";
import loading from '../../resources/svg/cube-loading.gif'

class VacancyPage extends Component {
    constructor(props) {
        super(props);
        let vacancy = this.props.vacancies.values.filter(vacancy => vacancy.id === this.props.ownProps.match.params.id)[0];
        let author = this.props.companies.values.filter(company => company.id === vacancy.authorId)[0];
        if (!vacancy)
            this.state = {
                isFetching: true,
            };
        else this.state = {
            isFetching: this.props.vacancies.isFetching || this.props.companies.isFetching,
            vacancyToDisplay: vacancy,
            author,
        }
    }


    componentWillReceiveProps(nextProps) {
        let vacancy = nextProps.vacancies.values.filter(vacancy => vacancy.id === nextProps.ownProps.match.params.id)[0];
        let author = nextProps.companies.values.filter(cpm => cpm.id === vacancy.authorId)[0];
        if (vacancy)
            this.setState({
                ...this.state,
                isFetching: nextProps.vacancies.isFetching || nextProps.companies.isFetching,
                vacancyToDisplay: vacancy,
                author,
            })
    }

    componentDidMount() {
        if (!this.state.vacancyToDisplay && !this.state.isFetching)
            this.props.onFetchData();
    }

    showImportantSkillsTab() {
        return (<li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#information">Important Skills</a>
        </li>)
    }

    showSkillsTab() {
        return (<li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#posted-vacancies">Good If you know</a>
        </li>)
    }

    render() {

        if (this.state.isFetching) {
            return (
                <div>
                    <NavPanel/>
                    <div className="container">
                        <div className="row">
                            {getLoadingAnimation(loading, "Fetching...")}
                        </div>
                    </div>
                </div>
            )
        }

        let importantSkills = this.state.vacancyToDisplay.requirements.filter(skill => skill.important);
        let skills = this.state.vacancyToDisplay.requirements.filter(skill => !skill.important);
        return (
            <div>
                <NavPanel/>
                <div className="card card-info-border-users" style={{margin: "25px"}}>
                    <div style={{margin: "25px"}}>
                        <div className="container card-header">
                            <h4>{this.state.vacancyToDisplay.name}</h4>
                        </div>
                        <div className="container">
                            <Link
                                to={"/companies/".concat(this.state.vacancyToDisplay.authorId)}>
                                <h4> {this.state.author.name}</h4>
                            </Link>

                        </div>
                        <div className="container">
                            <p>{this.state.vacancyToDisplay.description}</p>
                        </div>


                        <ul className="nav nav-tabs">
                            {(importantSkills.length > 0) ? this.showImportantSkillsTab() : ""}
                            {(skills.length > 0) ? this.showSkillsTab() : ""}
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#contacts">Contacts</a>
                            </li>
                        </ul>
                        <div id="myTabContent" className="tab-content">
                            <div className="tab-pane fade show active" id="information">
                                <RequirementList
                                    requirements={importantSkills}/>
                            </div>
                            <div className="tab-pane fade" id="posted-vacancies">
                                <RequirementList
                                    requirements={skills}/>
                            </div>
                            <div className="tab-pane fade" id="contacts">
                                <div style={{margin: "20px"}}>
                                    Email: {this.state.author.email}
                                </div>
                            </div>
                        </div>


                        <div className="card-footer">
                            <div>
                                Post by: @
                                <Link to={"/users/".concat(this.state.vacancyToDisplay.publisher)}>
                                    {this.state.vacancyToDisplay.publisher}
                                </Link>

                                <div className="float-right">
                                    {this.state.vacancyToDisplay.creationDate}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (store, ownProps) => ({
        vacancies: store.vacancies,
        companies: store.companies,
        ownProps: ownProps,
    }),
    dispatch => ({
        onFetchData: () => {
            dispatch(fetchVacancies());
            dispatch(fetchCompanyStart());
            dispatch(asyncFetchVacancies());
            dispatch(asyncFetchCompanies());
        },
    })
)(VacancyPage);