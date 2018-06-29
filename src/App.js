import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import NavPanel from "./components/NavPanel";
import fixtures from "./components/fixtures";
import VacancyList from "./components/VacancyList";

class App extends Component {

    render() {
        const fixture = fixtures.slice();

        return (
            <div>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <NavPanel/>
                </div>

                <VacancyList vacancies={fixture}/>


            </div>
        );
    }
}

export default App;
