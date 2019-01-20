import React from 'react'
import '../styles/Login.scss'
import { ToastContainer, toast, Slide } from 'react-toastify'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import LoadingComponent from '../components/Loading'
import * as actions from '../actions/authActions';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types'
import classnames from 'classnames';
import axios from 'axios';
class Login extends React.Component {
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
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
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
            password: this.state.password
        };

        this.props.loginUser(user);
        
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
                                <h1 className="display-4 text-center">Login</h1>
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
                                    <input type="submit" className="btn btn-info btn-block mt-4" />

                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
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
        loginUser: (user) => dispatch(actions.loginUser(user))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));