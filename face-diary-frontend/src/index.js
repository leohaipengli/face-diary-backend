import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'font-awesome/css/font-awesome.min.css';
import App from './components/App/App';
import DiaryPage from './components/DiaryPage/DiaryPage'
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import registerServiceWorker from './registerServiceWorker';
import Logn_with_fb from './components/Login/Logn_with_fb';


ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/diarypage/:id" component={DiaryPage} />
            <Route path="/login_with_fb" component={Logn_with_fb} />
            <Route path="/" component={App} />            
        </Switch>
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
