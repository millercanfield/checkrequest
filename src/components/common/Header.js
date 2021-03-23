import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faInfo, faHome} from '@fortawesome/free-solid-svg-icons'

const Header = ({ username}) => {
    return (
        <div id="header">
            <div className="bottomPadding">
                <img src="logo.png" alt="logo" className="logo" />
                <span className="greeting">Welcome {username}!</span>
            </div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{padding: "7px 7px 7px 27px"}}>
                <span className="navbar-brand" style={{paddingTop: "30px"}}>Check Request&nbsp;&nbsp;&nbsp;</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto topMenu">
                        <li className="nav-item active">
                            <NavLink to="/" activeClassName="active" exact replace>
                                <div className="iconColor">
                                    <FontAwesomeIcon icon={faHome} size="lg" />
                                    <div>
                                        Home
                                    </div>
                                </div>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about" activeClassName="active" exact replace >
                                <div className="iconColor">
                                    <FontAwesomeIcon icon={faInfo} size="lg" />
                                    <div>
                                        About
                                    </div>
                                </div>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/help" activeClassName="active" exact replace >
                                <div className="iconColor">
                                    <FontAwesomeIcon icon={faQuestion} size="lg" />
                                    <div>
                                        Help
                                    </div>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;
