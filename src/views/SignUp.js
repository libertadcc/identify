import React from 'react';
import './login.scss';


import { withFirebaseHOC } from '../components/Firebase'

class SignUp extends React.Component {

  constructor(){
    super();
    this.state = {
      name: '',
      user: '',
      password: '',
    }
    this.changeName = this.changeName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  changeName(event){
    this.setState({name: event.currentTarget.value});
  }

  changeEmail(event){
    this.setState({user: event.currentTarget.value});
  }

  changePassword(event){
    this.setState({password: event.currentTarget.value});
  }

  async signUp() {
    const name = this.state.name;
    const email = this.state.user;
    const password = this.state.password;

    console.log(this.props.firebase);

    try {
      const response = await this.props.firebase.signupWithEmail(
        email,
        password
      )

      if (response.user.uid) {
        const { uid } = response.user
        const userData = { email, name, uid }
        await this.props.firebase.createNewUser(userData)
        console.log("new user!!")
      }
    } catch (error) {
      console.error(error.message)
    } finally {
      //console.log("try done")
    }

  }

  render() {
    return (
      <React.Fragment>
        <div className="container-login">
          <h1 className="login-title">Nuevo usuario</h1>
          <div className="login-form">

            <label name="name">Nombre</label>
            <input type="text" placeholder="Nombre completo" onChange={this.changeName}/>

            <label name="email">Email</label>
            <input type="email" placeholder="Introduzca el email" onChange={this.changeEmail}/>

            <label name="password">Contraseña</label>
            <input type="password" placeholder="Introduzca una contraseña" onChange={this.changePassword}/>
          </div>
          <button className="button-signin" onClick={this.signUp}>Registrarse</button>
        </div>
      </React.Fragment>
    )
  }
}

export default withFirebaseHOC(SignUp)