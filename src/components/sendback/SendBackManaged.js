import React from 'react';
import { connect } from 'react-redux';
import {
    fetchCheckRequest
} from '../../actions';
import SendBackIoltaManaged from './SendBackIoltaManaged';
import SendBackRetainerManaged from './SendBackRetainerManaged';

class SendBackManaged extends React.Component {
    state = {
        type: '',
        id: 0,
        checkrequest: {},
        errors: {},
        status: '',
        submitted: false
    };

    componentDidMount() {
        const id = this.props.match.params.id;

        this.props.fetchCheckRequest(id)
            .then((response) => {
                const data = JSON.parse(response.data);

                this.setState({
                    checkrequest: data,
                    type: response.checkRequestType,
                    id: id
                });
            });

    }

    render() {
        return (
            <div>
                <div>
                    <div hidden={this.state.type === 'retainer'}>
                        <SendBackIoltaManaged checkrequest={this.state.checkrequest} />
                    </div>
                    <div hidden={this.state.type === 'iolta'}>
                        <SendBackRetainerManaged checkrequest={this.state.checkrequest} />
                    </div>
                    <div style={{ padding: "20px" }}>
                        <div className="row">
                            <div className="col-md-8">
                                <label><b>AR Approval Response:</b></label>
                                <textarea className="form-control" value={this.state.checkrequest.arresponse}
                                   readOnly />
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
    }
};

export default connect(mapStateToProps,
    {
        fetchCheckRequest
    })(SendBackManaged);
