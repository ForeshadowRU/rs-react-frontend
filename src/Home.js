import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import NavPanel from "./components/NavPanel";
import VacancyCardList from "./components/VacancyCardList";
import {connect} from "react-redux";

class Home extends Component {

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

                <VacancyCardList vacancies={this.props.vacancies}/>


            </div>
        );
    }
}

export default connect(
    state => ({
        vacancies: state.vacancies,
    }),
    dispatch => ({})
)(Home);

