import React, {Component} from 'react';
import logo from './resources/svg/logo.svg';
import './App.css';
import NavPanel from "./components/NavPanel";
import VacancyCardList from "./components/VacancyCardList";
import {connect} from "react-redux";
import {asyncFetchVacancies} from "./functions";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vacancies: (props.vacancies) ? props.vacancies : [],
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
                vacancies: (nextProps.vacancies) ? nextProps.vacancies : this.state.vacancies,
            }
        )

    }

    shouldComponentUpdate() {
        return true;
    }

    componentDidMount() {

        this.props.onFetchVacancies();
    }

    render() {
        return (

            <div>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <NavPanel/>
                </div>
                <VacancyCardList vacancies={this.state.vacancies}/>
            </div>
        );
    }
}

export default connect(
    store => {
        console.log("STORE:", store);
        return {
            vacancies: store.vacancies.slice(),
        }
    },
    dispatch => ({
        onFetchVacancies: () => {
            dispatch(asyncFetchVacancies());
        }
    })
)(Home);

