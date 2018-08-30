import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import {logout} from "../../actionCreators";
import NavPanel from "../NavPanel";
import {asyncPostVacancy, currencySignToString, getLoadingAnimation} from "../../functions";
import cube from '../../resources/svg/cube-loading.gif'

class NewVacancy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            currency: "",
            salary: 0,
            type: "",
            requirements: [],

        }
    }

    /*
    * id(pin): "049c714e-5d69-4f36-ba59-2e5b6244463e"
    name(pin): "Senior Java Full-Stack Developer"
    description(pin): "short and fascinating
     description part of this vacancy
     </cut>
     Full and detail description of vacancy"
    authorId(pin): "2f842e97-8588-4311-9214-6431b1e0fb3b"
    salary(pin): 23000
    type(pin): "PER_MONTH"
    currency(pin): "RUB"
    hidden(pin): false
    creationDate(pin): "2018-08-10T12:23:08.931"
    publisher(pin): "Admin"

                    return "₽";
            case "EUR":
                return "€";
            case "USD":
                return "$";
    */

    getPage() {

        return (

            <div className="card card-info-border-users" style={{margin: "25px"}}>
                <div>
                    <form>
                        <fieldset>
                            <legend>Post Vacancy</legend>
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text" name="name" className="form-control"
                                       onChange={(event) => this.handleInputChange(event)}
                                       value={this.state.name}
                                />

                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea className="form-control" id="description" rows='7'
                                          name="description"
                                          onChange={(event) => this.handleInputChange(event)}
                                          value={this.state.description}/>
                            </div>
                            <div className="form-group">
                                <label>Salary:</label>
                                <div className="row">

                                    <div className="form-group col-2">
                                        <select className="form-control" id="currency"
                                                name="currency"
                                                onChange={(event) => this.handleInputChange(event)}>
                                            <option>₽</option>
                                            <option>€</option>
                                            <option>$</option>
                                        </select>
                                    </div>
                                    <div className="form-group col">
                                        <input type="text" className="form-control"
                                               onChange={(event) => this.handleInputChange(event)}
                                               value={this.state.salary}
                                               name="salary"/>
                                    </div>
                                    <div className="form-group col-4">
                                        <select className="form-control" name="type"
                                                onChange={(event) => this.handleInputChange(event)}>
                                            <option>PER_MONTH</option>
                                            <option>PER_YEAR</option>
                                            <option>PER_QUARTER</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <button onClick={this.addRequirement.bind(this)} type="button">Add Requirement</button>
                                <div>
                                    {this.state.requirements.map((req, i) => {
                                        return (
                                            <div>
                                                <h5>Requirement:</h5>
                                                <div className="form-group">
                                                    <label>Name:</label>
                                                    <input value={this.state.requirements[i].name} type="text"
                                                           className="form-control" name="name"
                                                           onChange={(event) => {
                                                               this.handleChange(event, i)
                                                           }}/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Level:</label>
                                                    <input value={this.state.requirements[i].level} type="number"
                                                           max="10" min="0" className="form-control"
                                                           name="level"
                                                           onChange={(event) => {
                                                               this.handleChange(event, i)
                                                           }}/>
                                                </div>
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input"
                                                           name="important"
                                                           value={this.state.requirements[i].important}
                                                           onChange={(event) => {
                                                               this.handleChange(event, i)
                                                           }}/>
                                                    <label className="form-check-label">Important?</label>
                                                </div>
                                            </div>

                                        )
                                    })}
                                </div>
                            </div>

                            <button type="button" className="btn btn-primary"
                                    onClick={(event) => this.handleSubmit(event)}>Submit
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }


    render() {
        if (this.props.isFetching) return (
            <div>
                <NavPanel/>
                {getLoadingAnimation(cube, "Fetching...")}
            </div>
        );

        return (
            <div>
                <NavPanel/>
                <div style={{margin: "10px"}}>
                    {this.getPage()}
                </div>
            </div>)

    }


    handleChange(event, index) {
        const name = event.target.name;
        let requirements = this.state.requirements.slice();
        let value = event.target.value;

        if (event.target.type === 'checkbox')
            value = event.target.checked;
        requirements[index][name] = value;
        console.log(event.target.value);
        this.setState({
            ...this.state,
            requirements: requirements
        });

    }

    handleInputChange(event) {
        let value = event.target.value;
        if (event.target.name === 'currency')
            value = currencySignToString(value);
        let state = {...this.state};
        state[event.target.name] = value;
        this.setState(state);
    }

    addRequirement() {
        let req = this.state.requirements.slice();
        req.push({
            name: "",
            level: 0,
            important: false,
        });
        this.setState({
            ...this.state,
            requirements: req,
        })
    }

    handleSubmit(event) {
        let request = {...this.state};
        request.publisher = this.props.currentUser.username;
        request.hidden = false;
        request.author = this.props.companies[0];
        console.log("WillBeDispatchingWith:", JSON.stringify(request));
        this.props.onPostVacancy(JSON.stringify(request), this.props.currentUser.token);
        event.preventDefault();
    }
}

export default connect(
    (store, ownProps) => ({
        currentUser: store.currentUser,
        companies: store.companies,
        vacancies: store.vacancies,
        ownProps: ownProps,
    }),
    dispatch => ({
        onPostVacancy: (json, token) => {
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer '.concat(token),
                }
            };
            dispatch(asyncPostVacancy(json, config))
        },
        onLogout: () => {
            dispatch(logout())
        },
        dispatch: dispatch
    }))(NewVacancy);
