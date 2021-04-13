import React from 'react';
import { connect } from 'react-redux';
import {
    fetchCheckRequest,
    submitARResponse
} from '../../actions';
import ApprovalIoltaManaged from './Iolta';
import ApprovalRetainerManaged from './retainer';
import toastr from 'toastr';


class ARApprovalManaged extends React.Component {

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
                let responsetext = '';
                if(data.arresponse !== null && data.arresponse !== undefined){
                    responsetext = data.arresponse;
                }
                this.setState({
                    checkrequest: data,
                    type: response.checkRequestType,
                    response: responsetext,
                    id: id
                });
            });

    }

    valid = (value) => {
        let errors = {};
        let valid = true;

        if (value === 'deny' && this.state.response === '') {
            errors.response = 'Please provide a reason for denying the request.'
            valid = false;
        }

        if (value === 'sendback' && this.state.response === '') {
            errors.response = 'Please provide a reason for sending the request back to the requester.'
            valid = false;
        }

        this.setState({ errors: errors });
        return valid;
    }

    onSubmit = (value) => {
        if (!this.valid(value)) {
            return;
        }

        let checkrequest = Object.assign({}, this.state.checkrequest);
        checkrequest.arresponse = this.state.response;
        checkrequest.arresponsedate = new Date();
        checkrequest.arstatus = value;
        checkrequest.arapprover = this.props.username;

        const data = JSON.stringify(checkrequest);
        const body = {
            username: this.props.username,
            data: data,
            id: parseInt(this.state.id),
            value: value
        }

        console.log('value', value);
        this.props.submitARResponse(body)
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
                    <div style={{ padding: "20px" }}>
                        <div className="row">
                            <div className="col-md-8">
                                <label><b>AR Approval Response:</b></label>
                                <textarea className="form-control" value={this.state.response}
                                    onChange={(e) => this.setState({ response: e.target.value })} />
                                {this.state.errors.response && <div className="alert alert-danger">{this.state.errors.response}</div>}
                            </div>
                        </div>
                        <div className="row" style={{ paddingTop: "20px", paddingLeft: "15px" }}>
                            <button className="btn btn-success" style={{ width: "100px" }}
                                onClick={() => this.onSubmit('approve')} title="Approve Request">Approve</button>
                        &nbsp;
                        <button className="btn btn-danger" style={{ width: "100px" }}
                                onClick={() => this.onSubmit('deny')} title="Deny Request">Deny</button>
                        &nbsp;
                        <button className="btn btn-info" style={{ width: "100px" }}
                                onClick={() => this.onSubmit('sendback')} title="Send the Request Back">Send Back</button>
                        </div>
                    </div>
                </div>
                <div hidden={!this.state.submitted} style={{padding: "30px"}}>
                       
                        { this.state.status === 'sendback' && <div>
                            Thank you for your response.  The check request will be sent back to the requester. You can close this tab.
                        </div>}
                        { this.state.status === 'approve' && <div>
                            Thank you for your response. The check request will continue to process.  You can close this tab.
                        </div>}
                        { this.state.status === 'deny' && <div>
                            Thank you for your response.  The check request will be cancelled. You can close this tab.
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
        submitARResponse
    })(ARApprovalManaged);
