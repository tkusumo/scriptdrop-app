import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import logo from '../assets/scriptdrop.png';
import Couriers from '../models/Couriers';
import PackagesTable from '../components/PackagesTable';

class Courier extends Component {
    state = {
        signOutClicked: false,
        user: {},
        courier: {},
        displayDate: new Date(),
    };

    signOut = () => {
        localStorage.setItem("authenticated", "false");
        localStorage.setItem("user", "");
        this.setState({ signOutClicked: true });
    };

    componentDidMount() {
        if (localStorage.getItem("Courier_authenticated") === "false") {
            this.setState({ signOutClicked: true });
        } else {
            const currentUser = JSON.parse(localStorage.getItem("Courier_user"))
            let currentCourier = {};

            for (let i=0; i < Couriers.length; i++) {
                if (currentUser.type_id === Couriers[i].id) {
                    currentCourier = Couriers[i];
                }
            }
            
            this.setState({ user: currentUser, courier: currentCourier })
        }
    }

    setDate = (position) => {
        let newDate = this.state.displayDate;
        let dayOfMonth = newDate.getDate();
        (position === 'left') ? newDate.setDate(dayOfMonth - 1) : newDate.setDate(dayOfMonth + 1);
        return newDate;
    }

    leftArrowClicked = () => {
        this.setState({ displayDate: this.setDate('left') });
    };

    rightArrowClicked = () => {
        this.setState({ displayDate: this.setDate('right') });
    };

    render() {
        const { classes } = this.props;
        const { user, courier } = this.state;

        if (this.state.signOutClicked) {
            return (
                <Redirect
                    to={{ pathname: "/Login" }}
                />
            )
        }

        return (
            <Router>
                <div>
                    <div className={classes.headerContainer}>
                        <img src={logo} alt="scriptdrop" style={{ width: 115, height: 50 }} />
                        <Button className={classes.button} onClick={this.signOut}>Sign out</Button>
                    </div>
                    <div className={classes.headerDetailContainer}>
                        <span style={{ padding: 5, color: '#BF360C', fontSize: 14 }}>{courier.name} {user.type}</span>
                        <span style={{ padding: 5 }}>||</span>
                        <span style={{ padding: 5 }}>{user.first_name} {user.last_name}</span>
                    </div>
                    <div>
                        <div className={classes.dateContainer}>
                            <IconButton
                                color="primary"
                                aria-label="left-arrow"
                                onClick={this.leftArrowClicked}
                                className={classes.leftArrowButton}>
                                <Icon style={{ fontSize: 40 }}>keyboard_arrow_left</Icon>
                            </IconButton>
                            <Paper className={classes.paperContainer} elevation={2}>
                                <span style={{ color: '#BF360C', fontWeight: 'bold', fontSize: 20 }}>
                                    {(this.state.displayDate).toString().slice(4,7)} {(this.state.displayDate).getDate().toString()}
                                </span>
                                <span style={{ fontWeight: 'bold', fontSize: 16, padding: 5 }}>{(this.state.displayDate).toString().slice(0,3)}</span>
                            </Paper>
                            <IconButton
                                color="primary" 
                                aria-label="right-arrow"
                                onClick={this.rightArrowClicked}
                                className={classes.rightArrowButton}>
                                <Icon style={{ fontSize: 40 }}>keyboard_arrow_right</Icon>
                            </IconButton>
                        </div>
                        <PackagesTable packagesDate={this.state.displayDate} />
                    </div>

                    <Route path="/Login" component={Login} />
                </div>
            </Router>
        )
    }
}

const materialStyles = theme => ({
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ECEFF1',
    },
    headerDetailContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#B0BEC5',
        paddingLeft: 10,
        height: 35,
        fontSize: 12,
        fontFamily: 'Roboto',
    },
    button: {
        margin: 10,
        fontSize: 12,
    },
    leftArrowButton: {
        marginTop: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
    },
    rightArrowButton: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 3,
    },
    dateContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paperContainer: {
        width: 85,
        height: 75,
        marginTop: theme.spacing.unit * 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: "#ECEFF1",
    }
  });

  Courier.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(materialStyles)(Courier);
