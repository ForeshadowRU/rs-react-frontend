import React from 'react'

class RequirementList extends Component {


    render() {
        const requirements = this.props.requirements.slice();
        let result = this.requirements.map(requirement =>
            <li>
                <h4>{requirement.name}</h4>
                <div className="progress">
                    <div
                        className={"progress-bar progress-bar-striped " + requirement.primary ? "bg-warning" : "bg-info"}
                        role="progressbar"
                        style={"width:" + requirement.level * 10 + "%"}
                        aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"/>
                </div>
            </li>
        )

        return (
            result
        )
    }

}

export default RequirementList;