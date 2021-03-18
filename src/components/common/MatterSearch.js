import React from 'react';

export class MatterSearch extends React.Component {
    state = { clientCode: '', matterCode: '' };

    onTextChange = (event) => {

        let fieldName = event.target.name;

        if (fieldName === "clientCode") {
            this.setState({ clientCode: event.target.value });
        }
        else {
            this.setState({ matterCode: event.target.value });
        }
    }

    onSearch = () => {
        this.props.onMatterSearch(this.state.clientCode, this.state.matterCode);
        this.setState({ clientCode: '', matterCode: '' });
    };

    render() {
        return (
            <div>
                <div className="row" style={{paddingBottom: "10px"}}>
                    <div className="col-md-12">
                    After providing client/matter codes, click continue
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <label><b>Client Code:</b></label>
                        <div className="field">
                            <input
                                type="text"
                                name="clientCode"
                                className="form-control"
                                placeholder=""
                                autoFocus
                                value={this.state.clientCode}
                                onChange={this.onTextChange}
                                disabled={false}
                                maxLength="10" />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <label><b>Matter Code:</b></label>
                        <div className="field">
                            <input
                                type="text"
                                name="matterCode"
                                className="form-control"
                                placeholder=""
                                value={this.state.matterCode}
                                onChange={this.onTextChange}
                                disabled={false}
                                maxLength="10" />
                        </div>
                    </div>
                    <div className="col-md-2" style={{ paddingTop: "30px" }}>
                        <input type="button" value="Continue" className="btn btn-primary" onClick={this.onSearch} />
                    </div>
                </div>
            </div>
        );
    }
};
