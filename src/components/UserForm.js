import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

class UserForm extends Component {
    state = {
        user_id: '',
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        type: '',
        type_id: '',
    }

    componentDidMount() {
        if (localStorage.getItem("users")) {
            if (this.props.editUser) {
                const { user } = this.props;

                this.setState({
                    user_id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    username: user.username,
                    password: user.password,
                    type: user.type,
                    type_id: user.type_id,
                });
            }
        }
    };

    closeForm = () => {
        this.props.closeModal();
    };

    onSave = () => {
        const { user } = this.props;
        let users = JSON.parse(localStorage.getItem("users"));

        if (this.props.editUser) {
            users.map((usr) => {
                if (usr.id === user.id) {
                    usr.first_name = this.state.first_name;
                    usr.last_name = this.state.last_name;
                    usr.username = this.state.username;
                    usr.password = this.state.password;
                    usr.type = this.state.type;
                    usr.type_id = this.state.type_id;
                }
                return usr;
            })
        } else {
            const user_id = parseInt(users[users.length-1].id, 10) + 1;
            const user = {
                id: user_id.toString(),
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                username: this.state.username,
                password: this.state.password,
                type: this.state.type,
                type_id: this.state.type_id
            }

            users.push(user);
        }

        localStorage.setItem("users", JSON.stringify(users));
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
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <TextField
                            autoFocus
                            id='first_name'
                            label='First Name'
                            className={classes.textField}
                            value={this.state.first_name}
                            placeholder="first name"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.handleChange('first_name')} />
                        <TextField
                            id='last_name'
                            label='Last Name'
                            className={classes.textField}
                            value={this.state.last_name}
                            placeholder="last name"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.handleChange('last_name')} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 15 }}>
                        <TextField
                            id='username'
                            label='Username'
                            className={classes.textField}
                            value={this.state.username}
                            placeholder="username"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.handleChange('username')} />
                        <TextField
                            id='password'
                            label='Password'
                            className={classes.textField}
                            value={this.state.password}
                            placeholder="password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.handleChange('password')} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 15 }}>
                        <TextField
                            id='type'
                            label='Type'
                            className={classes.textField}
                            value={this.state.type}
                            placeholder="type"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.handleChange('type')} />
                        <TextField
                            id='type_id'
                            label='Type Id'
                            className={classes.textField}
                            value={this.state.type_id}
                            placeholder="type_id"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.handleChange('type_id')} />
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
    button: {
        margin: theme.spacing.unit,
    },
  });

  UserForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(UserForm);
