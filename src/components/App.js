import React, { Component } from 'react';
import '../styles/App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '../screens/Login';
import Pharmacy from '../screens/Pharmacy';
import Courier from '../screens/Courier';
import Admin from '../screens/Admin';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

class App extends Component {
  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Login} />
            <Route path="/Pharmacy" component={Pharmacy} />
            <Route path="/Courier" component={Courier} />
            <Route path="/Admin" component={Admin} />
            <Route path="/Login" component={Login} />
          </div>
        </Router>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;
