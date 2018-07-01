import React, {Component} from 'react'
import NavPanel from "./NavPanel";

class SingUp extends Component {

    render() {
        return (


            <div>
                <NavPanel/>
                <form>
                    <label htmlFor="username">Username:</label>
                    <input id="username" type="text"/>
                </form>
            </div>
        )
    }
}

export default SingUp;