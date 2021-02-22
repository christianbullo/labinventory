import React, { Component } from "react";
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron } from "reactstrap";
import { NavLink } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return (
            <React.Fragment>
                <Jumbotron fluid>
                    <div className="container text-white">
                        <div className="row">
                            <div className="col">
                            </div>
                            <div className="col">
                                <h1>Lab</h1>
                            </div>
                            <div className="col">
                            </div>
                            <div className="col">
                                <br />
                                <br />
                                <h2>Inventory</h2> 
                            </div>
                            <div className="col">
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Navbar dark sticky="top" expand="md">
                    <div className="container justify-content-center">
                        {/* <NavbarBrand className="mr-auto" href="/stats">
                            <i className="fa fa-bar-chart fa-lg">{' '}Stats</i> 
                        </NavbarBrand> */}
                        <NavbarToggler onClick={this.toggleNav} />   
                        <Collapse isOpen={this.state.isNavOpen} navbar className="justify-content-center">
                            <Nav navbar justified className="justify-content-center">                                
                                <NavItem>
                                    <NavLink className="nav-link" to="/register">
                                        <i className="fa fa-list-alt fa-lg">{' '}<span className="roboto">Signup</span></i>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/orders">
                                        <i className="fa fa-truck fa-lg">{' '}<span className="roboto">------------</span></i>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/login">
                                        <i className="fa fa-folder-open fa-lg">{' '}<span className="roboto">Login</span></i>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/outofstock">
                                        <i className="fa fa-folder fa-lg">{' '}<span className="roboto">------------</span></i>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/stats">
                                        <i className="fa fa-bar-chart fa-lg">{' '}<span className="roboto">---------</span></i>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse> 
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }
}

export default Header;