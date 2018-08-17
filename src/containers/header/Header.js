import React, {Component, Fragment} from 'react';
import {
    Collapse, Container, DropdownItem, DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown
} from "reactstrap";
import AuthenService from "../../services/AuthenService";
import UploadModal from "../upload/UploadModal";

class Header extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            isModalShown: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    _handleLogout() {
        const userInfo = AuthenService.get();
        AuthenService.set(null);
    }

    _handleOpenUpload() {
        this.setState({isModalShown: true});
    }

    _handleCloseUpload() {
        this.setState({isModalShown: false});
    }

    render() {
        const userInfo = AuthenService.get();

        const {isModalShown} = this.state;

        return (
            <div>
                <Navbar color="faded" light expand="md" fixed="top"
                        style={{
                            backgroundColor: 'white',
                            borderBottom: "1px solid rgba(0,0,0,.0975)"
                        }}
                >
                    <Container>
                        <NavbarBrand>Imager</NavbarBrand>
                        {
                            userInfo ? (
                                <Fragment>
                                    <NavbarToggler onClick={this.toggle}/>
                                    <Collapse isOpen={this.state.isOpen} navbar>
                                        <Nav navbar className="ml-auto">
                                            <NavItem>
                                                <NavLink
                                                    href="#"
                                                    active
                                                    onClick={this._handleOpenUpload.bind(this)}
                                                >Đăng ảnh</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    href="#"
                                                    onClick={this._handleLogout.bind(this)}
                                                >Thoát</NavLink>
                                            </NavItem>
                                        </Nav>
                                    </Collapse>
                                </Fragment>
                            ) : null
                        }
                    </Container>
                </Navbar>

                <UploadModal
                    isShown={isModalShown}
                    onClose={this._handleCloseUpload.bind(this)}
                />
            </div>
        )
    }
}

export default Header;
