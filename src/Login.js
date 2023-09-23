import React, { useState } from 'react';
import { Utils } from './Utils';

export function Login(props) {
    const [user, setUser] = useState({});

    const handleSubmit = () => {
        let success = Utils.auth(user.userName, user.pwd);
        localStorage.setItem("success",success);
        props.authenticate(success);
    }

    const handleChange = (e) => {
        let value = e.target[e.target.type === "checkbox" ? "checked" : "value"];
        let name = e.target.id;
        setUser({ ...user, [name]: value });
    }
    return (
        <div className="login-page">
            <div className="card card-primary card-outline" style={{opacity: '0.7', width: '25%', minWidth: '250px'}}>
                <div className="card-header">
                    <h3 className="card-title">Acesso Restrito</h3>
                </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="text" className="form-control" id="userName" placeholder="Enter User" onChange={handleChange} value={user.userName || ""} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" id="pwd" placeholder="Password" onChange={handleChange} value={user.pwd || ""} />
                        </div>
                    </div>
                    <div className="card-footer">
                        <button type="button" className="btn btn-primary float-right" onClick={handleSubmit}>Entrar</button>
                    </div>
            </div>
        </div >

    );
}

export default Login;