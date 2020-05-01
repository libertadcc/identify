import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebaseHOC } from '../components/Firebase';
import './login.scss';

class LogIn extends React.Component {
  constructor(){
    super();
    this.state = {
      emailLogin: '',
      passwordLogin: '',
      error: '',
    }
    this.changeEmailLogin = this.changeEmailLogin.bind(this);
    this.changePasswordLogin = this.changePasswordLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  changeEmailLogin(event){
    this.setState({emailLogin: event.currentTarget.value});
  }

  changePasswordLogin(event){
    this.setState({passwordLogin: event.currentTarget.value});
  }

  async handleLogin() {
    const email = this.state.emailLogin;
    const password = this.state.passwordLogin;

    try {
      const response = await this.props.firebase.loginWithEmail(
        email,
        password
      )
      console.log('r', response)
      if (response.user) {
        this.setState({error: ''})
        console.log("Usuario logado!!", response.user.uid);
        sessionStorage.setItem('userToken', response.user.uid)
        // Dónde está el token para guardarlo en el session storage, todo esto es MUY SECUNDARIO  
        return this.props.history.push('/')
      }
    } catch (error) {
      this.setState({error: error.message});
      console.error(error.message);
      console.log("Error: " + error.message);
    }
  }

  render() {
    return (
      <div className="container-login">
        <h1 className="login-title">Iniciar sesión</h1>
        <div className="login-form">
          <label name="emailLogin">Email</label>
          <input type="text" placeholder="Introduce el email" onChange={this.changeEmailLogin}/>
          <label name="passwordLogin">Contraseña</label>
          <input type="password" placeholder="Introduce la contraseña" onChange={this.changePasswordLogin}/>
        </div>
        <p className={`error-message ${this.state.error === '' ? 'hidden' : 'shown'}`}>Credenciales incorrectas</p>
        <button className="button-signin" onClick={this.handleLogin}>Iniciar sesión</button>
        <Link to="/signup">
          <p className="link-signup">Registrarse</p>
        </Link>
      </div>
    )
  }
}

export default withFirebaseHOC(LogIn)