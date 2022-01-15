import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

import { Link as RouterLink, Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Users from './pages/Users'
import Dashboard from './pages/Dashboard'
import { ROLE } from './features/auth/auth'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectCurrentUser, selectIsAuthenticated } from './features/auth/authSlice'

import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Login from './pages/Login';
import Register from './pages/Register';


function Header() {
    const dispatch = useDispatch()
    const user = useSelector(selectCurrentUser)
    const isAuthenticated = useSelector(selectIsAuthenticated)

    const handleLogout = () => {
        dispatch(logout())
    }

    React.useEffect(() => {
        fetch("/api/test/all")
            .then((res) => console.log(res))
            .then((data) => console.log(data));
    }, []);

    return (
        <nav className="header-wrapper">
            <div className="header">
                <div className="header-logo">Register/Login Example</div>
                <div className="header-nav">
                    <Link component={RouterLink} to="/login">
                        Login
                    </Link>

                    <Link component={RouterLink} to="/register">
                        Register
                    </Link>

                    <RouterLink className="link" to="/dashboard">
                        Dashboard
                    </RouterLink>
                    <RouterLink className="link" to="/users">
                        Users
                    </RouterLink>
                    
                </div>

                {isAuthenticated && (
                    <div className="header-info">
                        <span>
                            Name:{user?.username} {user?.id}
                        </span>
                        <span>Role:{user?.roles}</span>
                        <a className="link" onClick={handleLogout}>
                            Logout
                        </a>
                    </div>
                )}
            </div>
        </nav>
    )
}

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
                <Route
                    path="dashboard"
                    element={<PrivateRoute roles={[ROLE.ADMIN]} component={Dashboard} />}
                />
                <Route
                    path="users"
                    element={<PrivateRoute roles={[ROLE.ADMIN, ROLE.USER]} component={Users} />}
                />
            </Routes>
        </div>

    )
}

export default App

