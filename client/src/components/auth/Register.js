import React, { Component } from "react";
import { Card, CardSubtitle, CardText, CardBody, CardTitle, Button } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/ActionCreators";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
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
                    <CardTitle><h2><b>Register</b> below</h2></CardTitle>
                    <CardSubtitle>
                      <h5>Already have an account? <Link to="/login">Log in</Link></h5>
                    </CardSubtitle>
                    <CardText>
                      <form noValidate onSubmit={this.onSubmit}>
                        <br/>
                        <div className="input-field col s12">
                          <label htmlFor="name">Name</label><br/>
                          <input
                            onChange={this.onChange}
                            value={this.state.name}
                            error={errors.name}
                            id="name"
                            type="text"
                            className={classnames("", {
                              invalid: errors.name
                            })}
                          />
                          {" "}<span className="text-danger">{errors.name}</span>
                        </div>
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
                              invalid: errors.email
                            })}
                          /> 
                          {" "}<span className="text-danger">{errors.email}</span>
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
                              invalid: errors.password
                            })}
                          />
                          {" "}<span className="text-danger">{errors.password}</span>
                        </div>
                        <br/>
                        <div className="input-field col s12">
                          <label htmlFor="password2">Confirm Password</label><br/>
                          <input
                            onChange={this.onChange}
                            value={this.state.password2}
                            error={errors.password2}
                            id="password2"
                            type="password"
                            className={classnames("", {
                              invalid: errors.password2
                            })}
                          />
                          {" "}<span className="text-danger">{errors.password2}</span>
                        </div>
                        <br/>
                        <br/>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                          <Button className="btn-info">Sign up</Button>
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
