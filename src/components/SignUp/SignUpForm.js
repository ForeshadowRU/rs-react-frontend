import React, {Component} from 'react'


class SignUpForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userType: 0
        };
        this.changeState = this.changeState.bind(this);
    }

    //1 - user
    //2 - employer


    static getFormOf(userType) {

        if (userType === 0) return <div/>;
        if (userType === 1) // if user
            return (
                <div>
                    <div className="form-group">
                        <label htmlFor="firstname">Firstname:</label>
                        <input type="text" className="form-control" id="firstname"
                               aria-describedby="firstnameHelp" placeholder="Firstname"/>
                    </div>
                    <div className="form-group">

                        <label htmlFor="lastname">Lastname:</label>
                        <input type="text" className="form-control" id="lastname"
                               aria-describedby="lastnameHelp" placeholder="Lastname"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                            anyone else.
                        </small>
                    </div>
                    <div className="form-group">

                        <label htmlFor="password">Password:</label>
                        <input type="text" className="form-control" id="password"
                               placeholder="Password"/>
                    </div>
                    <div className="form-group">

                        <label htmlFor="rpassword">Repeat password:</label>
                        <input type="text" className="form-control" id="rpassword"
                               placeholder="Repeat Password"/>
                    </div>

                </div>
            );
        if (userType === -1) // if employer
            return (
                <div>
                    <div className="form-group">
                        <label htmlFor="firstname">Company Name:</label>
                        <input type="text" className="form-control" id="firstname"
                               aria-describedby="firstnameHelp" placeholder="Firstname"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Company email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                            anyone else.
                        </small>
                    </div>
                </div>
            );
    }

    changeState() {
        if (document.getElementById("customRadio1").checked)
            this.setState({
                userType: 1
            });
        else this.setState({
            userType: -1
        });
    }

    render() {
        return <form method="POST" style={{margin: "15px"}}>
            <fieldset>
                <div className="form-group">
                    <div className="custom-control custom-radio">
                        <input type="radio" id="customRadio1" name="customRadio" className="custom-control-input"
                               onChange={this.changeState}/>
                        <label className="custom-control-label" htmlFor="customRadio1">I am recruit</label>
                    </div>
                    <div className="custom-control custom-radio">
                        <input type="radio" id="customRadio2" name="customRadio" className="custom-control-input"
                               onChange={this.changeState}/>
                        <label className="custom-control-label" htmlFor="customRadio2">I am employer</label>
                    </div>
                    {SignUpForm.getFormOf(this.state.userType)}

                </div>
            </fieldset>
        </form>
    }
}

export default SignUpForm;