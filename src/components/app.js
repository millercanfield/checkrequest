import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import { fetchUsername, fetchDepts, fetchOffices, fetchEmployees } from '../actions';
import Header from './common/Header';
import Side from './common/Side';
import About from './about/About';
import Help from './help/Help';
import HomePage from './home/HomePage';
import IlotaManaged from './iolta/IoltaManaged';
import RetainerManaged from './retainer/RetainerManaged';
import APIoltaManaged from './ap/APIoltaManaged';
import APRetainerManaged from './ap/APRetainerManaged';

class App extends React.Component {
    state = {
        menuname: 'home'
    };

    componentDidMount() {
        this.props.fetchUsername();
        this.props.fetchDepts();
        this.props.fetchOffices();
        this.props.fetchEmployees();
    }

    onMenuChange = (name) => {
        this.setState({ menuname: name });
    }

    render() {
        return (
            <Router>
                <div style={this.props.loading ? { opacity: "0.25" } : { opacity: "1.0" }}>
                    
                    <Header username={this.props.username} onMenuChange={this.onMenuChange} />
                    <table>
                        <tbody>
                            <tr>
                                <td valign="top">
                                    <div id="side">
                                        <Side menuname={this.state.menuname} />
                                    </div>
                                </td>
                                <td valign="top">
                                    <div id="main">
                                        <Route exact path="/" component={HomePage} />
                                        <Route path="/retainer" component={RetainerManaged} />
                                        <Route path="/ap/iolta/:id" component={APIoltaManaged} />
                                        <Route path="/ap/retainer/:id" component={APRetainerManaged} />
                                        <Route path="/iolta" component={IlotaManaged} />
                                        <Route path="/about" component={About} />                         
                                        <Route path="/help" component={Help} />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="loader" hidden={!this.props.loading}></div>
            </Router>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        loading: state.ajaxCallsInProgress > 0,
        username: state.username
    };
}

export default connect(mapStateToProps, { fetchUsername, fetchDepts, fetchOffices, fetchEmployees })(App);