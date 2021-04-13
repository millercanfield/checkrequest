import React from 'react';
import { connect } from 'react-redux';
import {
    fetchTrust,
    fetchBills,
    fetchSplit,
    fetchClientArSummary
} from '../../actions';
import { MatterDetails } from '../common/MatterDetails';
import moment from 'moment';
import SplitDetail from '../iolta/SplitDetail';

class ApprovalIoltaManaged extends React.Component {
    state = {
        employee: {},
        matter: {},
        client: {},
        selectedDept: '',
        billingAttorney: {},
        selectedOffice: '',
        selectedAttorney: '',
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
        clientArSummary: [],
        balance: 0,
        showAllMatters: false
    }

    componentDidUpdate(prevProps) {
      
        if(prevProps.checkrequest !== this.props.checkrequest){
            
            this.setState({
                ...this.props.checkrequest
            }, this.getAR);
        }
    }

    getAR() {
        this.props.fetchClientArSummary(this.state.client.clientCode)
            .then(() => {
                this.props.fetchTrust(this.state.matter.matterUno)
                    .then(() => {

                        const formatter = new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',

                            // These options are needed to round to whole numbers if that's what you want.
                            //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
                            //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
                        });

                        this.setState({
                            trust: formatter.format(this.props.trust),
                            balance: this.props.trust,
                            clientArSummary: this.props.clientArSummary
                        });

                    });
            });
    }

    test() {
        console.log('state', this.state);
    }

    onIncludeAllMatters = () => {
        const showAllMatters = !this.state.showAllMatters;
        this.setState({ showAllMatters: showAllMatters });
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
                    <td><input type="checkbox" checked={selected} readOnly /></td>
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

    onAttorneyChange = (event) => {

    }

    onOfficeChange = (event) => {

    }

    onDeptChange = (event) => {

    }

    render() {

        return (
            <div>
                <h3>Check Request</h3>
                <div style={{ padding: "20px" }}>
                    <h4>IOLTA</h4>
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
                            onAttorneyChange={this.onAttorneyChange}
                            onOfficeChange={this.onOfficeChange}
                            onDeptChange={this.onDeptChange}
                            isRetainerType={false}
                            balance={this.state.trust}
                            errors={this.state.errors}
                            billingAttorney={this.state.billingAttorney}
                            clientArSummary={this.state.clientArSummary}
                            showAllMatters={this.state.showAllMatters}
                            onIncludeAllMatters={this.onIncludeAllMatters}
                        />
                        <div>
                            <div className="row" style={{ paddingTop: "20px" }}>
                                <div className="col-md-12"><b>Reason for Check Request:</b></div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <input type="radio" value="client" name="type" onChange={this.onTypeChange}
                                        checked={this.state.type === 'client'} readOnly /> Return of Trust Funds to Client
                            </div>
                                <div className="col-md-4">
                                    <input type="radio" value="miller" name="type" onChange={this.onTypeChange}
                                        checked={this.state.type === 'miller'} readOnly /> Payment to Miller Canfield (AR Bills)
                            </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <input type="radio" value="settlement" name="type" onChange={this.onTypeChange}
                                        checked={this.state.type === 'settlement'} readOnly /> Settlement Payment
                            </div>
                                <div className="col-md-4">
                                    <input type="radio" value="vendor" name="type" onChange={this.onTypeChange}
                                        checked={this.state.type === 'vendor'} readOnly /> Direct Payment to Vendor
                            </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <input type="radio" value="other" name="type" onChange={this.onTypeChange}
                                        checked={this.state.type === 'other'} readOnly /> Other
                            </div>
                            </div>
                            
                        </div>
                        <div hidden={!this.state.showBills} style={{ paddingTop: "10px" }}>
                            <label><b>Bills</b></label>
                            <div style={{ maxHeight: "400px", overflow: "auto" }}>
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
                                <input type="number" className="form-control" value={this.state.amount} readOnly />
                                
                            </div>
                            <div className="col-md-5">
                                <label><b>Payable To:</b></label>
                                <input type="text" className="form-control" value={this.state.payableTo} readOnly />
                                
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
        trust: state.trust,
        bills: state.bills,
        splitBillDetails: state.splitBillDetails,
        clientArSummary: state.clientArSummary,
        employees: state.employees,
    }
};

export default connect(mapStateToProps,
    {
        fetchTrust,
        fetchBills,
        fetchSplit,
        fetchClientArSummary
    })(ApprovalIoltaManaged);
