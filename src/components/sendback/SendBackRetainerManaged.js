import React from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import {
    submitCheckRequest,
    fetchRetainer,
    fetchClientArSummary
} from '../../actions';
import { MatterDetails } from '../common/MatterDetails';

class SendBackRetainerManaged extends React.Component {
    state = {
        employee: {},
        matter: {},
        client: {},
        selectedDept: '',
        selectedOffice: '',
        selectedAttorney: '',
        retainer: '',
        showError: false,
        amount: '',
        payableTo: '',
        additionalInfo: '',
        errors: {},
        clientArSummary: [],
        balance: 0,
        showAllMatters: false,
        billingAttorney: {}
    }

    componentDidUpdate(prevProps) {
        if(prevProps.checkrequest !== this.props.checkrequest){
           
            this.setState({
                ...this.props.checkrequest
            }, this.getAR);
        }
    }

    getAR = () => {
        this.props.fetchClientArSummary(this.state.client.clientCode)
        .then(() => {
            this.props.fetchRetainer(this.state.matter.matterUno)
                .then(() => {

                    this.setState({
                        retainer: this.props.retainer,
                        clientArSummary: this.props.clientArSummary
                        });

                });
        });
    };

    test() {
        //console.log('state', this.state);
    }

    onOfficeChange = (event) => {
        console.log(event.target.value);
        this.setState({ selectedOffice: event.target.value }, this.isValid);
    };

    onDeptChange = (event) => {

        console.log(event.target.value);
        this.setState({ selectedDept: event.target.value }, this.isValid);
    }

    onAttorneyChange = (event) => {

        this.setState({ selectedAttorney: event.target.value }, this.isValid);
    }

    onIncludeAllMatters = () => {
        const showAllMatters = !this.state.showAllMatters;
        this.setState({ showAllMatters: showAllMatters });
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

        if (this.state.retainer === '$0.00') {
            errors.noretainerbalance = 'This matter does not have an unapplied/retainer balance. ';
            valid = false;
        }
       
        if (this.state.additionalInfo === '' && this.state.retainer !== '$0.00') {
            let ar = 0;
            for (var i = 0; i < this.state.clientArSummary.length; ++i) {
                ar += this.state.clientArSummary[i].totalArBalance;
            }

            if (ar > 0) {
                errors.additionalInfo = 'This client has an AR balance.  Please explain why the firm should not use the unapplied/retainer balance to pay the AR balance before releasing any funds.'
            }
        }

        this.setState({errors: errors});
        return valid;
    }

    onSubmit = () => {
        const valid = this.isValid();

        if(!valid){
            return;
        }

        const data = JSON.stringify(this.state);

        const params = {
            formData: data,
            type: 'retainer',
            clientCode: this.state.client.clientCode,
            clientName: this.state.client.clientName,
            matterCode: this.state.matter.matterCode,
            matterName: this.state.matter.matterName

        }

        this.props.submitCheckRequest(params)
            .then(() => {
                toastr.success('Successfully submitted form to Client Accounting Manager')
            })
            .catch(error => {
                toastr.error('Error submitting form to Client Accounting Manager.');
            });
    }

    render() {

        return (
            <div>
                <h3>Check Request</h3>
                <div style={{ padding: "20px" }}>
                    <h4>Unapplied/Retainer Balance Refunds</h4>
                    <div hidden={!this.state.matter.matterCode} style={{ paddingTop: "20px" }}>
                        <MatterDetails
                            client={this.state.client}
                            matter={this.state.matter}
                            offices={this.props.offices}
                            employees={this.props.employees}
                            depts={this.props.depts}
                            selectedOffice={this.state.selectedOffice}
                            selectedDept={this.state.selectedDept}
                            selectedAttorney={this.state.selectedAttorney}
                            onOfficeChange={this.onOfficeChange}
                            onDeptChange={this.onDeptChange}
                            isRetainerType={true}
                            balance={this.state.retainer}
                            errors={this.state.errors}
                            billingAttorney={this.state.billingAttorney}
                            clientArSummary={this.state.clientArSummary}
                            showAllMatters={this.state.showAllMatters}
                            onIncludeAllMatters={this.onIncludeAllMatters}
                            onAttorneyChange={this.onAttorneyChange}
                        />
                        <div className="row" style={{ paddingTop: "20px" }}>
                            <div className="col-md-3">
                                <label><b>Amount to be Refunded:</b></label>
                                <input type="number" className="form-control" value={this.state.amount} onChange={this.onAmountChange} />
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
                                {this.state.errors.additionalInfo && <div className="alert alert-danger">{this.state.errors.additionalInfo}</div>}
                            </div>
                        </div>
                        {this.state.errors.noretainerbalance && <div className="alert alert-danger">{this.state.errors.noretainerbalance}</div>}
                        <div style={{ paddingTop: "20px" }}>
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
        username: state.username,
        offices: state.offices,
        depts: state.depts,
        retainer: state.retainer,
        clientArSummary: state.clientArSummary,
        employees: state.employees,
        
    }
};

export default connect(mapStateToProps,
    {
        submitCheckRequest,
        fetchRetainer,
        fetchClientArSummary
    })(SendBackRetainerManaged);
