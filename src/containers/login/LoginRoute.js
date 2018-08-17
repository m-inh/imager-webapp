import React, {Component} from "react";
import {Container, Col, Form, FormGroup, Input, Label, Button, Row} from "reactstrap";
import AuthenService from "../../services/AuthenService";
import * as userApi from "../../api/user-api";

class LoginRoute extends Component {

    state = {
        username: '',
        password: '',
        error: '',
        isLoading: false
    };

    _handleInputChange(id, event) {
        const value = event.target.value;
        this.setState({
            [id]: value,
            error: ''
        });
    }

    async _handleLogin() {
        const {username, password} = this.state;
        if (!username || !password) {
            return alert('Vui lòng điền đầy đủ thông tin');
        }

        this.setState({isLoading: true});

        try {
            await userApi.login({username, password});
            AuthenService.set({username, password});
            this.props.history.replace('/');
        }
        catch(err) {
            alert(err.message);
        }

        this.setState({isLoading: false});
    }

    _handleRegister() {
        this.props.history.replace('/register');
    }

    render() {
        const {
            username,
            password,
            error,
            isLoading
        } = this.state;

        return (
            <Container className="page full-height">
                <Row
                    className='d-flex justify-content-center'
                >
                    <Col sm={4}>
                        <h3 style={{marginTop: 40}}>Đăng nhập</h3>
                        <Form className="mt-3">
                            <FormGroup>
                                <Label>Tên đăng nhập</Label>
                                <Input
                                    type='text'
                                    value={username}
                                    onChange={(event) => this._handleInputChange('username', event)}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Mật khẩu</Label>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(event) => this._handleInputChange('password', event)}
                                />
                            </FormGroup>

                            <p className='error-text'>{error}</p>

                            <Button
                                onClick={this._handleLogin.bind(this)}
                                color='secondary'
                                disabled={isLoading}
                            >Đăng nhập</Button>
                            <span> Hoặc </span>
                            <Button
                                outline
                                onClick={this._handleRegister.bind(this)}
                            >Đăng kí mới</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default LoginRoute;
