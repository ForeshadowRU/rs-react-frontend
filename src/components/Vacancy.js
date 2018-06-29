import React, {Component} from 'react'
import "bootswatch/dist/flatly/bootstrap.css"

class Vacancy extends Component {


    render() {
        const vacancy = this.props;
        console.log("value:", vacancy);
        return (
            <div className="card mx-auto" style={{width: '35%'}}>
                <div className="card-header">
                    <h3>{vacancy.name}</h3>
                    <h6 className="text-muted"><u>{vacancy.author}</u></h6>
                </div>


                <div className="card-body">
                    {vacancy.description}
                </div>

                <div>

                </div>


            </div>
        )
    }
}

export default Vacancy;