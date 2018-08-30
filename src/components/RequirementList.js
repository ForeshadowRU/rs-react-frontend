import React, {Component} from 'react'

class RequirementList extends Component {

    constructor(props) {
        super(props);
        this.value = this.props.requirements.slice();
        this.progressbarColor = "progress-bar progress-bar-striped "
        this.limit = this.props.limit || -1;
    }

    render() {
        this.value.sort((a, b) => {
            if (a.important === b.important) {
                if (a.level === b.level) return 0;
                if (a.level > b.level) return -1;
                return 1;
            }
            if (a.important && !b.important)
                return -1;
            return 1;
        });
        if (this.limit !== -1) this.value = this.value.slice(0, this.limit);
        let result = this.value.map(requirement =>
            <div style={{"margin": "10px"}}>
                <h4>{requirement.name}</h4>
                <div className="progress">
                    <div
                        className={this.progressbarColor + (requirement.important ? "bg-warning" : "bg-info")}
                        role="progressbar"
                        style={{"width": requirement.level * 10 + "%"}}
                        aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">{requirement.level}/10
                    </div>
                </div>
            </div>
        );


        return (
            result
        )
    }

}

export default RequirementList;