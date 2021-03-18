import React from 'react';

export const MatterDetails = ({ client, matter, isRetainerType,
    balance, depts, offices, selectedOffice, selectedDept, onOfficeChange, onDeptChange,errors }) => {
    return (
        <div>
            <div className="row">
                <div className="col-md-4">
                    <b>Client Code:</b>&nbsp;&nbsp;{matter.clientCode}
                </div>
                <div className="col-md-4">
                    <b>Client Name:</b>&nbsp;&nbsp;{client.clientName}
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <b>Matter Code:</b>&nbsp;{matter.matterCode}
                </div>
                <div className="col-md-4">
                    <b>Matter Name:</b>&nbsp;{matter.matterName}
                </div>
            </div>
            <div className="row" style={{paddingBotton: "20px"}}>
                <div className="col-md-12" hidden={!isRetainerType}>
                        <b>Unapplied/Retainer Balance:</b>&nbsp;<div style={{color: "red", display:"inline"}}>{balance}</div>
                </div>
                <div className="col-md-12" hidden={isRetainerType}>
                        <b>Trust Balance:</b>&nbsp;<div style={{color: "red", display:"inline"}}>{balance}</div>
                </div>
            </div>
            <hr />
            <div className="row">
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