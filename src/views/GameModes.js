import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import './modes.scss';

 import firebase from 'firebase'
const auth = firebase.auth();

export default class GameModes extends React.Component {

  constructor(){
    super();
    this.state = {
      user: '',
      password: '',
    }
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.signIn = this.signIn.bind(this);
  }
  
  changeEmail(event){
    this.setState({user: event.currentTarget.value});
  }

  changePassword(event){
    this.setState({password: event.currentTarget.value});
  }

  signIn() {
    const email = this.state.user;
    const password = this.state.pasword;

    auth.signInWithEmailAndPassword(email, password)
    .then(response => {console.log(response)})
    .catch(function(error) {
      console.log(error)
    });
  }

  componentWillMount() {

  }

  render (){ 
  return (
    <React.Fragment>
      <div>
        <label name="email">Email</label>
        <input type="email" onChange={this.changeEmail}/>

        <label name="password">Password</label>
        <input type="password" onChange={this.changePassword}/>

        <button onClick={this.signIn}>Sign in</button>
      </div>
      <Header />
      <div className="container-ppal-mode">
        <div className="container-buttons-mode">
          <Link to="/home">
            <button className="mode-buttons">
              <div className="mode-content">
                <h2 className="mode-title">EJERCICIOS</h2>
              </div>
            </button>
          </Link>

          <Link to="/custom">
            <button className="mode-buttons">
              <div className="mode-content">
                <h2 className="mode-title">EXAMEN</h2>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
}