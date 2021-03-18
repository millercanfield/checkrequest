import React from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import {
    fetchEmployee,
    fetchMatter,
    fetchClient,
    fetchRetainer
} from '../../actions';
import { MatterSearch } from '../common/MatterSearch';
import { MatterDetails } from '../common/MatterDetails';

class RetainerManaged extends React.Component {
    state = {
        employee: {},
        matter: {},
        client: {},
        selectedDept: '',
        selectedOffice: '',
        retainer: '',
        showError: false,
        amount: '',
        payableTo: '',
        additionalInfo: '',
        errors: {}
    }

    test() {
        //console.log('state', this.state);
    }

    onMatterSearch = (clientCode, matterCode) => {

        this.props.fetchMatter(clientCode, matterCode)
            .then(() => {

                if (this.props.matter.clientUno) {
                    this.props.fetchEmployee(this.props.username)
                        .then(() => {
                            this.props.fetchClient(this.props.matter.clientUno)
                                .then(() => {

                                    this.props.fetchRetainer(this.props.matter.matterUno)
                                        .then(() => {

                                            this.setState({
                                                employee: this.props.employee,
                                                matter: this.props.matter,
                                                client: this.props.client,
                                                selectedOffice: this.props.matter.offc,
                                                selectedDept: this.props.matter.dept,
                                                retainer: this.props.retainer,
                                                showError: false
                                            }, this.isValid
                                            );

                                        });
                                });
                        });
                }
                else {
                    this.setState({ showError: true });
                }

            });

    };

    onOfficeChange = (event) => {
        console.log(event.target.value);
        this.setState({ selectedOffice: event.target.value }, this.isValid);
    };

    onDeptChange = (event) => {

        console.log(event.target.value);
        this.setState({ selectedDept: event.target.value }, this.isValid);
    }

    onBack = () => {
        this.setState({
            employee: {},
            matter: {},
            client: {},
            selectedDept: '',
            selectedOffice: '',
            retainer: '',
            showError: false,
            amount: '',
            payableTo: '',
            additionalInfo: '',
            errors: {}

        });
    }

    onAdditionInfoChange = (event) => {
        this.setState({ additionalInfo: event.target.value }, this.isValid);
    }

    onAmountChange = (event) => {
        this.setState({ amount: event.target.value }, this.isValid);
    }

    onPayableToChange = (event) => {
        this.setState({ payableTo: event.target.value }, this.isValid);
    }

    isValid = () => {
        let errors = {};
        let valid = true;
        if(this.state.payableTo === ''){
            errors.payableTo = 'Payable To is required.'
            valid = false;
        }
        if(this.state.amount === ''){
            errors.amount = 'Amount is required.'
            valid = false;
        }
        if(this.state.selectedDept === ''){
            errors.selectedDept = 'Dept is required.'
            valid = false;
        }
        if(this.state.selectedOffice === ''){
            errors.selectedOffice = 'Office is required.'
            valid = false;
        }

        this.setState({errors: errors});
        return valid;
    }

    onSubmit = () => {
        const valid = this.isValid();

        if(!valid){
            return;
        }

        //TODO: post to server for processing
        console.log('state', this.state);

        this.onBack();
        toastr.success('Successfully submitted form to AP')
    }

    render() {

        return (
            <div>
                <h3>Check Request</h3>
                <div style={{ padding: "20px" }}>
                    <h4>Unapplied/Retainer Balance Refunds</h4>
                    <div style={{ paddingTop: "20px" }} hidden={this.state.matter.matterCode}>
                        <MatterSearch onMatterSearch={this.onMatterSearch} />
                        <div style={{ color: 'red' }} hidden={!this.state.showError}>
                            Not found. NOTE: Leading zeros are required (for example 00001).
                        </div>
                    </div>
                    <div hidden={!this.state.matter.matterCode} style={{ paddingTop: "20px" }}>
                        <MatterDetails
                            client={this.state.client}
                            matter={this.state.matter}
                            offices={this.props.offices}
                            depts={this.props.depts}
                            selectedOffice={this.state.selectedOffice}
                            selectedDept={this.state.selectedDept}
                            onOfficeChange={this.onOfficeChange}
                            onDeptChange={this.onDeptChange}
                            isRetainerType={true}
                            balance={this.state.retainer}
                            errors={this.state.errors}
                        />
                        <div className="row" style={{ paddingTop: "20px" }}>
                            <div className="col-md-3">
                                <label><b>Amount to be Refuned:</b></label>
                                <input type="text" className="form-control" value={this.state.amount} onChange={this.onAmountChange} />
                                {this.state.errors.amount && <div className="alert alert-danger">{this.state.errors.amount}</div>}
                            </div>
                            <div className="col-md-5">
                                <label><b>Payable To:</b></label>
                                <input type="text" className="form-control" value={this.state.payableTo} onChange={this.onPayableToChange} />
                                {this.state.errors.payableTo && <div className="alert alert-danger">{this.state.errors.payableTo}</div>}
                            </div>
                        </div>
                        <div className="row" style={{ paddingTop: "20px" }}>
                            <div className="col-md-8">
                                <label><b>Additional Information (if needed):</b></label>
                                <textarea className="form-control" value={this.state.additionalInfo} onChange={this.onAdditionInfoChange} />
                            </div>
                        </div>
                        <div style={{ paddingTop: "20px" }}>
                            <button className="btn btn-secondary" onClick={this.onBack} style={{ float: "right" }}>Cancel</button>
                            <button className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        employee: state.employee,
        username: state.username,
        matter: state.matter,
        client: state.client,
        offices: state.offices,
        depts: state.depts,
        retainer: state.retainer
    }
};

export default connect(mapStateToProps,
    {
        fetchEmployee,
        fetchMatter,
        fetchClient,
        fetchRetainer
    })(RetainerManaged);
