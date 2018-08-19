import React, {Component} from 'react'

class LoginForm extends Component {

    render() {
        return (
            <form method="POST" style={{margin: "15px"}}>
                <fieldset>
                    <legend>Login</legend>

                    <div className="form-group">

                        <label htmlFor="exampleInputEmail1">Email or Login</label>
                        <input type="email" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp" placeholder="Email/Login"/>
                    </div>
                    <div className="form-group">

                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" id="password"
                               aria-describedby="passwordHelp" placeholder="Password"/>
                    </div>

                    <button className="btn btn-info">Login</button>
                </fieldset>
            </form>
        )
    }
}

export default LoginForm;