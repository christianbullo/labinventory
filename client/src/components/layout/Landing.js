import React, { Component } from "react";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
              <div className="col">
                  <br/>
                  <br/>
              </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="col"></div>
            <div className="col-md-8">
                <Card>
                  <CardBody>
                    <CardTitle>
                    <h2>
                      <b>Demo version </b> of the inventory application
                    </h2>
                    </CardTitle>
                    <CardText>
                      <p className="flow-text grey-text text-darken-1">
                        Access via web and through your browser start managing your inventory
                      </p>
                      <h4><a href="https://github.com/christianbullo/inventoryapp/blob/master/README.md" target="_blank" class="text-info"><i class="fa fa-github"></i> Read me</a></h4>
                      <br />
                      <br />
                    </CardText>
                    <div className="row">
                      <div className="col s6">
                        <Link
                          to="/register"
                          style={{
                            width: "140px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px"
                          }}
                          className="btn btn-large btn-outline-info"
                        >
                          Register
                        </Link>
                      </div>
                      <div />
                      <div className="col s6">
                        <Link
                          to="/login"
                          style={{
                            width: "140px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px"
                          }}
                          className="btn btn-large btn-outline-info"
                        >
                          Log in 
                        </Link>
                      </div>
                    </div>
                    {/* <CardText>
                      <br />
                      <p className="flow-text grey-text text-darken-1">
                        Access via web and through your browser start managing your inventory.
                      </p>
                    </CardText> */}
                  </CardBody>  
                </Card>
            </div>
            <div className="col"></div>
          </div>
          <div className="row">
              <div className="col">
                  <br/>
                  <br/>
              </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Landing;
