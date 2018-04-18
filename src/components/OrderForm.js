import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import Button from 'material-ui/Button';
import { DatePicker, TimePicker } from 'material-ui-pickers';

class OrderForm extends Component {
    state = {
        patient_first_name: '',
        patient_last_name: '',
        patient_address: '',
        courier_id: '',
        courier_name: '',
        selectedDate: new Date(),
        selectedTime: new Date(),
        user_id: '',
        pharmacy_id: ''
    }

    componentDidMount() {
        if (localStorage.getItem("Pharmacy_user")) {
            let user = JSON.parse(localStorage.getItem("Pharmacy_user"));
            let courier_id = this.getCourierId(user.type_id);
            let courier_name = this.getCourierName(courier_id);

            if (this.props.editOrder) {
                const { order } = this.props;

                this.setState({
                    user_id: user.id,
                    patient_first_name: order.patient_first_name,
                    patient_last_name: order.patient_last_name,
                    patient_address: order.patient_address,
                    courier_id: order.courier_id,
                    courier_name: this.getCourierName(order.courier_id),
                    selectedDate: new Date(order.pickup_date),
                    selectedTime: new Date(order.pickup_time),
                });
            } else {
                this.setState({
                    user_id: user.id,
                    pharmacy_id: user.type_id,
                    courier_id: courier_id,
                    courier_name: courier_name,
                });
            }
        }
    };

    getCourierId = (pharmacy_id) => {
        let pharmacies = JSON.parse(localStorage.getItem("pharmacies"));

        // getting courier_id
        for (let i=0; i<pharmacies.length; i++) {
            if (pharmacies[i].id === pharmacy_id) {
                return pharmacies[i].courier_id;
            }
        }
    };

    getCourierName = (courier_id) => {
        let couriers = JSON.parse(localStorage.getItem("couriers"));

        // getting courier_id
        for (let i=0; i<couriers.length; i++) {
            if (couriers[i].id === courier_id) {
                return couriers[i].name;
            }
        }
    };

    closeForm = () => {
        this.props.closeModal();
    };

    onSave = () => {
        const { order } = this.props;
        let orders = JSON.parse(localStorage.getItem("orders"));

        if (this.props.editOrder) {
            orders.map((o) => {
                if (o.id === order.id) {
                    o.patient_first_name = this.state.patient_first_name;
                    o.patient_last_name = this.state.patient_last_name;
                    o.patient_address = this.state.patient_address;
                    o.created_by = this.state.user_id;
                    o.courier_id = this.state.courier_id;
                    o.pickup_date = (this.state.selectedDate).toString();
                    o.pickup_time = (this.state.selectedTime).toString();
                }
                return o;
            })
        } else {
            const order_id = orders.length + 1;
            const order = {
                id: order_id.toString(),
                patient_first_name: this.state.patient_first_name,
                patient_last_name: this.state.patient_last_name,
                patient_address: this.state.patient_address,
                created_by: this.state.user_id,
                pharmacy_id: this.state.pharmacy_id,
                courier_id: this.state.courier_id,
                pickup_date: (this.state.selectedDate).toString(),
                pickup_time: (this.state.selectedTime).toString(),
                pickedup_time: '',
                delivered_time: '',
                picked_up: false,
                cancelled: false,
                undelivered: false,
            }

            orders.push(order);
        }

        localStorage.setItem("orders", JSON.stringify(orders));
        this.props.update(this.props.displayDate);
        this.props.closeModal();
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    };

    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
    };

    handleTimeChange = (date) => {
        this.setState({ selectedTime: date });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <form>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <TextField
                            autoFocus
                            id='patient_first_name'
                            label='Patient First Name'
                            className={classes.textField}
                            value={this.state.patient_first_name}
                            placeholder="first name"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.handleChange('patient_first_name')} />
                        <TextField
                            id='patient_last_name'
                            label='Patient Last Name'
                            className={classes.textField}
                            value={this.state.patient_last_name}
                            placeholder="last name"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.handleChange('patient_last_name')} />
                    </div>
                    <div>
                        <TextField
                            id='patient_address'
                            label='Patient Address'
                            className={classes.textFieldFull}
                            value={this.state.patient_address}
                            placeholder="address"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            margin="normal"
                            onChange={this.handleChange('patient_address')} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 7 }}>
                        <DatePicker
                            keyboard
                            label="Pickup Date"
                            value={this.state.selectedDate}
                            onChange={this.handleDateChange}
                            animateYearScrolling={false}
                            className={classes.textFieldFull} />
                        <TimePicker
                            label="Pickup Time"
                            value={this.state.selectedTime}
                            onChange={this.handleTimeChange}
                            className={classes.textFieldFull} />
                    </div>
                    <div>
                        <TextField
                            select
                            id='courier'
                            label='Courier'
                            className={classes.textFieldFull}
                            value={this.state.courier_id}
                            placeholder="courier"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            margin="normal"
                            onChange={this.handleChange('courier')}>
                            <MenuItem key={'1'} value={this.state.courier_id}>
                                {this.state.courier_name}
                            </MenuItem>
                        </TextField>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 30 }}>
                        <Button onClick={this.onSave}>Save</Button>
                        <Button onClick={this.closeForm}>Close</Button>
                    </div>
                </form>
            </div>
        )
    }
};

const styles = theme => ({
    container: {
      padding: 30,
    },
    formContainer: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    textFieldFull: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
  });

  OrderForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(OrderForm);
