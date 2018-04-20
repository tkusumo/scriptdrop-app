import React, { Component, Fragment } from "react";
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
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Paper from 'material-ui/Paper';
import Modal from 'react-modal';
import OrderForm from './OrderForm';

Modal.setAppElement('#root');

class OrdersTable extends Component {
    state = {
        modalIsOpen: false,
        displayDate: new Date(),
        orders: [],
        editOrder: false,
        current_order: {},
    }

    componentDidMount() {
        this.updateTable(this.props.ordersDate);
    }

    componentWillReceiveProps(nextProps) {
        this.updateTable(nextProps.ordersDate);
    }

    updateTable = (date) => {
        const orders = JSON.parse(localStorage.getItem("orders"));
        const user = JSON.parse(localStorage.getItem("Pharmacy_user"));

        let newOrders = [];
        for (let i=0; i < orders.length; i++) {
            let orderDate = new Date(orders[i].pickup_date);
            if ((orders[i].pharmacy_id === user.type_id)
                && (date.getDate().toString() === orderDate.getDate().toString())
                && (date.getMonth().toString() === orderDate.getMonth().toString())
            ) {
                newOrders.push(orders[i]);
            }
        }

        this.setState({
            displayDate: date,
            orders: newOrders,
        });
    }

    addButtonClicked = () => {
        this.setState({ modalIsOpen: true });
    }

    editButtonClicked = (order) => {
        this.setState({ editOrder: true, current_order: order, modalIsOpen: true });
    }

    deleteButtonClicked = (order_id) => {
        let orders = JSON.parse(localStorage.getItem("orders"));

        orders.map((order) => {
                if (order.id === order_id) {
                    order.cancelled = true;
                }
                return order;
        });

        localStorage.setItem("orders", JSON.stringify(orders));

        this.updateTable(this.state.displayDate);
    }

    closeOrderForm = () => {
        this.setState({ editOrder: false, current_order: {}, modalIsOpen: false });
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
    
    getCourierName = (courier_id) => {
        let couriers = JSON.parse(localStorage.getItem("couriers"));

        // getting courier_id
        for (let i=0; i<couriers.length; i++) {
            if (couriers[i].id === courier_id) {
                return couriers[i].name;
            }
        }
    };

    pickupOnCheck = (order_id) => {
        let orders = JSON.parse(localStorage.getItem("orders"));

        orders.map((order) => {
                if (order.id === order_id) {
                    order.picked_up = !order.picked_up;
                    if (order.pickedup_time === '') {
                        order.pickedup_time = new Date().toString();
                    } else {
                        order.pickedup_time = '';
                    }
                }
                return order;
        });

        localStorage.setItem("orders", JSON.stringify(orders));

        this.updateTable(this.state.displayDate);
    }

    renderDeliveryStatusCell = (order) => {
        if (!order.picked_up && order.cancelled === false) {
            return (
                <Fragment>
                    <IconButton onClick={() => this.editButtonClicked(order)}>
                        <Icon>edit</Icon>
                    </IconButton>
                    <IconButton onClick={() => this.deleteButtonClicked(order.id)}>
                        <Icon>delete</Icon>
                    </IconButton>
                </Fragment>
            )
        } else {
            if (order.undelivered === false && order.delivered_time === '' && order.cancelled === false ) {
                return <span style={{ fontSize: 16 }}>Picked up by courier, on the way</span>
            } else if (order.undelivered) {
                return <span style={{ fontSize: 16 }}>Package was not delivered</span>
            } else if (order.delivered_time !== '') {
                return <span style={{ fontSize: 16 }}>Package successfully delivered</span>
            } else if (order.cancelled) {
                return <span style={{ fontSize: 16 }}>Order cancelled</span>
            }
        }
    }

    isPickUpDateToday = (dt) => {
        const orderDate = new Date(dt);
        
        if (orderDate.getDate() === new Date().getDate()) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 15 }}>
                <Paper className={classes.paperContainer}>
                    <Toolbar className={classes.toolbarContainer}>
                        <div>
                            <span>Orders</span>
                        </div>
                        <div className={classes.spacer} />
                        <div>
                            <IconButton
                                color="primary"
                                aria-label="add-order"
                                onClick={this.addButtonClicked}>
                                <Icon style={{ fontSize: 30 }}>add</Icon>
                            </IconButton>
                        </div>
                    </Toolbar>
                    <div className={classes.tableWraper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Picked up</TableCell>
                                    <TableCell>Pick up time</TableCell>
                                    <TableCell>Courier</TableCell>
                                    <TableCell>Patient Name</TableCell>
                                    <TableCell>Patient Address</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { this.state.orders.map(order =>{
                                    return (
                                        <TableRow key={order.id}>
                                            <TableCell>
                                                <Checkbox
                                                    disabled={
                                                        (order.delivered_time !== '' 
                                                        || order.undelivered 
                                                        || order.cancelled 
                                                        || !this.isPickUpDateToday(order.pickup_date)) ? true : false}
                                                    checked={order.picked_up}
                                                    onChange={() => this.pickupOnCheck(order.id)} />
                                            </TableCell>
                                            <TableCell>{this.getPickupTime(order.pickup_time)}</TableCell>
                                            <TableCell>{this.getCourierName(order.courier_id)}</TableCell>
                                            <TableCell><span>{order.patient_first_name} {order.patient_last_name}</span></TableCell>
                                            <TableCell><span>{order.patient_address}</span></TableCell>
                                            <TableCell>
                                                { this.renderDeliveryStatusCell(order) }
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </Paper>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeOrderForm}
                    className={classes.orderFormContainer}
                    shouldCloseOnOverlayClick={false}
                    contentLabel="Order Form">
                    <OrderForm
                        closeModal={this.closeOrderForm}
                        update={this.updateTable}
                        displayDate={this.state.displayDate}
                        editOrder={this.state.editOrder}
                        order={this.state.current_order} />
                </Modal>
            </div>
        )
    }
}

const materialStyles = theme => ({
    paperContainer: {
        paddingRight: theme.spacing.unit,
        width: '80%',
    },
    toolbarContainer: {
        paddingRight: 15,
        fontSize: 24,
    },
    spacer: {
        flex: '1 1 100%',
    },
    table: {
        minWidth: '80%',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    orderFormContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 500,
        height: 400,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        transform: 'translate(-50%, -50%)',
    },
  });

  OrdersTable.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(materialStyles)(OrdersTable);
