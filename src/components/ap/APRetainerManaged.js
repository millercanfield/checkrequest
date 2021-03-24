import React from 'react';
import { connect } from 'react-redux';
import { fetchCheckRequest } from '../../actions/index';
import { MatterDetails } from '../common/MatterDetails';

const AREmail = "bruce@millercanfield.com";
const CFOEmail = "robson@millercanfield.com";

class APRetainerManaged extends React.Component {

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

    componentDidMount() {
        const id = this.props.match.params.id;

        this.props.fetchCheckRequest(id)
            .then((response) => {
                const data = JSON.parse(response.data);
                this.setState({
                    employee: data.employee,
                    matter: data.matter,
                    client: data.client,
                    selectedDept: data.selectedDept,
                    selectedOffice: data.selectedOffice,
                    retainer: data.retainer,
                    showError: data.showError,
                    amount: data.amount,
                    payableTo: data.payableTo,
                    additionalInfo: data.additionalInfo,
                    errors: data.errors
                });
            });
    }

    onAdditionInfoChange = (event) => {
        // no change allowed
    }

    onAmountChange = (event) => {
        // no change allowed
    }

    onPayableToChange = (event) => {
        // no change allowed
    }

    onOfficeChange = (event) => {
        // on change allowed
    };

    onDeptChange = (event) => {

        // no change allowed
    }

    noticeAR = () => {
        const body = this.getARBody();
        const href = `mailto:${AREmail}?subject=Check Request for Unapplied/Retainer Balance Refunds&body=${body}`;

        return href;
    }

    noticeCFO = () => {
        const body = this.getCFOBody();
        const href = `mailto:${CFOEmail}?subject=Check Request for Unapplied/Retainer Balance Refunds&body=${body}`;

        return href;
    }

    getARBody = () => {
        let text = `A check request was submitted by ${this.state.employee.employeeName} for the amount of ${this.state.amount} USD and payable to ${this.state.payableTo}.`;
        text += `\r\n\r\nClient Code: ${this.state.client.clientCode}   Client Name: ${this.state.client.clientName}`;
        text += `\r\nMatter Code: ${this.state.matter.matterCode}   Client Name: ${this.state.matter.matterName}`;
        text += `\r\nUnapplied/Retainer Balance: ${this.state.retainer} USD`
        text += `\r\n\r\nOffice: ${this.state.selectedOffice}    Dept: ${this.state.selectedDept}`;

        text += '\r\n\r\n Please let AP know if funds are available to release. Thanks you.'

        if(this.state.additionalInfo !== ''){
            text += `\r\n\r\nAdditional Information: ${this.state.additionalInfo}` 
        }

        return encodeURIComponent(text);
    }

    getCFOBody = () => {
        let text = `A check request was submitted by ${this.state.employee.employeeName} for the amount of ${this.state.amount} USD and payable to ${this.state.payableTo}.`;
        text += `\r\n\r\nClient Code: ${this.state.client.clientCode}   Client Name: ${this.state.client.clientName}`;
        text += `\r\nMatter Code: ${this.state.matter.matterCode}   Client Name: ${this.state.matter.matterName}`;
        text += `\r\nUnapplied/Retainer Balance: ${this.state.retainer} USD`
        text += `\r\n\r\nOffice: ${this.state.selectedOffice}    Dept: ${this.state.selectedDept}`;

        if(this.state.additionalInfo !== ''){
            text += `\r\n\r\nAdditional Information: ${this.state.additionalInfo}` 
        }

        return encodeURIComponent(text);
    }

    render() {
        return (
            <div>
                <h3>Check Request</h3>
                <div style={{ padding: "20px" }}>
                    <h4>Unapplied/Retainer Balance Refunds</h4>
                    <p>A check request was submitted by {this.state.employee.employeeName}</p>
                    <div style={{ paddingTop: "20px" }}>
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
                        <div className="row" style={{paddingTop: "20px"}}>
                            <div className="col-md-12">
                                <a href={this.noticeCFO()}>Send Notice to CFO</a> &nbsp;&nbsp;
                                <a href={this.noticeAR()}>Send Notice to Donna Bruce</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.username,
        offices: state.offices,
        depts: state.depts
    }
};

export default connect(mapStateToProps,
    {
        fetchCheckRequest
    })(APRetainerManaged);
