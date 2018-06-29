import React, {Component} from 'react'

class RequirementList extends Component {

    constructor(props) {
        super(props);
        this.value = this.props.requirements.slice();
        this.progressbarColor = "progress-bar progress-bar-striped "
    }

    render() {


        let result = this.value.map(requirement =>
            <div style={{"margin": "10px"}}>
                <h4>{requirement.name}</h4>
                <div className="progress">
                    <div
                        className={this.progressbarColor + (requirement.primary ? "bg-warning" : "bg-info")}
                        role="progressbar"
                        style={{"width": requirement.level * 10 + "%"}}
                        aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"/>
                </div>
            </div>
        )


        return (
            result
        )
    }

}

export default RequirementList;