import React, {Component} from 'react';
import logo from './resources/svg/logo.svg';
import './App.css';
import NavPanel from "./components/NavPanel";
import VacancyCardList from "./components/VacancyCardList";
import {connect} from "react-redux";
import {asyncFetchVacancies, getLoadingAnimation} from "./functions";
import {fetchUsersStarted, fetchUsersSuccess, fetchVacancies} from "./actionCreators";
import {INVALIDATE_VACANCIES} from "./constants";
import cubeLoading from './resources/svg/cube-loading.gif'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vacancies: (props.vacancies) ? props.vacancies : [],
            isFetching: props.isFetching,
            timestamp: props.timestamp,
        }
    }


    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.invalidated && !nextProps.isFetching) {
            this.props.onFetchVacancies();
            this.setState({...this.state, isFetching: true});
        }
        else
            this.setState({
                    vacancies: (nextProps.vacancies) ? nextProps.vacancies : this.state.vacancies,
                    isFetching: nextProps.isFetching,
                    timestamp: nextProps.timestamp,
                    invalidated: nextProps.invalidated,
                }
            )

    }

    componentDidMount() {

        if (this.props.vacancies.length === 0)
            this.props.onFetchVacancies();

    }

    render() {
        console.log(this.props.isFetching);
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

                    {(this.props.isFetching) ?
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
            timestamp: store.vacancies.timestamp,
            invalidated: store.vacancies.invalidated,
            users: store.users.values,
        }
    },
    dispatch => ({
        onFetchVacancies: () => {
            dispatch(fetchVacancies());
            dispatch(asyncFetchVacancies());
        },
        invalidateVacancies: () => {
            dispatch({type: INVALIDATE_VACANCIES})
        },
        onFetchUsers: () => {
            dispatch(fetchUsersStarted());
            dispatch(fetchUsersSuccess())
        }
    })
)(Home);

