import React from 'react';

export const MatterDetails = ({ client, matter, isRetainerType,
    balance, depts, offices, selectedOffice, selectedDept, onOfficeChange, onDeptChange, errors, selectedAttorney,
    onAttorneyChange, employees, billingAttorney, clientArSummary, showAllMatters, onIncludeAllMatters }) => {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    const getBalanceRows = () => {
        if (!showAllMatters) {
            const ar = clientArSummary.find(e => e.matterCode === matter.matterCode);
            if (ar) {
                return <tr>
                    <td>{`${client.clientCode}-${matter.matterCode}`}</td>
                    <td style={{ color: "red" }} hidden={isRetainerType}>{balance}</td>
                    <td style={{ color: "red" }} hidden={!isRetainerType}>{balance}</td>
                    <td>{formatter.format(ar.totalArBalance)}</td>
                    <td>{formatter.format(ar.feeWipBalance)}</td>
                    <td>{formatter.format(ar.disbWipBalance)}</td>
                </tr>
            }
            else {
                return <tr>
                    <td>{`${client.clientCode}-${matter.matterCode}`}</td>
                    <td style={{ color: "red" }} hidden={isRetainerType}>{balance}</td>
                    <td style={{ color: "red" }} hidden={!isRetainerType}>{balance}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            }
        }
        else {
            return clientArSummary.map((item) => {
                return (
                    <tr key={item.matterCode}>
                        <td>{`${item.clientCode}-${item.matterCode}`}</td>
                        <td style={{ color: "red" }} hidden={isRetainerType}>{formatter.format(item.trustBalance)}</td>
                        <td style={{ color: "red" }} hidden={!isRetainerType}>{formatter.format(item.retainerBalance)}</td>
                        <td>{formatter.format(item.totalArBalance)}</td>
                        <td>{formatter.format(item.feeWipBalance)}</td>
                        <td>{formatter.format(item.disbWipBalance)}</td>

                    </tr>
                )
            })
        }

    }

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <label><b>Client Matter:</b></label>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Client Code</th>
                                <th>Client Name</th>
                                <th>Matter Code</th>
                                <th>Matter Name</th>
                                <th>Billing Attorney</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{matter.clientCode}</td>
                                <td>{client.clientName}</td>
                                <td>{matter.matterCode}</td>
                                <td>{matter.matterName}</td>
                                <td>{billingAttorney.employeeName}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row" style={{ paddingBotton: "20px" }}>
                <div className="col-md-12">
                    <div>
                        <label><b>{showAllMatters ? `All Matter Balances for ${client.clientName}:` : 'Matter Balances:'}</b></label>
                        <button className="btn btn-link" onClick={() => onIncludeAllMatters()}>
                            {showAllMatters ? `Show Only ${client.clientCode}-${matter.matterCode}` : `Show All Matters for ${client.clientName}`}
                        </button>
                    </div>
                    <div style={{ maxHeight: "200px", overflow: "auto" }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'lightgrey', textAlign: "left" }}>Client Matter #</th>
                                    <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'lightgrey', textAlign: "left" }} hidden={isRetainerType}>Trust</th>
                                    <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'lightgrey', textAlign: "left" }} hidden={!isRetainerType}>Unapplied/Retainer</th>
                                    <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'lightgrey', textAlign: "left" }}>Total AR</th>
                                    <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'lightgrey', textAlign: "left" }}>Fees WIP</th>
                                    <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'lightgrey', textAlign: "left" }}>Disb WIP</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getBalanceRows()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-md-4">
                    <label><b>Attorney Requesting the Check Request:</b></label>
                    <select value={selectedAttorney} onChange={onAttorneyChange} className="form-control">
                        {
                            employees.map((employee) => {
                                return <option key={employee.employeeCode} value={employee.employeeCode}>{employee.employeeName}</option>
                            })
                        }
                    </select>
                    {errors.selectedAttorney && <div className="alert alert-danger">{errors.selectedAttorney}</div>}
                </div>
            </div>
            <div className="row" style={{ paddingTop: "20px" }}>
                <div className="col-md-4">
                    <label><b>Office:</b></label>
                    <select value={selectedOffice} onChange={onOfficeChange} className="form-control">
                        {
                            offices.map((office) => {
                                return <option key={office.value} value={office.value}>{office.label}</option>
                            })
                        }
                    </select>
                    {errors.selectedOffice && <div className="alert alert-danger">{errors.selectedOffice}</div>}
                </div>
                <div className="col-md-4">
                    <label><b>Department:</b></label>
                    <select value={selectedDept} onChange={onDeptChange} className="form-control">
                        {
                            depts.map((dept) => {
                                return <option key={dept.value} value={dept.value}>{dept.label}</option>
                            })
                        }
                    </select>
                    {errors.selectedDept && <div className="alert alert-danger">{errors.selectedDept}</div>}
                </div>
            </div>
        </div>
    )
};