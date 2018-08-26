import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import {fetchUsersStarted, logout} from "../../actionCreators";
import NavPanel from "../NavPanel";
import {asyncFetchUsers, getLoadingAnimation} from "../../functions";
import cube from '../../resources/svg/cube-loading.gif'

class VacancyCreationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {
        if (!this.state.userToDisplay && !this.props.isFetching)
            this.props.onFetchUsers();
    }


    getForm() {


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
                    <h4>{this.props.currentUser.firstName} <span
                        className="username">@{this.props.currentUser.username}</span>
                        {this.props.currentUser.secondName}
                    </h4>

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
        },
        dispatch: dispatch
    }))(VacancyCreationPage);
