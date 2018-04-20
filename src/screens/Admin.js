import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import logo from '../assets/scriptdrop.png';
import Login from './Login';
import UsersTable from '../components/UsersTable';
import PharmaciesTable from '../components/PharmaciesTable';
import CouriersTable from '../components/CouriersTable';

class Admin extends Component {
    state = {
        signOutClicked: false,
        user: {},
        localStorage: '',
        items: [],
        usersClicked: false,
        pharmaciesClicked: false,
        couriersClicked: false,
        ordersClicked: false,
        addNewUser: false,
        addNewPharmacy: false,
        addNewCourier: false,
    };

    signOut = () => {
        localStorage.setItem("Admin_authenticated", "false");
        localStorage.setItem("Admin_user", "");
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

        this.setState(
            {
                items: lsItems,
                localStorage: ls,
                ordersClicked: true,
                usersClicked: false,
                pharmaciesClicked: false,
                couriersClicked: false,
            });
    }

    renderItems = () => {
        const { items, localStorage } = this.state;

        if (localStorage === 'orders') {
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
                        <Icon>account_circle</Icon><span style={{ padding: 5 }}>{user.first_name} {user.last_name}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'left', fontSize: 14, fontFamily: 'Lato' }}>
                        <div style={{ flex: 1, backgroundColor: '#9FA8DA', paddingTop: 15, }}>
                            <div>
                                <span style={{ paddingLeft: 10, fontFamily: 'Roboto', fontWeight: 'bold', color: '#424242' }}>
                                    localStorage items
                                </span>
                                <List>
                                    <ListItem
                                        button 
                                        dense
                                        onClick={() => this.setState(
                                            {
                                                usersClicked: true,
                                                pharmaciesClicked: false,
                                                couriersClicked: false,
                                                ordersClicked: false,
                                                addNewUser: false,
                                                addNewPharmacy: false,
                                                addNewCourier: false,
                                            }
                                        )}>
                                        <ListItemIcon>
                                            <Icon>account_box</Icon>
                                        </ListItemIcon>
                                        <ListItemText primary="Users" />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                aria-label="Add"
                                                onClick={() => this.setState(
                                                    { 
                                                        usersClicked: true,
                                                        pharmaciesClicked: false,
                                                        couriersClicked: false,
                                                        ordersClicked: false,
                                                        addNewUser: true,
                                                        addNewPharmacy: false,
                                                        addNewCourier: false,
                                                    }
                                                )}>
                                                <Icon>add_circle</Icon>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <ListItem 
                                        button 
                                        dense 
                                        onClick={() => this.setState(
                                            {
                                                usersClicked: false,
                                                pharmaciesClicked: true,
                                                couriersClicked: false,
                                                ordersClicked: false,
                                                addNewUser: false,
                                                addNewPharmacy: false,
                                                addNewCourier: false,
                                                }
                                            )}>
                                        <ListItemIcon>
                                            <Icon>local_pharmacy</Icon>
                                        </ListItemIcon>
                                        <ListItemText primary="Pharmacy" />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                aria-label="Add"
                                                onClick={() => this.setState(
                                                    { 
                                                        usersClicked: false,
                                                        pharmaciesClicked: true,
                                                        couriersClicked: false,
                                                        ordersClicked: false,
                                                        addNewUser: false,
                                                        addNewPharmacy: true,
                                                        addNewCourier: false,
                                                    }
                                                )}>
                                                <Icon>add_circle</Icon>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <ListItem
                                        button
                                        dense
                                        onClick={() => this.setState(
                                            {
                                                usersClicked: false,
                                                pharmaciesClicked: false,
                                                couriersClicked: true,
                                                ordersClicked: false,
                                                addNewUser: false,
                                                addNewPharmacy: false,
                                                addNewCourier: false,
                                                }
                                            )}>
                                        <ListItemIcon>
                                            <Icon>local_shipping</Icon>
                                        </ListItemIcon>
                                        <ListItemText primary="Courier" />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                aria-label="Add"
                                                onClick={() => this.setState(
                                                    { 
                                                        usersClicked: false,
                                                        pharmaciesClicked: false,
                                                        couriersClicked: true,
                                                        ordersClicked: false,
                                                        addNewUser: false,
                                                        addNewPharmacy: false,
                                                        addNewCourier: true,
                                                    }
                                                )}>
                                                <Icon>add_circle</Icon>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                            </div>
                            <Divider light />
                            <div style={{ paddingTop: 10 }}>
                                <span style={{ paddingLeft: 12, fontFamily: 'Roboto', fontWeight: 'bold', color: '#424242' }}>Users</span>
                                <List>
                                    <ListItem
                                        button
                                        dense
                                        onClick={() => console.log("Hello")}>
                                        <ListItemText primary="Active users" />
                                    </ListItem>
                                </List>
                            </div>
                            <Divider light />
                            <div style={{ paddingTop: 10 }}>
                                <span style={{ paddingLeft: 12, fontFamily: 'Roboto', fontWeight: 'bold', color: '#424242' }}>Reports</span>
                                <List>
                                    <ListItem button dense onClick={() => this.showLocalStorageItems("orders")}>
                                        <ListItemText primary="Orders Report by Date" />
                                    </ListItem>
                                    <ListItem button dense onClick={() => this.showLocalStorageItems("orders")}>
                                        <ListItemText primary="Orders Report by Pharmacy" />
                                    </ListItem>
                                </List>
                            </div>
                        </div>
                        <div style={{ flex: 5, padding: 10 }}>
                            {this.state.usersClicked ? <UsersTable addUser={this.state.addNewUser} /> : null}
                            {this.state.pharmaciesClicked ? <PharmaciesTable addPharmacy={this.state.addNewPharmacy} /> : null}
                            {this.state.couriersClicked ? <CouriersTable addCourier={this.state.addNewCourier} /> : null}
                            {this.state.ordersClicked ? this.renderItems() : null}
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
