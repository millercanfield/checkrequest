import React from 'react';
import { connect } from 'react-redux';
import {
    fetchRetainer,
    fetchClientArSummary
} from '../../actions';
import { MatterDetails } from '../common/MatterDetails';

class ApprovalRetainerManaged extends React.Component {
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
       
    };

    onDeptChange = (event) => {

        
    }

    onAttorneyChange = (event) => {

        
    }

    onIncludeAllMatters = () => {
        const showAllMatters = !this.state.showAllMatters;
        this.setState({ showAllMatters: showAllMatters });
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
                                <input type="number" className="form-control" value={this.state.amount} readOnly />
                            </div>
                            <div className="col-md-5">
                                <label><b>Payable To:</b></label>
                                <input type="text" className="form-control" value={this.state.payableTo} readOnly  />
                            </div>
                        </div>
                        <div className="row" style={{ paddingTop: "20px" }}>
                            <div className="col-md-8">
                                <label><b>Additional Information (if needed):</b></label>
                                <textarea className="form-control" value={this.state.additionalInfo} readOnly />
                            </div>
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
        fetchRetainer,
        fetchClientArSummary
    })(ApprovalRetainerManaged);
