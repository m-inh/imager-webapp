import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import LoginRoute from "./login/LoginRoute";
import Header from "./header/Header";
import AuthenService from "../services/AuthenService";
import UploadService from "../services/UploadService";
import NotFoundRoute from "../commons/404/NotFoundRoute";
import RegisterRoute from "./register/RegisterRoute";
import TimelineRoute from "./timeline/TimelineRoute";

class Root extends Component {

    componentDidMount() {
        AuthenService.onChange(this, this.forceUpdate.bind(this));
        UploadService.onChange(this, this.forceUpdate.bind(this));
    }

    componentWillUnmount() {
        AuthenService.unChange(this);
        UploadService.unChange(this);
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>

                    <div>
                        <Switch>
                            <Route exact path="/" component={requireAuthen(TimelineRoute)}/>
                            <Route path="/login" component={requireUnAuthen(LoginRoute)}/>
                            <Route path="/register" component={requireUnAuthen(RegisterRoute)}/>
                            <Route exact path='/404' component={NotFoundRoute}/>

                            <Redirect to="/404"/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

const requireAuthen = (component) => (props) => {
    const userInfo = AuthenService.get();
    return userInfo ? React.createElement(component, props) : <Redirect to='/login'/>
};

const requireUnAuthen = (component) => (props) => {
    const userInfo = AuthenService.get();
    return !userInfo ? React.createElement(component, props) : <Redirect to={`/`}/>
};

export default Root;
