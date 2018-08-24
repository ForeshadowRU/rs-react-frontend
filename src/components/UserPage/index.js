import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import {fetchUsersStarted, logout} from "../../actionCreators";
import NavPanel from "../NavPanel";
import {asyncFetchUsers, getLoadingAnimation} from "../../functions";
import cube from '../../resources/svg/cube-loading.gif'
import VacancyCardList from "../VacancyCardList";

class UserPage extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.users);
        let user = this.props.users.values.filter(value => value.username === this.props.ownProps.match.params.username)[0];
        let vacancies = user && this.props.vacancies.values.filter(vacancy => vacancy.publisher === user.username);
        if (this.props.users && this.props.users.values)
            this.state = {
                userToDisplay: user,
                userVacancies: vacancies
            };
        else this.state = {
            userToDisplay: null
        }
    }


    componentWillReceiveProps(nextProps) {
        let user = nextProps.users.values.filter(value => value.username === nextProps.ownProps.match.params.username)[0];
        let vacancies = nextProps.vacancies.values.filter(vacancy => vacancy.publisher === user.username);
        this.setState = {
            userToDisplay: user,
            userVacancies: vacancies,
        };
        if (nextProps.users.invalidated && !nextProps.users.isFetching)
            nextProps.onFetchUsers();
    }

    componentDidMount() {
        if (!this.state.userToDisplay && !this.props.isFetching)
            this.props.onFetchUsers();
    }


    getActionTab() {
        return (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" role="button"
                   aria-haspopup="true" aria-expanded="false">Actions</a>
                <div className="dropdown-menu"
                     style={{
                         position: "absolute",
                         transform: "translate3d(0px, 40px, 0px)",
                         top: "0px",
                         left: "0px",
                         willChange: "transform"
                     }}>
                    <a className="dropdown-item">New Vacancy</a>
                    <a className="dropdown-item">Edit Profile</a>
                    <div className="dropdown-divider"/>
                    <a className="dropdown-item" onClick={this.props.onLogout}>Log Out</a>
                </div>
            </li>
        )
    }

    getPage() {
        let isAdmin = this.state.userToDisplay.authorities.filter(authority => authority.authority === 'ROLE_ADMIN').length !== 0;
        let isOwnerPage = this.props.currentUser && this.state.userToDisplay.username === this.props.currentUser.username;
        console.log("TRYING TO DISPLAY:", this.state.userVacancies, "OF USER", this.state.userToDisplay);


        let info = [];
        let user = {...this.state.userToDisplay, authorities: this.state.userToDisplay.authorities[0].authority};
        console.log("USER:", user);
        for (const key in user) {
            if (user.hasOwnProperty(key))
                info.push(key)
        }
        return (

            <div className="card card-info-border-users" style={{margin: "25px"}}>
                <div
                    className={"card ".concat((isAdmin ? "card-info-border-admins" : "card-info-border-users"))}
                    style={{margin: "25px"}}>
                    <h4>{this.state.userToDisplay.firstName} <span
                        className="username">@{this.state.userToDisplay.username}</span> {this.state.userToDisplay.secondName}
                    </h4>
                    {isAdmin ? <div>ADMIN</div> : ""}

                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#information">Information</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#posted-vacancies">Posted Vacancies</a>
                        </li>
                        {isOwnerPage ? this.getActionTab() : ""}
                    </ul>
                    <div id="myTabContent" className="tab-content">
                        <div className="tab-pane fade show active" id="information">
                            {info.map(key => <div><strong>{key}:</strong><h5>{user[key] && user[key].toString()}</h5>
                            </div>)}
                        </div>
                        <div className="tab-pane fade" id="posted-vacancies">
                            <div>
                                <VacancyCardList vacancies={this.state.userVacancies}/>
                            </div>
                        </div>
                    </div>
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
        console.log(this.state.userToDisplay);
        if (this.state.userToDisplay) {
            if (this.props.currentUser.username === this.state.userToDisplay.username) {
                return (
                    <div>
                        <NavPanel/>
                        <div>
                            {this.getPage()}
                        </div>
                    </div>)
            } else
                return (
                    <div>
                        <NavPanel/>
                        <div>
                            {this.getPage()}
                        </div>
                    </div>)
        }
        else {
            return (
                <div>
                    <NavPanel/>
                    <div>
                        SORRY 404 USER NOT FOUND
                    </div>
                </div>)

        }

    }
}

export default connect(
    (store, ownProps) => ({
        currentUser: store.currentUser,
        users: store.users,
        vacancies: store.vacancies,
        ownProps: ownProps,
    }),
    dispatch => ({
        onFetchUsers: () => {
            dispatch(fetchUsersStarted());
            dispatch(asyncFetchUsers());
        },
        onLogout: () => {
            dispatch(logout())
        }
    }))(UserPage);
