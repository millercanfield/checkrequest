import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faMoneyCheck, faMoneyCheckAlt} from '@fortawesome/free-solid-svg-icons'


const SideMenu = ({ menuname }) => {

    return (
        <div className="sidemenu">
            <div hidden={!(menuname === 'home')}>
                <NavLink to="/" activeClassName="active" exact replace>
                    <div className="iconSideMenuColor">
                        <FontAwesomeIcon icon={faHome} size="sm" />&nbsp;Home
                    </div>
                </NavLink>
                <hr />
                <div style={{ fontSize: "16px" }}>Check Request Types</div>
                <NavLink to="/iolta" activeClassName="active" exact replace>
                    <div className="iconSideMenuColor">
                        <FontAwesomeIcon icon={faMoneyCheck} size="sm" />&nbsp;IOLTA
                    </div>
                </NavLink>
                <NavLink to="/retainer" activeClassName="active" exact replace>
                    <div className="iconSideMenuColor">
                        <FontAwesomeIcon icon={faMoneyCheckAlt} size="sm" />&nbsp;Unapplied/Retainer Balance Refunds
                    </div>
                </NavLink>
            </div>
            <div hidden={!(menuname === 'about')}>
                <NavLink to="/" activeClassName="active" exact replace>
                    <div className="iconSideMenuColor">
                        <FontAwesomeIcon icon={faHome} size="sm" />&nbsp;Home
                    </div>
                </NavLink>
            </div>
            <div hidden={!(menuname === 'help')}>
                <NavLink to="/" activeClassName="active" exact replace>
                    <div className="iconSideMenuColor">
                        <FontAwesomeIcon icon={faHome} size="sm" />&nbsp;Home
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default SideMenu;