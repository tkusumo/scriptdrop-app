import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';

class PackagesTable extends Component {
    state = {
        displayDate: new Date(),
        packages: [],
    }

    componentDidMount() {
        this.updateTable(this.props.packagesDate);
    }

    componentWillReceiveProps(nextProps) {
        this.updateTable(nextProps.packagesDate);
    }

    updateTable = (date) => {
        const packages = JSON.parse(localStorage.getItem("orders"));
        const user = JSON.parse(localStorage.getItem("Courier_user"));

        let newPackages = [];
        for (let i=0; i < packages.length; i++) {
            let packageDate = new Date(packages[i].pickup_date);
            if ((packages[i].courier_id === user.type_id)
                && (date.getDate().toString() === packageDate.getDate().toString())
                && (date.getMonth().toString() === packageDate.getMonth().toString())
                && (packages[i].cancelled === false)
            ) {
                newPackages.push(packages[i]);
            }
        }

        this.setState({
            displayDate: date,
            packages: newPackages,
        });
    }

    getPickupTime = (date) => {
        let newDate = new Date(date);

        let hr = newDate.getHours();
        if (hr < 10) {
            hr = "0" + hr.toString();
        }

        let min = newDate.getMinutes();
        if (min < 10) {
            min = "0" + min.toString();
        }

        return hr + ":" + min; 
    }

    getPharmacyName = (pharmacy_id) => {
        const pharmacies = JSON.parse(localStorage.getItem("pharmacies"));

        for (let i = 0; i < pharmacies.length; i++) {
            if (pharmacies[i].id === pharmacy_id) {
                return pharmacies[i].name;
            }
        }
    }

    deliveryOnCheck = (order_id, status) => {
        let orders = JSON.parse(localStorage.getItem("orders"));

        orders.map((order) => {
                if (order.id === order_id) {
                    if (status === 'undelivered') {
                        order.undelivered = !order.undelivered;
                    } else {
                        if (order.delivered_time === '') {
                            order.delivered_time = new Date().toString();
                        } else {
                            order.delivered_time = '';
                        }
                    }
                }
                return order;
        });

        localStorage.setItem("orders", JSON.stringify(orders));
        console.log(orders);

        this.updateTable(this.state.displayDate);
    }

    render() {
        const { classes } = this.props;

        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 15 }}>
                <Paper className={classes.paperContainer}>
                    <Toolbar className={classes.toolbarContainer}>
                        <div>
                            <span>Packages</span>
                        </div>
                        <div className={classes.spacer} />
                    </Toolbar>
                    <div className={classes.tableWraper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Patient Name</TableCell>
                                    <TableCell>Patient Address</TableCell>
                                    <TableCell>Pharmacy</TableCell>
                                    <TableCell>Pick up time</TableCell>
                                    <TableCell>Delivered?</TableCell>
                                    <TableCell>Un-delivered?</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { this.state.packages.map(pck =>{
                                    return (
                                        <TableRow key={pck.id}>
                                            <TableCell><span>{pck.patient_first_name} {pck.patient_last_name}</span></TableCell>
                                            <TableCell><span>{pck.patient_address}</span></TableCell>
                                            <TableCell>{this.getPharmacyName(pck.pharmacy_id)}</TableCell>
                                            <TableCell>{this.getPickupTime(pck.pickup_time)}</TableCell>
                                            <TableCell>
                                                <Checkbox
                                                    disabled={(pck.undelivered || pck.pickedup_time === '') ? true : false}
                                                    checked={(pck.delivered_time !== '') ? true : false}
                                                    onChange={() => {this.deliveryOnCheck(pck.id, 'delivered')}} />
                                            </TableCell>
                                            <TableCell>
                                                <Checkbox
                                                    disabled={(pck.delivered_time !== '' || pck.pickedup_time === '') ? true : false}
                                                    checked={(pck.undelivered) ? true : false}
                                                    onChange={() => {this.deliveryOnCheck(pck.id, 'undelivered')}} />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </Paper>
            </div>
        )
    }
}

const materialStyles = theme => ({
    paperContainer: {
        paddingRight: theme.spacing.unit,
        width: '70%',
    },
    toolbarContainer: {
        paddingRight: 15,
        fontSize: 24,
    },
    spacer: {
        flex: '1 1 100%',
    },
    table: {
        minWidth: '70%',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
  });

  PackagesTable.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(materialStyles)(PackagesTable);