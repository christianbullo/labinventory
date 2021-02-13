import React, { Component } from "react";
import { Card, CardSubtitle, CardText, CardBody, CardTitle, Button } from "reactstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/ActionCreators";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col"></div>
          <div className="col-sm-6 text-right">
            <br/>
            <Link to="/">
              <i class="fa fa-arrow-circle-left fa-lg">{" "}Back to info</i>
            </Link>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col-sm-6">
            <Card>
                <CardBody>
                    <CardTitle><h2><b>Login</b> below</h2></CardTitle>
                    <CardSubtitle>
                      <h5>Don't have an account? <Link to="/register">Register</Link></h5>
                    </CardSubtitle>
                    <CardText>
                      <form noValidate onSubmit={this.onSubmit}>
                        <br/>
                        <div className="input-field col s12">
                          <label htmlFor="email">Email</label><br/>
                          <input
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            id="email"
                            type="email"
                            className={classnames("", {
                              invalid: errors.email || errors.emailnotfound
                            })}
                          />                          
                          {" "}
                          <span className="text-danger">
                            {errors.email}
                            {errors.emailnotfound}
                          </span>
                        </div>
                        <br/>
                        <div className="input-field col s12">
                          <label htmlFor="password">Password</label><br/>  
                          <input
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            id="password"
                            type="password"
                            className={classnames("", {
                              invalid: errors.password || errors.passwordincorrect
                            })}
                          />
                          {" "}
                          <span className="text-danger">
                            {errors.password}
                            {errors.passwordincorrect}
                          </span>
                        </div>
                        <br/>
                        <br/>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                          <Button className="btn-info">Login</Button>
                        </div>
                      </form>
                    </CardText>
                </CardBody>
            </Card>
          </div>
          <div className="col"></div>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
