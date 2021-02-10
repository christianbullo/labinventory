import React, { Component } from "react";
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron, Button } from "reactstrap";
import { NavLink } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {

        const { user } = this.props.auth; 

        return (
            <React.Fragment>
                <Jumbotron fluid>
                    <div className="container text-light">
                        <div class="row">
                            <div class="col">
                            </div>
                            <div class="col-6">
                                <br />
                                <br />
                                <br />
                                <h1>LAB</h1>
                            </div>
                            <div class="col">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-4">
                            </div>
                            <div class="col-sm-5">
                                <h2>INVENTORY</h2>
                            </div>
                            <div class="col">
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Navbar dark sticky="top" expand="md">
                    <div className="container justify-content-between">
                        <NavbarBrand className="ml-0 mr-sm-2">
                                <NavLink className="nav-link" to="/">
                                    <i className="fa fa-home fa-lg"></i>
                                </NavLink>
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggleNav} />   
                        <Collapse isOpen={this.state.isNavOpen} navbar className="justify-content-center">                  
                            { this.props.auth.isAuthenticated === true ? 
                                (
                                    <Nav navbar justified className="justify-content-between">                                 
                                        <NavItem>
                                            <NavLink className="nav-link" to="/requests">
                                                <i className="fa fa-list-alt fa-lg">{' '}<span className="menu">Requests Board</span></i>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link" to="/orders">
                                                <i className="fa fa-truck fa-lg">{' '}<span className="menu">Incoming Orders</span></i>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link" to="/instock">
                                                <i className="fa fa-folder-open fa-lg">{' '}<span className="menu">In stock</span></i>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link" to="/outofstock">
                                                <i className="fa fa-folder fa-lg">{' '}<span className="menu">Out of stock</span></i>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link" to="/stats">
                                                <i className="fa fa-bar-chart fa-lg">{' '}<span className="menu">Stats</span></i>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <Button outline className="text-dark ml-3" onClick={this.onLogoutClick}>
                                                <i class="fa fa-sign-out">{' '}<span className="menu">Logout user: {user.name}</span></i> 
                                            </Button>
                                        </NavItem>
                                    </Nav>
                                ) 
                                : 
                                (
                                    <Nav navbar justified className="justify-content-end">                                 
                                        <NavItem>
                                            <NavLink className="nav-link" to="/register">
                                                <i className="fa fa-user-plus fa-lg">{' '}<span className="menu">Signup</span></i>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link" to="/login">
                                                <i className="fa fa-sign-in fa-lg">{' '}<span className="menu">Login</span></i>
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                )
                            }
                        </Collapse> 
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }
}

export default Header;