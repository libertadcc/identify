import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebaseHOC } from '../components/Firebase';
import './login.scss';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


class LogIn extends React.Component {
  constructor(){
    super();
    this.state = {
      emailLogin: '',
      passwordLogin: '',
      error: '',
      showPassword: false,
      saveUser: false,
    }
    this.changeEmailLogin = this.changeEmailLogin.bind(this);
    this.changePasswordLogin = this.changePasswordLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.rememberUser = this.rememberUser.bind(this);
    // this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
  }

  rememberUser() { 
    this.setState({saveUser: !this.state.saveUser});
  }

  handleClickShowPassword (){
    console.log('this.state handleClickShowPassword', this.state.showPassword);
    this.setState({showPassword: !this.state.showPassword})
  };

  handleMouseDownPassword(event) {
    event.preventDefault();
  };

  changeEmailLogin(event){
    console.log('this.state', this.state)
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
      );
      console.log('r', response);
      if (response.user) {
        if (this.state.saveUser) { localStorage.setItem('email', email) }
        if (this.state.saveUser) { localStorage.setItem('password', password) }
        this.setState({error: ''})
        console.log("Usuario logado!!", response.user.uid);
        sessionStorage.setItem('userToken', response.user.uid);
        // Dónde está el token para guardarlo en el session storage, todo esto es MUY SECUNDARIO  
        return this.props.history.push('/')
      }
    } catch (error) {
      this.setState({error: error.message});
      console.error(error.message);
      console.log("Error: " + error.message);
    }
  }

  componentDidMount() {
    if(localStorage.getItem('email')) {
      const email = localStorage.getItem('email');
      this.setState({emailLogin: email, saveUser: true});      
    }
    if(localStorage.getItem('password')) {
      const password = localStorage.getItem('password');
      this.setState({passwordLogin: password});
    }
  }

  render() {
    return (
      <React.Fragment>
      <div className="container-login">
        <h1>Iniciar sesión</h1>
        <form noValidate autoComplete="off" className="login-form">
        <FormControl variant="outlined">
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={this.state.emailLogin}
            onChange={this.changeEmailLogin}
            className="input-login"
          />
          </FormControl>
          <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Contraseña *</InputLabel>
          <OutlinedInput
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Contraseña *"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.passwordLogin}
            onChange={this.changePasswordLogin}
            id="password"
            autoComplete="current-password"
            className="password-login"
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
        </form>
        <FormControlLabel
            control={
              <Checkbox 
                value="remember"
                className="btn-remember" 
                onClick={this.rememberUser}
                checked={this.state.saveUser}
            />}
            label="Recordar usuario"
          />
        <p className={`error-message ${this.state.error === '' ? 'hidden' : 'shown'}`}>Credenciales incorrectas</p>
        <Button className="button-signin" onClick={this.handleLogin} size="large">Iniciar sesión</Button>
        <Link to="/signup">
          <p className="link-signup">Registrarse</p>
        </Link>
      </div>
      </React.Fragment>
    )
  }
}

export default withFirebaseHOC(LogIn);