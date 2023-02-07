import React from 'react';
import { useAuthContext } from '../AuthContext';
import Login from '../Pages/Login';
import { Route } from 'react-router';

const PrivateRoute = ({ component, ...options }) => {
    const { user } = useAuthContext();
    const finalComponent = !!user ? component : Login;
    return <Route {...options} component={finalComponent} />;
}

export default PrivateRoute;