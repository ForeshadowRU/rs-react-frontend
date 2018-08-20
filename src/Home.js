import React, {Component} from 'react';
import logo from './resources/svg/logo.svg';
import './App.css';
import NavPanel from "./components/NavPanel";
import VacancyCardList from "./components/VacancyCardList";
import {connect} from "react-redux";
import {asyncFetchVacancies, getLoadingAnimation} from "./functions";
import {fetchVacancies, INVALIDATE_VACANCIES} from "./actionCreators";
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
        if (nextProps.invalidated) {
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

    shouldComponentUpdate(nextProps) {
        return parseInt(this.state.timestamp - new Date(), 10) / 1000 > 120 || nextProps.invalidated;

    }

    componentDidMount() {

        if (this.props.vacancies.length === 0)
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
        }
    },
    dispatch => ({
        onFetchVacancies: () => {
            dispatch(fetchVacancies());
            dispatch(asyncFetchVacancies());
        },
        invalidateVacancies: () => {
            dispatch({type: INVALIDATE_VACANCIES})
        }
    })
)(Home);

