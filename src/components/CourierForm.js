import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

class CourierForm extends Component {
    state = {
        courier_id: '',
        name: '',
        address: '',
    }

    componentDidMount() {
        if (localStorage.getItem("couriers")) {
            if (this.props.editCourier) {
                const { courier } = this.props;

                this.setState({
                    courier_id: courier.id,
                    name: courier.name,
                    address: courier.address,
                });
            }
        }
    };

    closeForm = () => {
        this.props.closeModal();
    };

    onSave = () => {
        const { courier } = this.props;
        let couriers = JSON.parse(localStorage.getItem("couriers"));

        if (this.props.editCourier) {
            couriers.map((c) => {
                if (c.id === courier.id) {
                    c.name = this.state.name;
                    c.address = this.state.address;
                }
                return c;
            })
        } else {
            const courier_id = parseInt(couriers[couriers.length-1].id, 10) + 1;
            const courier = {
                id: courier_id.toString(),
                name: this.state.name,
                address: this.state.address,
            }

            couriers.push(courier);
        }

        localStorage.setItem("couriers", JSON.stringify(couriers));
        this.props.closeModal();
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <form>
                    <div>
                        <TextField
                            autoFocus
                            id='name'
                            label='Name'
                            className={classes.textFieldFull}
                            value={this.state.name}
                            placeholder="courier name"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            margin="normal"
                            onChange={this.handleChange('name')} />
                    </div>
                    <div style={{ paddingTop: 10 }}>
                        <TextField
                            id='address'
                            label='Address'
                            className={classes.textFieldFull}
                            value={this.state.address}
                            placeholder="courier address"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            margin="normal"
                            onChange={this.handleChange('address')} />
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

CourierForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(CourierForm);
