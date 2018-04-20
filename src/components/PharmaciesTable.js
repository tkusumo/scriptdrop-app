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
import PharmacyForm from "./PharmacyForm";
import _ from 'lodash';

class PharmaciesTable extends Component {
    state = {
        pharmacies: [],
        modalIsOpen: false,
        current_pharmacy: {},
        editPharmacy: false,
    }

    componentDidMount() {
        this.setState({ pharmacies: JSON.parse(localStorage.getItem("pharmacies")), modalIsOpen: this.props.addPharmacy });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ modalIsOpen: nextProps.addPharmacy });
    }

    renderPharmacies = () => {
        return this.state.pharmacies.map((pharmacy) => {
            return (
                <TableRow key={pharmacy.id}>
                    <TableCell>{pharmacy.id}</TableCell>
                    <TableCell>{pharmacy.name}</TableCell>
                    <TableCell>{pharmacy.address}</TableCell>
                    <TableCell>{pharmacy.courier_id}</TableCell>
                    <TableCell>
                        <IconButton onClick={() => this.setState({ current_pharmacy: pharmacy, modalIsOpen: true, editPharmacy: true })}>
                            <Icon>edit</Icon>
                        </IconButton>
                        <IconButton onClick={() => this.removePharmacy(pharmacy.id)}>
                            <Icon>delete</Icon>
                        </IconButton>
                    </TableCell>
                </TableRow>
            )
        })
    }

    closePharmacyForm = () => {
        this.setState({ editPharmacy: false, current_Pharmacy: {}, modalIsOpen: false, pharmacies: JSON.parse(localStorage.getItem("pharmacies")) });
    }

    getPharmacyIdIndex = (pharmacy_id) => {
        let pharmacies = JSON.parse(localStorage.getItem("pharmacies"));

        for (let i = 0; i < pharmacies.length; i++) {
            if (pharmacy_id.toString() === pharmacies[i].id) {
                return i;
            }
        }
    }

    removePharmacy = (pharmacy_id) => {
        const { pharmacies } = this.state;
        
        _.pullAt(pharmacies, [this.getPharmacyIdIndex(pharmacy_id)]);

        localStorage.setItem("pharmacies", JSON.stringify(pharmacies));
        this.setState({ pharmacies: pharmacies });
    }

    render() {
        const { classes } = this.props;

        return (
            <div style={{ width: '70%' }}>
                <Paper>
                    <Toolbar className={classes.toolbarContainer}>
                        <div>
                            <span>Pharmacies</span>
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
                                    <TableCell>courier_id</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.renderPharmacies()}
                            </TableBody>
                        </Table>
                    </div>
                </Paper>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closePharmacyForm}
                    className={classes.pharmacyFormContainer}
                    shouldCloseOnOverlayClick={false}
                    contentLabel="Pharmacy Form">
                    <PharmacyForm
                        closeModal={this.closePharmacyForm}
                        editPharmacy={this.state.editPharmacy}
                        pharmacy={this.state.current_pharmacy} />
                </Modal>
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
    pharmacyFormContainer: {
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

  PharmaciesTable.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(materialStyles)(PharmaciesTable);
