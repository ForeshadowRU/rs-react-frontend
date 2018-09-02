import React, {Component} from "react";
import {connect} from "react-redux";
import NavPanel from "../NavPanel";
import {fetchCompanyStart} from "../../actionCreators";
import {asyncFetchCompany, getLoadingAnimation} from "../../functions";
import cube from '../../resources/svg/cube-loading.gif'
import {Link} from "react-router-dom";

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
        let element = nextProps.companies.values.filter((company) => company.id === nextProps.own.match.params.id)[0];
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
                <h5>{this.state.company.email}</h5>
                <div className="border-dark">
                    Founded At:<h6>{this.state.company.foundationDate}</h6>
                </div>
                <div>
                    <h6>Founder: <Link to={"/users/".concat(this.state.company.owner)}>{this.state.company.owner}</Link>
                    </h6>
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