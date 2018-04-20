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
import UserForm from "./UserForm";
import _ from 'lodash';

class UsersTable extends Component {
    state = {
        users: [],
        modalIsOpen: false,
        current_user: {},
        editUser: false,
    }

    componentDidMount() {
        this.setState({ users: JSON.parse(localStorage.getItem("users")), modalIsOpen: this.props.addUser });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ modalIsOpen: nextProps.addUser });
    }

    renderUsers = () => {
        return this.state.users.map((user) => {
            return (
                <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.password}</TableCell>
                    <TableCell>{user.type}</TableCell>
                    <TableCell>{user.type_id}</TableCell>
                    <TableCell>
                        <IconButton onClick={() => this.setState({ current_user: user, modalIsOpen: true, editUser: true })}>
                            <Icon>edit</Icon>
                        </IconButton>
                        <IconButton onClick={() => this.removeUser(user.id)}>
                            <Icon>delete</Icon>
                        </IconButton>
                    </TableCell>
                </TableRow>
            )
        })
    }

    closeUserForm = () => {
        this.setState({ editUser: false, current_user: {}, modalIsOpen: false, users: JSON.parse(localStorage.getItem("users")) });
    }

    getUserIdIndex = (user_id) => {
        let users = JSON.parse(localStorage.getItem("users"));

        for (let i = 0; i < users.length; i++) {
            if (user_id.toString() === users[i].id) {
                return i;
            }
        }
    }

    removeUser = (user_id) => {
        const { users } = this.state;
        
        _.pullAt(users, [this.getUserIdIndex(user_id)]);

        localStorage.setItem("users", JSON.stringify(users));
        this.setState({ users: users });
    }

    render() {
        const { classes } = this.props;

        return (
            <div style={{ width: '80%' }}>
                <Paper>
                    <Toolbar className={classes.toolbarContainer}>
                        <div>
                            <span>Users</span>
                        </div>
                        <div className={classes.spacer} />
                    </Toolbar>
                    <div className={classes.tableWraper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>id</TableCell>
                                    <TableCell>first_name</TableCell>
                                    <TableCell>last_name</TableCell>
                                    <TableCell>username</TableCell>
                                    <TableCell>password</TableCell>
                                    <TableCell>type</TableCell>
                                    <TableCell>type_id</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.renderUsers()}
                            </TableBody>
                        </Table>
                    </div>
                </Paper>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeUserForm}
                    className={classes.userFormContainer}
                    shouldCloseOnOverlayClick={false}
                    contentLabel="User Form">
                    <UserForm
                        closeModal={this.closeUserForm}
                        editUser={this.state.editUser}
                        user={this.state.current_user} />
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
    userFormContainer: {
        position: 'absolute',
        top: '30%',
        left: '50%',
        width: 500,
        height: 300,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        transform: 'translate(-50%, -50%)',
    },
  });

 UsersTable.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(materialStyles)(UsersTable);
