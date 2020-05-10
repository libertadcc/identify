import React from 'react';
import './login.scss';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

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
      showPassword: false,
    }
    this.changeName = this.changeName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.signUp = this.signUp.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
  }

  handleClickShowPassword (){
    console.log('this.state handleClickShowPassword', this.state.showPassword);
    this.setState({showPassword: !this.state.showPassword})
  };

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
        const { uid } = response.user;
        const userData = { email, name, uid };
        await this.props.firebase.createNewUser(userData);
        console.log("new user!!");
        this.props.history.push('/login');
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
            {/* <label name="name">Nombre</label>
            <input type="text" placeholder="Nombre completo" onChange={this.changeName}/> */}

            <TextField
              variant="outlined"
              required
              fullWidth
              id="nombre"
              label="Nombre"
              name="name"
              autoFocus
              placeholder="Nombre completo *"
              value={this.state.emailLogin}
              onChange={this.changeName}
              className="input-login"
              type="text"
            />

            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              placeholder="Introduzca el email"
              value={this.state.emailLogin}
              onChange={this.changeEmail}
              className="input-login"
              type="email"
            />

            <FormControl variant="outlined" className="input-login">
              <InputLabel htmlFor="outlined-adornment-password">Contraseña *</InputLabel>
              <OutlinedInput
                //className="input-login"
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña *"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                onChange={this.changePassword}
                id="password"
                autoComplete="current-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      >
                      {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
          </FormControl>
            {/* <label name="email">Email</label>
            <input type="email" placeholder="Introduzca el email" onChange={this.changeEmail}/> */}
            
            {/* <label name="password">Contraseña</label>
            <input type="password" placeholder="Introduzca una contraseña" onChange={this.changePassword}/> */}
          </div>
          <button className="button-signin btn-signup" onClick={this.signUp}>Registrarse</button>
        </div>
        {this.state.errorPassword === true? <p className="error-message">La constraseña debe tener, al menos, 6 caracteres.</p> : null }
        {this.state.errorEmailUsed ? <p className="error-message">Ese email no está disponible.</p> : null }
        {this.state.errorEmailFormat ? <p className="error-message">El email es incorrecto.</p> : null }
      </React.Fragment>
    )
  }
}

export default withFirebaseHOC(SignUp)