import React, {Component} from 'react';
import logo from './resources/svg/logo.svg';
import './App.css';
import NavPanel from "./components/NavPanel";
import VacancyCardList from "./components/VacancyCardList";
import {connect} from "react-redux";
import {asyncFetchVacancies, getLoadingAnimation} from "./functions";
import {fetchVacancies} from "./actionCreators";
import cubeLoading from './resources/svg/cube-loading.gif'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vacancies: (props.vacancies) ? props.vacancies : [],
            isFetching: props.isFetching,
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
                vacancies: (nextProps.vacancies) ? nextProps.vacancies : this.state.vacancies,
            isFetching: nextProps.isFetching,
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
        console.log(this.state.isFetching);
        return (

            <div>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <NavPanel/>
                </div>
                <div>
                    {(this.state.isFetching) ?
                        getLoadingAnimation(cubeLoading, "Fetching Data")
                        :
                        <VacancyCardList vacancies={this.state.vacancies}/>}
                </div>
            </div>
        );
    }
}

export default connect(
    store => {
        return {
            vacancies: store.vacancies.values.slice(),
            isFetching: store.vacancies.isFetching,
        }
    },
    dispatch => ({
        onFetchVacancies: () => {
            dispatch(fetchVacancies());
            dispatch(asyncFetchVacancies());
        }
    })
)(Home);

