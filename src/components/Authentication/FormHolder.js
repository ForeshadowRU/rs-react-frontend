import React, {Component} from 'react'
import LoginForm from "./LoginForm";

class FormHolder extends Component {

    render() {
        return (
            <div className="row" style={{marginTop: "20px"}}>
                <div className="card card-info-border mx-auto" style={{width: "35%"}}>
                    <LoginForm/>
                </div>
            </div>)
    }
}

export default FormHolder;