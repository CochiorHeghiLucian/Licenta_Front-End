import React, { Component } from "react";

import classes from "./Signin.css";
import classNames from "classnames";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import axios from "axios";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: "20px"
  },
  textField: {
    flexBasis: 200
  }
});

class Signin extends Component {
  state = {
    showPassword: false,
    registerShowPassword: false,
    registerComfirmShowPassword: false,
    value: 0,
    userOrEmail: "",
    password: "",
    registrationName: "",
    registrationEmail: "",
    registrationAddres: "",
    registrationPhone: "",
    registrationPassword: "",
    confirmPassword: "",
    authMessageDisplay: "false"
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleClickRegisterShowPassword = () => {
    this.setState(state => ({
      registerShowPassword: !state.registerShowPassword
    }));
  };

  handleClickRegisterConfirmShowPassword = () => {
    this.setState(state => ({
      registerComfirmShowPassword: !state.registerComfirmShowPassword
    }));
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleChangeRegLogBtn = (event, value) => {
    this.setState({ value });
    console.log(value);
  };

  checkRegisterIsFilled = () => {
    return (
      this.state.value === 1 &&
      (this.state.registrationName === "" ||
        this.state.registrationEmail === "" ||
        this.state.registrationAddres === "" ||
        this.state.registrationPhone === "" ||
        this.state.registrationPassword === "" ||
        this.state.confirmPassword === "")
    );
  };

  checkLoginIsFilled = () => {
    return (
      this.state.value === 0 &&
      (this.state.userOrEmail === "" || this.state.password === "")
    );
  };

  loginRegisterBtnSubmit = () => {
    if (this.state.value === 0) {
      const payload = {
        usernameOrEmail: this.state.userOrEmail,
        password: this.state.password
      };
      axios
        .post("http://localhost:8081/api/auth/signin", payload)
        .then(res => {
          console.log(res.status);
        })
        .catch(error => {
          if (error.response.status === 401) {
            alert("Username or password is incorect");
          }
        });

      console.log(payload);
    } else {
      const payload = {
        username: this.state.registrationName,
        email: this.state.registrationEmail,
        address: this.state.registrationAddres,
        phoneNumber: this.state.registrationPhone,
        password: this.state.registrationPassword,
        confirmPassword: this.state.confirmPassword
      };
      console.log(payload);
      axios
        .post("http://localhost:8081/api/auth/signup", payload)
        .then(res => {
          console.log(res.status);
          alert("Account created");
          this.setState({ value: 0 });
        })
        .catch(error => {
          if (error.response.status === 400) {
            alert("Username or email already exists");
          }
        });
    }
  };

  login = () => [
    <TextField
      id="sign_name_id"
      className={classNames(styles.margin, styles.textField, classes.input)}
      label="Name or Email*"
      margin="normal"
      value={this.state.userOrEmail}
      onChange={this.handleChange("userOrEmail")}
      key="L1"
    />,
    <TextField
      id="sign_password_id"
      className={classNames(styles.margin, styles.textField)}
      type={this.state.showPassword ? "text" : "password"}
      label="Password"
      margin="normal"
      value={this.state.password}
      onChange={this.handleChange("password")}
      key="L2"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={this.handleClickShowPassword}
            >
              {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  ];

  register = () => [
    <TextField
      id="register_name_id"
      className={classNames(styles.margin, styles.textField)}
      label="Name*"
      margin="normal"
      value={this.state.registrationName}
      onChange={this.handleChange("registrationName")}
      key="R1"
    />,
    <TextField
      id="register_email_id"
      className={classNames(styles.margin, styles.textField)}
      label="Email*"
      margin="normal"
      value={this.state.registrationEmail}
      onChange={this.handleChange("registrationEmail")}
      key="R2"
    />,
    <TextField
      id="register_addres_id"
      className={classNames(styles.margin, styles.textField)}
      label="Addres*"
      margin="normal"
      value={this.state.registrationAddres}
      onChange={this.handleChange("registrationAddres")}
      key="R3"
    />,
    <TextField
      id="register_phone_number_id"
      className={classNames(styles.margin, styles.textField)}
      label="Phone number*"
      margin="normal"
      value={this.state.registrationPhone}
      onChange={this.handleChange("registrationPhone")}
      key="R4"
    />,

    <TextField
      id="register_password_id"
      className={classNames(styles.margin, styles.textField)}
      type={this.state.registerShowPassword ? "text" : "password"}
      label="Password"
      margin="normal"
      value={this.state.registrationPassword}
      onChange={this.handleChange("registrationPassword")}
      key="R5"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={this.handleClickRegisterShowPassword}
            >
              {this.state.registerShowPassword ? (
                <VisibilityOff />
              ) : (
                <Visibility />
              )}
            </IconButton>
          </InputAdornment>
        )
      }}
    />,
    <TextField
      id="register_confirm_password_id"
      className={classNames(styles.margin, styles.textField)}
      type={this.state.registerComfirmShowPassword ? "text" : "password"}
      label="Confirm Password"
      margin="normal"
      value={this.state.confirmPassword}
      onChange={this.handleChange("confirmPassword")}
      key="R6"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={this.handleClickRegisterConfirmShowPassword}
            >
              {this.state.registerComfirmShowPassword ? (
                <VisibilityOff />
              ) : (
                <Visibility />
              )}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  ];

  render() {
    return (
      <div className={classes.container}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChangeRegLogBtn}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
        </AppBar>

        {this.state.value === 0 ? this.login() : this.register()}

        <Button
          id={this.state.value === 0 ? "sign-btn_id" : "register_btn_id"}
          variant="contained"
          className={classNames(classes.login_btn)}
          disabled={this.checkLoginIsFilled() || this.checkRegisterIsFilled()}
          onClick={this.loginRegisterBtnSubmit}
        >
          {this.state.value === 0 ? "Login" : "Register"}
        </Button>

        {this.state.authMessageDisplay === true ? (
          <span>Wrong username or password!</span>
        ) : null}
      </div>
    );
  }
}

export default Signin;
