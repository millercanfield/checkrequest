import React from 'react';
import Draggable from 'react-draggable';

const SplitDetail = ({ showSplitDetail, onRenderSplitDetailRows, onCloseSplitDetail }) => {

    return (
        <Draggable>
            <div hidden={!showSplitDetail} style={{
                position: "absolute", left: "200px", top: "100px",
                backgroundColor: 'lightgray', width: "800px"
            }} className="shadow-lg p-3 mb-5 bg-white rounded">
                <div style={{float: "right", fontSize:"16px"}}>
                    <button className="btn btn-link" onClick={onCloseSplitDetail} style={{textDecoration:"none"}}>&#10006;</button>
                </div>
                <div style={{ marginTop: "10px", marginLeft: "10px" }}>
                    <label style={{ fontSize: "18px" }}><b>Split Bill Details</b></label>
                </div>
                <div>
                    <div style={{
                        backgroundColor: "lightgray", maxHeight: "400px",
                        overflow: "auto"
                    }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'grey', textAlign: "right" }}>
                                        Client Code
                                            </th>
                                    <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'grey', textAlign: "left" }}>
                                        Client Name
                                            </th>
                                    <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'grey', textAlign: "left" }}>
                                        Bill Group Desc
                                            </th>
                                    <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'grey', textAlign: "right" }}>
                                        Effective Date
                                            </th>
                                    <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'grey', textAlign: "right" }}>
                                        Expired Date
                                            </th>
                                    <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'grey', textAlign: "right" }}>
                                        Fee %age
                                            </th>
                                    <th style={{ position: "sticky", top: "0", left: "0", backgroundColor: 'grey', textAlign: "right" }}>
                                        Disb %age
                                            </th>
                                </tr>
                            </thead>
                            <tbody>
                                {onRenderSplitDetailRows()}
                            </tbody>
                        </table>
                    </div>
                    <div style={{textAlign:"center", paddingTop:"20px"}}>
                        <button className="btn btn-secondary" 
                            onClick={onCloseSplitDetail}>Close</button>
                    </div>
                </div>
            </div>
        </Draggable>
    )

}

export default SplitDetail;