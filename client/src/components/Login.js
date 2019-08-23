import React, { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
    const [creds, setCreds] = useState({
        username: '',
        password: ''
    });

    const [loginStatus, setLoginStatus] = useState("");

    function handleChange(e) {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    }

    function login(e) {
        e.preventDefault();
        setLoginStatus('');
        axios
            .post(' http://localhost:5000/api/login', creds)
            .then(res => {
                console.log(res);
                localStorage.setItem('token', res.data.payload);
                setLoginStatus("Success! Check out these bubbles");
                setCreds({
                    username: '',
                    password: ''
                });
                props.history.push("/protected");
            })
            .catch(err => {
                console.log(err.response.data.error);
                setLoginStatus(`${err.response.data.error}`);
                setCreds({
                    username: '',
                    password: ''
                })
            });
    }

    // make a post request to retrieve a token from the api
    // when you have handled the token, navigate to the BubblePage route
    return (
        <div>
            <h1>We've got some amazing bubbles in here</h1>
            <h3>But... they're private.</h3>
            <br />
            <h4>so LOG IN!</h4>
            <br />
            <form onSubmit={login}>
                <label htmlFor="username">Username:
                <br />
                    <input
                        type="text"
                        name="username"
                        value={creds.username}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label htmlFor="password">Password:
                <br />
                    <input
                        type="password"
                        name="password"
                        value={creds.password}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button>Now show me the bubbles!!!</button>
                {loginStatus ? <p>{loginStatus}</p> : null}
            </form>
        </div>
    );
};

export default Login;
