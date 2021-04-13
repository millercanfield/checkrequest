import React from 'react';
import { connect } from 'react-redux';
import {
    fetchCheckRequest,
    submitApResponse
} from '../../actions';
import ApprovalIoltaManaged from '../approvals/Iolta';
import ApprovalRetainerManaged from '../approvals/retainer';
import toastr from 'toastr';
import moment from 'moment';


class APManaged extends React.Component {

    state = {
        type: '',
        id: 0,
        checkrequest: {},
        note: '',
        response: '',
        errors: {},
        status: '',
        submitted: false
    };

    componentDidMount() {
        const id = this.props.match.params.id;

        this.props.fetchCheckRequest(id)
            .then((response) => {
                const data = JSON.parse(response.data);
                this.setState({
                    checkrequest: data,
                    type: response.checkRequestType,
                    id: id
                });
            });

    }

    valid = () => {
        let errors = {};
        let valid = true;

        if (this.state.response === '') {
            errors.response = 'Please provide a response.  The response will be included in the Email sent to the person who requested the check.'
            valid = false;
        }

        this.setState({ errors: errors });
        return valid;
    }

    onSubmit = (value) => {

        if (!this.valid()) {
            return;
        }
       
        let checkrequest = Object.assign({}, this.state.checkrequest);
        checkrequest.apresponse = this.state.response;
        checkrequest.apresponsedate = new Date();
        checkrequest.apapprover = this.props.username;

        const data = JSON.stringify(checkrequest);
        const body = {
            username: this.props.username,
            data: data,
            id: parseInt(this.state.id),
            value: value
        }

        this.props.submitApResponse(body)
            .then(() => {
                this.setState({ status: value, submitted: true }, this.test);
            })
            .catch(error => {
                toastr.error('Error submitting response');
            });

    }

    test = () => {
        console.log(this.state);
    };

    render() {
        return (
            <div>
                <div hidden={this.state.submitted}>
                    <div hidden={this.state.type === 'retainer'}>
                        <ApprovalIoltaManaged checkrequest={this.state.checkrequest} />
                    </div>
                    <div hidden={this.state.type === 'iolta'}>
                        <ApprovalRetainerManaged checkrequest={this.state.checkrequest} />
                    </div>
                    <hr />
                    <div style={{ padding: "20px" }}>
                        <div>
                            <label><b>Approvals:</b></label>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Approved By</th>
                                        <th>Type</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{this.state.checkrequest.arapprover}</td>
                                        <td>Client Accounting Manager</td>
                                        <td>{moment(this.state.checkrequest.arresponsedate).format('lll')}</td>
                                    </tr>
                                    <tr hidden={!this.state.checkrequest.leaderapprover}>
                                        <td>{this.state.checkrequest.leaderapprover}</td>
                                        <td>Practice Group Leader</td>
                                        <td>{moment(this.state.checkrequest.leaderresponsedate).format('lll')}</td>
                                    </tr>
                                    <tr hidden={!this.state.checkrequest.cfoapprover}>
                                        <td>{this.state.checkrequest.cfoapprover}</td>
                                        <td>CFO</td>
                                        <td>{moment(this.state.checkrequest.cforesponsedate).format('lll')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <div className="col-md-8">
                                <label><b>AR Approval Response:</b></label>
                                <textarea className="form-control" value={this.state.checkrequest.arresponse}
                                    readonly />
                            </div>
                        </div>
                        <div className="row" hidden={!this.state.checkrequest.leaderapprover}>
                            <div className="col-md-8">
                                <label><b>Group Leader Response:</b></label>
                                <textarea className="form-control" value={this.state.checkrequest.leaderresponse}
                                    readonly />
                            </div>
                        </div>
                        <div className="row" hidden={!this.state.checkrequest.cfoapprover}>
                            <div className="col-md-8">
                                <label><b>CFO Response:</b></label>
                                <textarea className="form-control" value={this.state.checkrequest.cforesponse}
                                    readonly />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8">
                                <label><b>AP Response:</b></label>
                                <textarea className="form-control" value={this.state.response}
                                    onChange={(e) => this.setState({ response: e.target.value })} />
                                {this.state.errors.response && <div className="alert alert-danger">{this.state.errors.response}</div>}
                            </div>
                        </div>
                        <div className="row" style={{ paddingTop: "20px", paddingLeft: "15px" }}>
                            <button className="btn btn-success"
                                onClick={() => this.onSubmit('approve')} title="Approve Request">Send Processed Notice</button>
                        </div>
                    </div>
                </div>
                <div hidden={!this.state.submitted} style={{ padding: "30px" }}>

                    {this.state.status === 'approve' && <div>
                        Thank you for your response. An Email has been sent to the person who requested the check.  You can close this tab.
                        </div>}
                </div>
            </div>
        );

    }
};

const mapStateToProps = (state) => {
    return {
        username: state.username,
    }
};

export default connect(mapStateToProps,
    {
        fetchCheckRequest,
        submitApResponse
    })(APManaged);
