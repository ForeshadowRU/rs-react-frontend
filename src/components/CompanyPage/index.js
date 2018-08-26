import React, {Component} from "react";
import {connect} from "react-redux";
import NavPanel from "../NavPanel";
import {fetchCompanyStart} from "../../actionCreators";
import {asyncFetchCompany, getLoadingAnimation} from "../../functions";
import cube from '../../resources/svg/cube-loading.gif'

class CompanyPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isFetching: true
        }
    }

    componentDidMount() {
        if ((!this.props.companies || parseInt((this.props.companies.timestamp - new Date()), 10) > 120)
            && !this.props.isFetching) {
            let id = this.props.own.match.params.id;
            this.props.onFetchData(id)
        }
        else this.setState({
            company: this.props.companies.values.filter((company) => company.id === this.props.own.match.params.id)[0],
            isFetching: false,
        })

    }

    componentWillReceiveProps(nextProps) {
        let element = nextProps.companies.filter((company) => company.id === nextProps.own.match.params.id)[0];
        this.setState({...this.state, company: element, isFetching: nextProps.isFetching});
    }

    render() {
        if (this.state.isFetching) return (
            <div>
                <NavPanel/>
                <div className="row card-info-border-users">
                    <div className="col">{getLoadingAnimation(cube, "Loading...")}</div>
                </div>
            </div>
        );
        console.log(this.props);
        console.log(this.state);
        return <div>
            <NavPanel/>
            <div className="container" style={{borderColor: "blue", borderWidth: "3px"}}>
                <div className="border-dark">
                    <h2>{this.state.company.name}</h2>
                </div>
                <div className="border-dark">
                    <h6>{this.state.company.description}</h6>
                </div>
                <div className="border-dark">
                    Registered At:<h6>{this.state.company.registrationDate}</h6>
                </div>
            </div>
        </div>
    }
}

export default connect(
    (store, ownProps) => ({
        companies: store.companies,
        isFetching: store.companies.isFetching,
        own: ownProps,
    }),
    dispatch => ({
        onFetchData: (id) => {
            dispatch(fetchCompanyStart());
            dispatch(asyncFetchCompany(id));
        }


    })
)(CompanyPage);