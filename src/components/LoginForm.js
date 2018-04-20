import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Pharmacy from '../screens/Pharmacy';
import Courier from '../screens/Courier';
import Admin from '../screens/Admin';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

//import Users from '../models/Users';
//import Pharmacies from '../models/Pharmacies';
//import Couriers from '../models/Couriers';
//import Orders from '../models/Orders';

class LoginForm extends Component {
    state = {
        usernameError: false,
        passwordError: false,
        loginError: false,
        username: '',
        password: '',
        authenticatedSuccessfully: false,
        path: '',
        users: [],
    };

    componentDidMount() {
        //localStorage.setItem("pharmacies", JSON.stringify(Pharmacies));
        //localStorage.setItem("couriers", JSON.stringify(Couriers));
        //console.log(JSON.parse(localStorage.getItem("Pharmacy_user")), JSON.parse(localStorage.getItem("Pharmacy_authenticated")));
        //localStorage.removeItem("users");
        //localStorage.setItem("users", JSON.stringify(Users));
        //localStorage.removeItem("Pharmacy_user");
        //localStorage.removeItem("Courier_user");
        //localStorage.removeItem("user");
        //localStorage.removeItem("authenticated");
        //localStorage.removeItem("Admin_authenticated");
        //localStorage.removeItem("Admin_authenticated");
        //localStorage.removeItem("Pharmacy_authenticated");
        //localStorage.removeItem("Courier_authenticated");
        //localStorage.setItem("users", JSON.stringify(Users));
        //localStorage.removeItem("orders");
        //localStorage.setItem("orders", JSON.stringify(Orders));
        //if (!localStorage.getItem("users")) {
            this.setState({ users: JSON.parse(localStorage.getItem("users")) })
        //}
            // Users.push(
            //     { id: '6', first_name: 'Bob', last_name: 'Jones', username: 'bobj', password: 'bj12345', type: 'Admin', type_id: '1' }
            // );
            // localStorage.setItem("users", JSON.stringify(Users));
            //localStorage.removeItem("users");
        
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    findUser = (username, password) => {
        const { users } = this.state;

        for (let i=0; i<users.length; i++) {
            if (users[i].username === username) {
                if (users[i].password === password) {
                    return users[i];
                };
            };
        };
    }

    onSubmit = event => {
        const { username, password } = this.state;

        event.preventDefault();
        let loginSuccess = false;
        let pathName = '';
        if ((username !== '') && (password !== '')) {
            const user = this.findUser(username, password);
            if (user) {
                loginSuccess = true;
                pathName = user.type;
                localStorage.setItem(pathName + "_authenticated", "true");
                localStorage.setItem(pathName + "_user", JSON.stringify(user));
            };
        };

        this.setState({
            loginError: loginSuccess ? false : true,
            authenticatedSuccessfully: loginSuccess,
            path: (pathName !== '') ? pathName : 'Login',
            usernameError: (username === '' || (!loginSuccess && password !== '')) ? true : false,
            passwordError: (password === '' || (!loginSuccess && username !== '')) ? true : false,
        });
    };

    render() {
        const { classes } = this.props;
        if (this.state.authenticatedSuccessfully) {
            return (
                <Redirect to={
                    {
                        pathname: "/" + this.state.path,
                    }} />
            )
        }
        return (
            <Router>
                <div className={classes.container}>
                    <Paper className={classes.paperContainer} elevation={4}>
                        <span style={{ fontSize: 20, fontFamily: 'Raleway' }}>
                            <p>Sign in to ScriptDrop App</p>
                        </span>
                        <span style={{ color: 'red' }}>
                            {
                                this.state.loginError ? 'Login failed.' : ''
                            }
                        </span>
                        <TextField
                            error={this.state.usernameError}
                            id="username"
                            label="Username"
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleChange("username")} />
                        <TextField
                            error={this.state.passwordError}
                            id="password"
                            label="Password"
                            className={classes.textField}
                            margin="normal"
                            type="password"
                            onChange={this.handleChange("password")} />
                        <Button
                            variant="raised"
                            className={classes.button}
                            onClick={this.onSubmit}>
                            Sign in
                        </Button>
                    </Paper>

                    <Route path="/Pharmacy" component={Pharmacy} />
                    <Route path="/Courier" component={Courier} />
                    <Route path="/Admin" component={Admin} />
                </div>
            </Router>
        );
    };
};

const materialStyles = theme => ({
    paperContainer: theme.mixins.gutters({
        paddingTop: 16,
        width: 300,
        height: 375,
        marginTop: theme.spacing.unit * 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#B3E5FC',
    }),
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        fontFamily: 'Lato',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        margin: 50,
    },
  });

  LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(materialStyles)(LoginForm);