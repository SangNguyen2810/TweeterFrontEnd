import React, { Component } from 'react';
import "../styles/navbar.scss"
import logo from "../styles/twitter.png"
import defaultAvatar from "../styles/default.png"
import { withRouter } from 'react-router-dom'
import * as actions from '../actions/authActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
class Navbar extends Component {
    constructor(props) {
        super(props);
    }
    register = () => {
        this.props.history.push('/register');
    }
    login = () => {
        this.props.history.push('/login');
    }
    logout = (user) => {
        this.props.logoutUser(user);
    }
    renderUserLogging = (isAuthenticated, user) => {
        if (isAuthenticated) {
            return (
                <ul className="navbar-nav ml-auto navbarCustom">
                    <li className="nav-item">
                        <a className="nav-link navbarCustom__link" onClick={() => this.logout(user)}>
                            <img className="rounded-circle avatar" src={defaultAvatar}></img>
                            Log Out
                        </a>


                    </li>

                </ul>
            )
        }
        else {
            return (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="btn nav-link" onClick={() => this.register()}>
                            Register
                    </a>
                    </li>
                    <li className="nav-item">
                        <a className="btn nav-link" onClick={() => this.login()}>
                            Login
                    </a>
                    </li>
                </ul>
            )
        }
    }
    render() {
        const { isAuthenticated, user } = this.props.auth;
        let logging = this.renderUserLogging(isAuthenticated, user);
        return (
            <nav className="navbar navbar-expand-sm navbar-dark mb-4 mainNavbar">
                <div className="container">
                    <img className="mainNavbar__logo" src={logo} />
                    <a className="navbar-brand" href="landing.html">
                    Tweeter
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#mobile-nav"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="profiles.html">
                                    {' '}
                                    Zalora
                                </a>
                            </li>
                        </ul>

                        {logging}
                    </div>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    // logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        loading: (loadingStatus) => dispatch(actions.isLoading(loadingStatus)),
        loginUser: (user) => dispatch(actions.loginUser(user)),
        logoutUser: (user) => dispatch(actions.logoutUser(user))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));