import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

class PharmacyForm extends Component {
    state = {
        pharmacy_id: '',
        name: '',
        address: '',
        courier_id: '',
    }

    componentDidMount() {
        if (localStorage.getItem("pharmacies")) {
            if (this.props.editPharmacy) {
                const { pharmacy } = this.props;

                this.setState({
                    pharmacy_id: pharmacy.id,
                    name: pharmacy.name,
                    address: pharmacy.address,
                    courier_id: pharmacy.courier_id,
                });
            }
        }
    };

    closeForm = () => {
        this.props.closeModal();
    };

    onSave = () => {
        const { pharmacy } = this.props;
        let pharmacies = JSON.parse(localStorage.getItem("pharmacies"));

        if (this.props.editPharmacy) {
            pharmacies.map((p) => {
                if (p.id === pharmacy.id) {
                    p.name = this.state.name;
                    p.address = this.state.address;
                    p.courier_id = this.state.courier_id;
                }
                return p;
            })
        } else {
            const pharmacy_id = parseInt(pharmacies[pharmacies.length-1].id, 10) + 1;
            const pharmacy = {
                id: pharmacy_id.toString(),
                name: this.state.name,
                address: this.state.address,
                courier_id: this.state.courier_id,
            }

            pharmacies.push(pharmacy);
        }

        localStorage.setItem("pharmacies", JSON.stringify(pharmacies));
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
                            placeholder="pharmacy name"
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
                            placeholder="pharmacy address"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            margin="normal"
                            onChange={this.handleChange('address')} />
                    </div>
                    <div style={{ paddingTop: 15 }}>
                        <TextField
                            id='courier_id'
                            label='Courier Id'
                            className={classes.textField}
                            value={this.state.courier_id}
                            placeholder="courier id"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.handleChange('courier_id')} />
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

  PharmacyForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(PharmacyForm);
