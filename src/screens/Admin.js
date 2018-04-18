import React, { Component } from 'react';import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Login from './Login';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import logo from '../assets/scriptdrop.png';

class Admin extends Component {
    state = {
        signOutClicked: false,
        user: {},
        localStorage: '',
        items: [],
    };

    signOut = () => {
        localStorage.setItem("authenticated", "false");
        localStorage.setItem("user", "");
        this.setState({ signOutClicked: true });
    };

    componentDidMount() {
        if (localStorage.getItem("Admin_authenticated") === "false") {
            this.setState({ signOutClicked: true });
        } else {
            const currentUser = JSON.parse(localStorage.getItem("Admin_user"))

            this.setState({ user: currentUser })
        }
    };

    showLocalStorageItems = (ls) => {
        const lsItems = JSON.parse(localStorage.getItem(ls));

        this.setState({ items: lsItems, localStorage: ls });
    }

    renderItems = () => {
        const { items, localStorage } = this.state;

        if (localStorage === 'users') {
            return (
                items.map((item) => {
                    return (
                        <p key={item.id} style={{ fontSize: 14, fontFamily: 'Lato' }}>
                            <span style={{ color: "gray" }}>id: </span><span style={{ fontWeight: "bold" }}>{item.id} </span>
                            <span style={{ color: "gray" }}>first_name: </span><span style={{ fontWeight: "bold" }}>{item.first_name} </span>
                            <span style={{ color: "gray" }}>last_name: </span><span style={{ fontWeight: "bold" }}>{item.last_name} </span>
                            <span style={{ color: "gray" }}>username: </span><span style={{ fontWeight: "bold" }}>{item.username} </span>
                            <span style={{ color: "gray" }}>password: </span><span style={{ fontWeight: "bold" }}>{item.password} </span>
                            <span style={{ color: "gray" }}>type: </span><span style={{ fontWeight: "bold" }}>{item.type} </span>
                            <span style={{ color: "gray" }}>type_id: </span><span style={{ fontWeight: "bold" }}>{item.type_id} </span>
                        </p>
                    )
                })
            )
        } else if (localStorage === 'orders') {
            return (
                items.map((item) => {
                    return (
                        <p key={item.id} style={{ fontSize: 14, fontFamily: 'Lato' }}>
                            <span style={{ color: "gray" }}>id: </span><span style={{ fontWeight: "bold" }}>{item.id} </span>
                            <span style={{ color: "gray" }}>patient_first_name: </span><span style={{ fontWeight: "bold" }}>{item.patient_first_name} </span>
                            <span style={{ color: "gray" }}>patient_last_name: </span><span style={{ fontWeight: "bold" }}>{item.patient_last_name} </span>
                            <span style={{ color: "gray" }}>patient_address: </span><span style={{ fontWeight: "bold" }}>{item.patient_address} </span>
                            <span style={{ color: "gray" }}>created_by: </span><span style={{ fontWeight: "bold" }}>{item.created_by} </span>
                            <span style={{ color: "gray" }}>pharmacy_id: </span><span style={{ fontWeight: "bold" }}>{item.pharmacy_id} </span>
                            <span style={{ color: "gray" }}>courier_id: </span><span style={{ fontWeight: "bold" }}>{item.courier_id} </span>
                            <span style={{ color: "gray" }}>pickup_date: </span><span style={{ fontWeight: "bold" }}>{item.pickup_date} </span>
                            <span style={{ color: "gray" }}>pickup_time: </span><span style={{ fontWeight: "bold" }}>{item.pickup_time} </span>
                            <span style={{ color: "gray" }}>pickedup_time: </span><span style={{ fontWeight: "bold" }}>{item.pickedup_time} </span>
                            <span style={{ color: "gray" }}>delivered_time: </span><span style={{ fontWeight: "bold" }}>{item.delivered_time} </span>
                            <span style={{ color: "gray" }}>picked_up: </span><span style={{ fontWeight: "bold" }}>{item.picked_up ? 'true' : 'false'} </span>
                            <span style={{ color: "gray" }}>cancelled: </span><span style={{ fontWeight: "bold" }}>{item.cancelled ? 'true' : 'false'} </span>
                            <span style={{ color: "gray" }}>undelivered: </span><span style={{ fontWeight: "bold" }}>{item.undelivered ? 'true' : 'false'} </span>
                        </p>
                    )
                })
            );
        } else if (localStorage === 'pharmacies') {
            return (
                items.map((item) => {
                    return (
                        <p key={item.id} style={{ fontSize: 14, fontFamily: 'Lato' }}>
                            <span style={{ color: "gray" }}>id: </span><span style={{ fontWeight: "bold" }}>{item.id} </span>
                            <span style={{ color: "gray" }}>name: </span><span style={{ fontWeight: "bold" }}>{item.name} </span>
                            <span style={{ color: "gray" }}>address: </span><span style={{ fontWeight: "bold" }}>{item.address} </span>
                            <span style={{ color: "gray" }}>courier_id: </span><span style={{ fontWeight: "bold" }}>{item.courier_id} </span>
                        </p>
                    )
                })
            );
        } else if (localStorage === 'couriers') {
            return (
                items.map((item) => {
                    return (
                        <p key={item.id} style={{ fontSize: 14, fontFamily: 'Lato' }}>
                            <span style={{ color: "gray" }}>id: </span><span style={{ fontWeight: "bold" }}>{item.id} </span>
                            <span style={{ color: "gray" }}>name: </span><span style={{ fontWeight: "bold" }}>{item.name} </span>
                            <span style={{ color: "gray" }}>address: </span><span style={{ fontWeight: "bold" }}>{item.address} </span>
                        </p>
                    )
                })
            );
        }
    }

    render() {
        const { classes } = this.props;
        const { user } = this.state;

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
                        <span style={{ padding: 5, color: '#BF360C', fontSize: 14 }}>{user.type}</span>
                        <span style={{ padding: 5 }}>||</span>
                        <span style={{ padding: 5 }}>{user.first_name} {user.last_name}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'left'  }}>
                        <div style={{ flex: 1, backgroundColor: 'gray' }}>
                            <div>
                                <p style={{ paddingLeft: 10 }}>Show localStorage items</p>
                                <ul>
                                    <li><a href="./#" onClick={() => this.showLocalStorageItems("users")}>Users</a></li>
                                    <li><a href="./#" onClick={() => this.showLocalStorageItems("orders")}>Orders</a></li>
                                    <li><a href="./#" onClick={() => this.showLocalStorageItems("pharmacies")}>Pharmacy</a></li>
                                    <li><a href="./#" onClick={() => this.showLocalStorageItems("couriers")}>Courier</a></li>
                                </ul>
                            </div>
                            <div>
                                <p style={{ paddingLeft: 10 }}>Remove localStorage items</p>
                                <ul>
                                    <li>Users</li>
                                    <li>Orders</li>
                                    <li>Pharmacy</li>
                                    <li>Courier</li>
                                </ul>
                            </div>
                        </div>
                        <div style={{ flex: 5, padding: 10 }}>
                            {this.renderItems()}
                        </div>
                    </div>

                    <Route path="/Login" component={Login} />
                </div>
            </Router>
        )
    }
};

const materialStyles = theme => ({
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E8EAF6',
    },
    headerDetailContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#C5CAE9',
        paddingLeft: 10,
        height: 35,
        fontSize: 12,
        fontFamily: 'Roboto',
    },
    button: {
        margin: 10,
        fontSize: 12,
    },
});

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(materialStyles)(Admin);
