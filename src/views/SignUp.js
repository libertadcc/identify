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
      errorEmailUsed: false,
      errorEmailFormat: false,
      errorPassword: false,
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
    this.setState({errorEmailFormat: false});
    this.setState({errorEmailUsed: false});
    this.setState({user: event.currentTarget.value});
  }

  changePassword(event){
    this.setState({errorPassword: false});
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
        this.props.history.push('/login')

      }
    } catch (error) {
      console.log(error)
      console.error(error.message);
      if(error.message === 'The email address is badly formatted.') {
        return this.setState({errorEmailFormat: true});
      }
      if(error.message === 'The email address is already in use by another account.') {
        return this.setState({errorEmailUsed: true});
      }
      if(error.message === 'The password must be 6 characters long or more.') {
        return this.setState({errorPassword: true});
      }
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
        {this.state.errorPassword === true? <p className="error-message">La constraseña debe tener, al menos, 6 caracteres.</p> : null }
          {this.state.errorEmailUsed ? <p className="error-message">Ese email no está disponible.</p> : null }
            {this.state.errorEmailFormat ? <p className="error-message">El email es incorrecto.</p> : null }
      </React.Fragment>
    )
  }
}

export default withFirebaseHOC(SignUp)