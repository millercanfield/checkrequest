import React from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import {
    fetchEmployee,
    fetchMatter,
    fetchClient,
    fetchTrust,
    fetchBills,
    submitCheckRequest,
    fetchSplit
} from '../../actions';
import { MatterSearch } from '../common/MatterSearch';
import { MatterDetails } from '../common/MatterDetails';
import moment from 'moment';
import SplitDetail from './SplitDetail';

class IoltaManaged extends React.Component {
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

    test() {
        console.log('state', this.state);
    }

    onMatterSearch = (clientCode, matterCode) => {

        this.props.fetchMatter(clientCode, matterCode)
            .then(() => {

                if (this.props.matter.clientUno) {
                    this.props.fetchEmployee(this.props.username)
                        .then(() => {
                            this.props.fetchClient(this.props.matter.clientUno)
                                .then(() => {

                                    this.props.fetchTrust(this.props.matter.matterUno)
                                        .then(() => {

                                            const formatter = new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                              
                                                // These options are needed to round to whole numbers if that's what you want.
                                                //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
                                                //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
                                              });

                                            this.setState({
                                                employee: this.props.employee,
                                                matter: this.props.matter,
                                                client: this.props.client,
                                                selectedOffice: this.props.matter.offc,
                                                selectedDept: this.props.matter.dept,
                                                trust: formatter.format(this.props.trust),
                                                showError: false,
                                                balance: this.props.trust
                                            }, this.isValid);

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
        this.setState({ selectedOffice: event.target.value }, this.isValid);
    };

    onDeptChange = (event) => {

        this.setState({ selectedDept: event.target.value }, this.isValid);
    }

    onBack = () => {
        this.setState({
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
            showSplitDetail: false,
            balance: 0,

        });
    }

    updateSelectedValue = (value) => {
        const balance = this.state.balance - value
        this.setState({balance: balance});
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
        if (this.state.payableTo === '') {
            errors.payableTo = 'Payable To is required.'
            valid = false;
        }
        if (this.state.amount === '') {
            errors.amount = 'Amount is required.'
            valid = false;
        }
        if (this.state.selectedDept === '') {
            errors.selectedDept = 'Dept is required.'
            valid = false;
        }
        if (this.state.selectedOffice === '') {
            errors.selectedOffice = 'Office is required.'
            valid = false;
        }
        if (this.state.type === '') {
            errors.type = 'Reason is required.'
            valid = false;
        }

        this.setState({ errors: errors });
        return valid;
    }

    onTypeChange = (event) => {
        const type = event.target.value;

        if (type === 'miller') {
            this.props.fetchBills(this.state.client.clientCode, this.state.matter.matterCode)
                .then(() => {

                    this.setState({ type: type, showBills: type === 'miller' ? true : false, bills: this.props.bills }, this.isValid);
                })
        }
        else {
            this.setState({ type: type, showBills: type === 'miller' ? true : false }, this.isValid);
        }
    }

    onSubmit = () => {
        const valid = this.isValid();

        if (!valid) {
            return;
        }

        const data = JSON.stringify(this.state);

        this.props.submitCheckRequest('iolta', data)
            .then(() => {
                this.onBack();
                toastr.success('Successfully submitted form to AP')
            })
            .catch(error => {
                toastr.error(error);
            });
    }

    onBillSelectChange = (bill) => {
        let bills = Object.assign([], this.state.bills);

        for (var i = 0; i < bills.length; ++i) {
            if (bills[i].billNum === bill.billNum) {
                bills[i].selected = !(bills[i].selected)
                if(bills[i].selected){
                    this.updateSelectedValue(bill.tranTotalBilled);
                }
                else{
                    this.updateSelectedValue(bill.tranTotalBilled * -1);
                }
                break;
            }
        }

        this.setState({ bills: bills }, this.updateAmountToPay);
    }

    updateAmountToPay = () => {

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          
            // These options are needed to round to whole numbers if that's what you want.
            //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
          });

        let bills = Object.assign([], this.state.bills);
        let total = 0;
        for (var i = 0; i < bills.length; ++i) {
            if(bills[i].selected){
                total += bills[i].tranTotalBilled;
            }
        }

        if(total > this.props.trust){
            total = this.props.trust;
        }

        this.setState({amount: formatter.format(total)}, this.isValid);
    }

    onSplitClicked = () => {

        this.props.fetchSplit(this.state.matter.matterUno)
            .then(() => {
                this.setState({ splitBillDetails: this.props.splitBillDetails, showSplitDetail: true }, this.test);
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
                    <td><input type="checkbox" checked={selected} onChange={() => this.onBillSelectChange(bill)} disabled={!selected && this.state.balance <= 0 }/></td>
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

    onCloseSplitDetail = () => {
        this.setState({ showSplitDetail: false });
    };

    render() {

        return (
            <div>
                <h3>Check Request</h3>
                <div style={{ padding: "20px" }}>
                    <h4>IOLTA</h4>
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
                            isRetainerType={false}
                            balance={this.state.trust}
                            errors={this.state.errors}
                        />
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
        trust: state.trust,
        bills: state.bills,
        splitBillDetails: state.splitBillDetails
    }
};

export default connect(mapStateToProps,
    {
        fetchEmployee,
        fetchMatter,
        fetchClient,
        fetchTrust,
        fetchBills,
        submitCheckRequest,
        fetchSplit
    })(IoltaManaged);
