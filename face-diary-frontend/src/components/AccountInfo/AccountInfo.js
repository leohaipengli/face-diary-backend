import React, { Component } from 'react';
import './AccountInfo.css'

class AccountInfo extends Component {
    getEmail() {
        return this.props.email;
    }

    getUserName() {
        return this.props.userName;
    }

    render() {
        return (
            <form className="account-info">
                <fieldset disabled>
                    <div className="form-group">
                        <label htmlFor="disabledTextInput">Email/ID</label>
                        <input type="text" id="disabledTextInput" className="form-control account-ctrl" 
                            placeholder={this.getEmail()} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="disabledTextInput">User Name</label>
                        <input type="text" id="disabledTextInput" className="form-control account-ctrl" 
                            placeholder={this.getUserName()} />
                    </div>
                </fieldset>
            </form>
        );
    }
}

export default AccountInfo;
