import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import NavPanel from "./components/NavPanel";
import Vacancy from "./components/Vacancy";
import fixtures from "./components/fixtures";

class App extends Component {

    render() {
        const fixture = fixtures.slice();
        console.log("value:", fixture[0].description);
        return (
            <div>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <NavPanel/>
                </div>

                <Vacancy name={fixture[0].name} description={fixture[0].description} author={fixture[0].author}/>
            </div>
        );
    }
}

export default App;
