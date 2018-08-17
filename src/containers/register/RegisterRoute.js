import React, {Component} from "react";
import {Container, Col, Form, FormGroup, Input, Label, Button, Row, FormText, CustomInput} from "reactstrap";
import AuthenService from "../../services/AuthenService";
import * as userApi from "../../api/user-api";

class RegisterRoute extends Component {

    state = {
        username: '',
        gender: '',
        password: '',
        re_password: '',
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

    _handleOptionChange(name, value) {
        this.setState({
            [name]: value
        });
    }

    _handleLogin() {
        this.props.history.replace('/login');
    }

    async _handleRegister() {
        const {username, gender, password, re_password} = this.state;
        if (password !== re_password) {
            return alert('Mật khẩu không khớp');
        }

        this.setState({isLoading: true});
        try {
            const userData = await userApi.register({username, password, gender});
            this.setState({isLoading: false});
            this.props.history.replace('/login');
        }
        catch (err) {
            alert(err.message);
            this.setState({isLoading: false});
        }
    }

    render() {
        const {
            username,
            gender,
            password,
            re_password,
            error,
            isLoading
        } = this.state;

        return (
            <div className="full-height page">
                <Container>
                    <Row
                        className='d-flex justify-content-center'
                        style={{paddingTop: 40}}
                    >
                        <Col sm={4} className=''>
                            <h3>Đăng kí</h3>
                            <Form className="mt-3">
                                <FormGroup>
                                    <Label>Tên đăng nhập</Label>
                                    <Input
                                        type='text'
                                        value={username}
                                        onChange={(event) => this._handleInputChange('username', event)}
                                    />
                                    <FormText>Chỉ chứa chữ cái thường và số</FormText>
                                </FormGroup>

                                <FormGroup>
                                    <Label>Giới tính</Label>
                                    <div>
                                        <CustomInput type="radio" name="customRadio" label="Nam" id="male"
                                                     value={gender}
                                                     onChange={() => this._handleOptionChange('gender', "male")}
                                        />
                                        <CustomInput type="radio" name="customRadio" label="Nữ" id="female"
                                                     value={gender}
                                                     onChange={() => this._handleOptionChange('gender', "female")}
                                        />
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <Label>Mật khẩu</Label>
                                    <Input
                                        type="password"
                                        value={password}
                                        onChange={(event) => this._handleInputChange('password', event)}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Nhập lại mật khẩu</Label>
                                    <Input
                                        type="password"
                                        value={re_password}
                                        onChange={(event) => this._handleInputChange('re_password', event)}
                                    />
                                </FormGroup>

                                <p className='error-text'>{error}</p>

                                <Button
                                    onClick={this._handleRegister.bind(this)}
                                    color='secondary'
                                    disabled={isLoading}
                                >Đăng kí</Button>
                                <span> Hoặc </span>
                                <Button
                                    outline
                                    onClick={this._handleLogin.bind(this)}
                                >Đăng nhập ngay</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default RegisterRoute;
