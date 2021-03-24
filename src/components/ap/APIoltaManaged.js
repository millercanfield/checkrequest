import React from 'react';
import { connect } from 'react-redux';
import { fetchCheckRequest, fetchSplit } from '../../actions/index';
import { MatterDetails } from '../common/MatterDetails';
import moment from 'moment';
import SplitDetail from '../iolta/SplitDetail';

const AREmail = "bruce@millercanfield.com";
const CFOEmail = "robson@millercanfield.com";

class APIoltaManaged extends React.Component {

    state = {
        employee: {},
        matter: {},
        client: {},
        selectedDept: '',
        selectedOffice: '',
        trust: '',
        showError: false,
        amount: '',
        payableTo: '',
        additionalInfo: '',
        errors: {},
        type: 'settlement',
        bills: [],
        showBills: false,
        splitBillDetails: [],
        balance: 0,

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
                    trust: data.trust,
                    showError: data.showError,
                    amount: data.amount,
                    payableTo: data.payableTo,
                    additionalInfo: data.additionalInfo,
                    errors: data.errors,
                    type: data.type,
                    bills: data.bills,
                    showBills: data.showBills,
                    splitBillDetails: data.splitBillDetails,
                    balance: data.balance,
                });
            });
    }

    onOfficeChange = (event) => {
        //no change allowed
    };

    onDeptChange = (event) => {

        //no change allowed
    }

    onTypeChange = (event) => {
        //no change allowed
    }

    onBillSelectChange = (bill) => {
        //no change allowed
    }

    onAdditionInfoChange = (event) => {
        //no change allowed
    }

    onAmountChange = (event) => {
        //no change allowed

    }

    onPayableToChange = (event) => {
        //no change allowed
    }

    onSplitClicked = () => {

        this.props.fetchSplit(this.state.matter.matterUno)
            .then(() => {
                this.setState({ splitBillDetails: this.props.splitBillDetails, showSplitDetail: true }, this.test);
            });

    }

    onCloseSplitDetail = () => {
        this.setState({ showSplitDetail: false });
    };

    onRenderSplitDetailRows = () => {
        if (this.state.splitBillDetails.length === 0) {
            return (
                <tr>
                    <td colSpan="12">
                        None found.
                    </td>
                </tr>
            )
        }

        return this.state.splitBillDetails.map((detail) => {
            const { clientCode, clientName, billGroupDesc, effectiveDate, expireDate, timePcnt, disbPcnt } = detail;
            return (
                <tr key={clientCode}>
                    <td align="right">{clientCode}</td>
                    <td>{clientName}</td>
                    <td>{billGroupDesc}</td>
                    <td align="right">{moment(effectiveDate).format('MM/DD/YYYY')}</td>
                    <td align="right">{moment(expireDate).format('MM/DD/YYYY')}</td>
                    <td align="right">{timePcnt}</td>
                    <td align="right">{disbPcnt}</td>
                </tr>
            )
        });
    }

    onRenderBillRows = () => {
        if (this.state.bills.length === 0) {
            return (
                <tr>
                    <td colSpan="12">
                        No outstanding AR bills found for this client matter
                    </td>
                </tr>
            )
        }
        return this.state.bills.map((bill) => {

            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',

                // These options are needed to round to whole numbers if that's what you want.
                //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
                //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
            });

            const { billNum, billTkpr, billTkprName, clientCode, clientName, matterCode,
                date, inCollections, period, totalAR,
                tranTotalBilled, selected, type } = bill;
            return (
                <tr key={billNum}>
                    <td><input type="checkbox" checked={selected} onChange={() => this.onBillSelectChange(bill)} /></td>
                    <td align="right">{billNum}</td>
                    <td>{
                        type === 'S' ? <div><button className='btn btn-link' onClick={this.onSplitClicked}>S</button></div> : type
                    }
                    </td>
                    <td align="right">{moment(date).format('MM/DD/YYYY')}</td>
                    <td align="right">{period}</td>
                    <td align="right">{billTkpr}</td>
                    <td>{billTkprName}</td>
                    <td align="right">{clientCode}</td>
                    <td>{clientName}</td>
                    <td align="right">{matterCode}</td>
                    <td align="right">{formatter.format(tranTotalBilled)}</td>
                    <td align="right">{formatter.format(totalAR)}</td>
                    <td>{inCollections}</td>
                </tr>
            );
        });
    }

    onRenderSplitDetailRows = () => {
        if (this.state.splitBillDetails.length === 0) {
            return (
                <tr>
                    <td colSpan="12">
                        None found.
                    </td>
                </tr>
            )
        }

        return this.state.splitBillDetails.map((detail) => {
            const { clientCode, clientName, billGroupDesc, effectiveDate, expireDate, timePcnt, disbPcnt } = detail;
            return (
                <tr key={clientCode}>
                    <td align="right">{clientCode}</td>
                    <td>{clientName}</td>
                    <td>{billGroupDesc}</td>
                    <td align="right">{moment(effectiveDate).format('MM/DD/YYYY')}</td>
                    <td align="right">{moment(expireDate).format('MM/DD/YYYY')}</td>
                    <td align="right">{timePcnt}</td>
                    <td align="right">{disbPcnt}</td>
                </tr>
            )
        });
    }

    noticeAR = () => {
        const body = this.getARBody();
        const href = `mailto:${AREmail}?subject=Check Request for IOLTA&body=${body}`;

        return href;
    }

    noticeCFO = () => {
        const body = this.getCFOBody();
        const href = `mailto:${CFOEmail}?subject=Check Request for IOLTA&body=${body}`;

        return href;
    }

    getARBody = () => {
        let text = `A check request for release of IOLTA funds was submitted by ${this.state.employee.employeeName} for the amount of ${this.state.amount} USD and payable to ${this.state.payableTo}.`;
        text += `\r\n\r\nClient Code: ${this.state.client.clientCode}   Client Name: ${this.state.client.clientName}`;
        text += `\r\nMatter Code: ${this.state.matter.matterCode}   Client Name: ${this.state.matter.matterName}`;
        text += `\r\nTrust Balance: ${this.state.trust} USD`
        text += `\r\n\r\nOffice: ${this.state.selectedOffice}    Dept: ${this.state.selectedDept}`;

        text += '\r\n\r\n Please let AP know if funds are available to release. Thanks you.'

        if(this.state.additionalInfo !== ''){
            text += `\r\n\r\nAdditional Information: ${this.state.additionalInfo}` 
        }

        return encodeURIComponent(text);
    }

    getCFOBody = () => {
        let text = `A check request for IOLTA funds was submitted by ${this.state.employee.employeeName} for the amount of ${this.state.amount} USD and payable to ${this.state.payableTo}.`;
        text += `\r\n\r\nClient Code: ${this.state.client.clientCode}   Client Name: ${this.state.client.clientName}`;
        text += `\r\nMatter Code: ${this.state.matter.matterCode}   Client Name: ${this.state.matter.matterName}`;
        text += `\r\nTrust Balance: ${this.state.trust} USD`
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
                    <h4>IOLTA</h4>
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
                            isRetainerType={false}
                            balance={this.state.trust}
                            errors={this.state.errors}
                        />
                    </div>
                    <div>
                        <div className="row" style={{ paddingTop: "20px" }}>
                            <div className="col-md-12"><b>Reason for Check Request:</b></div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <input type="radio" value="client" name="type" onChange={this.onTypeChange}
                                    checked={this.state.type === 'client'} /> Return of Trust Funds to Client
                            </div>
                            <div className="col-md-4">
                                <input type="radio" value="miller" name="type" onChange={this.onTypeChange}
                                    checked={this.state.type === 'miller'} /> Payment to Miller Canfield (AR Bills)
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <input type="radio" value="settlement" name="type" onChange={this.onTypeChange}
                                    checked={this.state.type === 'settlement'} /> Settlement Payment
                            </div>
                            <div className="col-md-4">
                                <input type="radio" value="vendor" name="type" onChange={this.onTypeChange}
                                    checked={this.state.type === 'vendor'} /> Direct Payment to Vendor
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <input type="radio" value="other" name="type" onChange={this.onTypeChange}
                                    checked={this.state.type === 'other'} /> Other
                            </div>
                        </div>
                        {this.state.errors.type && <div className="alert alert-danger">{this.state.errors.type}</div>}
                    </div>
                    <div hidden={!this.state.showBills} style={{ paddingTop: "10px" }}>
                        <label><b>Bills</b></label>
                        <div style={{ height: "400px", overflow: "auto" }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'lightgrey', textAlign: "left" }}>
                                            Select
                                            </th>
                                        <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'lightgrey', textAlign: "right" }}>
                                            Bill #
                                            </th>
                                        <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'lightgrey' }}>
                                            Type
                                            </th>
                                        <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'lightgrey', textAlign: "right" }}>
                                            Date
                                            </th>
                                        <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'lightgrey', textAlign: "right" }}>
                                            Period
                                            </th>
                                        <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'lightgrey', textAlign: "right" }}>
                                            Bill Tkpr
                                             </th>
                                        <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'lightgrey' }}>
                                            Bill Tkpr Name
                                            </th>
                                        <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'lightgrey', textAlign: "right" }}>
                                            Client Code
                                            </th>
                                        <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'lightgrey' }}>
                                            Client Name
                                            </th>
                                        <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'lightgrey', textAlign: "right" }}>
                                            Matter Code
                                            </th>
                                        <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'lightgrey', textAlign: "right" }}>
                                            Total Billed
                                            </th>
                                        <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'lightgrey', textAlign: "right" }}>
                                            Total AR
                                            </th>
                                        <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'lightgrey' }}>
                                            Collections
                                            </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.onRenderBillRows()}
                                </tbody>
                            </table>
                        </div>
                        <SplitDetail
                            showSplitDetail={this.state.showSplitDetail}
                            onRenderSplitDetailRows={this.onRenderSplitDetailRows}
                            onCloseSplitDetail={this.onCloseSplitDetail}
                        />
                    </div>
                    <div className="row" style={{ paddingTop: "20px" }}>
                        <div className="col-md-3">
                            <label><b>Amount to be Paid from Trust:</b></label>
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
                    <div className="row">
                    <div className="row" style={{paddingTop: "20px"}}>
                            <div className="col-md-12">
                                <a href={this.noticeCFO()}>Send Notice to CFO</a> &nbsp;&nbsp;
                                <a href={this.noticeAR()}>Send Notice to Donna Bruce</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

};

const mapStateToProps = (state) => {
    return {
        username: state.username,
        offices: state.offices,
        depts: state.depts,
        splitBillDetails: state.splitBillDetails
    }
};

export default connect(mapStateToProps,
    {
        fetchCheckRequest,
        fetchSplit
    })(APIoltaManaged);
