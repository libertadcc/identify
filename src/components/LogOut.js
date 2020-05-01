import React from 'react';
import { withFirebaseHOC } from './Firebase'

class LogOut extends React.Component {
    constructor(){
        super();

        this.handleLogOut = this.handleLogOut.bind(this);
    }

    async handleLogOut() {
        const response = this.props.firebase.signOut();
        if (response) {
          console.log("Out");
        }
    }

    render() {
        return (
          <React.Fragment>
            <div>
                <hr></hr>
                <button onClick={this.handleLogOut}>Log Out</button>
                <hr></hr>
            </div>
          </React.Fragment>
        )
      }
}
export default withFirebaseHOC(LogOut)