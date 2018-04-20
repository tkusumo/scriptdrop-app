import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import Modal from 'react-modal';
import CourierForm from "./CourierForm";
import _ from 'lodash';

class CouriersTable extends Component {
    state = {
        couriers: [],
        modalIsOpen: false,
        current_courier: {},
        editCourier: false,
    }

    componentDidMount() {
        this.setState({ couriers: JSON.parse(localStorage.getItem("couriers")), modalIsOpen: this.props.addCourier });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ modalIsOpen: nextProps.addCourier });
    }

    renderCouriers = () => {
        return this.state.couriers.map((courier) => {
            return (
                <TableRow key={courier.id}>
                    <TableCell>{courier.id}</TableCell>
                    <TableCell>{courier.name}</TableCell>
                    <TableCell>{courier.address}</TableCell>
                    <TableCell>
                        <IconButton onClick={() => this.setState({ current_courier: courier, modalIsOpen: true, editCourier: true })}>
                            <Icon>edit</Icon>
                        </IconButton>
                        <IconButton onClick={() => this.removeCourier(courier.id)}>
                            <Icon>delete</Icon>
                        </IconButton>
                    </TableCell>
                </TableRow>
            )
        })
    }

    closeCourierForm = () => {
        this.setState({ editCourier: false, current_courier: {}, modalIsOpen: false, couriers: JSON.parse(localStorage.getItem("couriers")) });
    }

    getCourierIdIndex = (courier_id) => {
        let couriers = JSON.parse(localStorage.getItem("couriers"));

        for (let i = 0; i < couriers.length; i++) {
            if (courier_id.toString() === couriers[i].id) {
                return i;
            }
        }
    }

    removeCourier = (courier_id) => {
        const { couriers } = this.state;
        
        _.pullAt(couriers, [this.getCourierIdIndex(courier_id)]);

        localStorage.setItem("couriers", JSON.stringify(couriers));
        this.setState({ couriers: couriers });
    }

    render() {
        const { classes } = this.props;

        return (
            <div style={{ width: '60%' }}>
                <Paper>
                    <Toolbar className={classes.toolbarContainer}>
                        <div>
                            <span>Couriers</span>
                        </div>
                        <div className={classes.spacer} />
                    </Toolbar>
                    <div className={classes.tableWraper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>id</TableCell>
                                    <TableCell>name</TableCell>
                                    <TableCell>address</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.renderCouriers()}
                            </TableBody>
                        </Table>
                    </div>
                </Paper>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeCourierForm}
                    className={classes.courierFormContainer}
                    shouldCloseOnOverlayClick={false}
                    contentLabel="Courier Form">
                    <CourierForm
                        closeModal={this.closeCourierForm}
                        editCourier={this.state.editCourier}
                        courier={this.state.current_courier} />
                </Modal>
            </div>
        )
    }
}

const materialStyles = theme => ({
    paperContainer: {
        paddingRight: theme.spacing.unit,
        width: '60%',
    },
    toolbarContainer: {
        paddingRight: 15,
        fontSize: 24,
    },
    spacer: {
        flex: '1 1 100%',
    },
    table: {
        minWidth: '60%',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    courierFormContainer: {
        position: 'absolute',
        top: '30%',
        left: '50%',
        width: 500,
        height: 350,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        transform: 'translate(-50%, -50%)',
    },
  });

  CouriersTable.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(materialStyles)(CouriersTable);
