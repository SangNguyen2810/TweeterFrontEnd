import React from 'react'
import '../styles/Login.scss'
import { ToastContainer, toast, Slide } from 'react-toastify'
import logo from "../styles/twitter.png"
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import LoadingComponent from '../components/Loading'
import * as actions from '../actions/authActions';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types'
import classnames from 'classnames';
import axios from 'axios';
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: {}
        };
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submit = (e) => {
        e.preventDefault();

        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };

        this.props.registerUser(user, this.props.history);

    }
    render() {
        const { errors } = this.state;

        if (this.props.isLoading) {
            return <LoadingComponent />
        }
        else
            return (
                <div className="register">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5 m-auto">
                                <h1 className="display-4 text-center">Register</h1>
                                <form noValidate onSubmit={(e) => this.submit(e)}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className={classnames('form-control form-control-lg', {
                                                'is-invalid': errors.username
                                            })}
                                            placeholder="Name"
                                            name="username"
                                            value={this.state.username}
                                            onChange={(e) => this.onChange(e)}
                                        />
                                        {errors.username && (
                                            <div className="invalid-feedback">{errors.username}</div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className={classnames('form-control form-control-lg', {
                                                'is-invalid': errors.email
                                            })}
                                            placeholder="Email Address"
                                            name="email"
                                            value={this.state.email}
                                            onChange={(e) => this.onChange(e)}
                                        />
                                        {errors.email && (
                                            <div className="invalid-feedback">{errors.email}</div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className={classnames('form-control form-control-lg', {
                                                'is-invalid': errors.password
                                            })}
                                            placeholder="Password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={(e) => this.onChange(e)}
                                        />
                                        {errors.password && (
                                            <div className="invalid-feedback">{errors.password}</div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className={classnames('form-control form-control-lg', {
                                                'is-invalid': errors.confirmPassword
                                            })}
                                            placeholder="Confirm Password"
                                            name="confirmPassword"
                                            value={this.state.confirmPassword}
                                            onChange={(e) => this.onChange(e)}
                                        />
                                        {errors.confirmPassword && (
                                            <div className="invalid-feedback">{errors.confirmPassword}</div>
                                        )}
                                    </div>
                                    <input type="submit" className="btn btn-info btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
    return {
        isLoading: state.loading,
        auth: state.auth,
        errors: state.errors
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        loading: (loadingStatus) => dispatch(actions.isLoading(loadingStatus)),
        registerUser: (user, history) => dispatch(actions.registerUser(user, history))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));