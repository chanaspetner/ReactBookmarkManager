import React, { Component } from 'react';
import { Route } from 'react-router';
import { AuthContextComponent } from './AuthContext';
import Layout from './Components/Layout';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Logout from './Pages/Logout';
import MyBookmarks from './Pages/MyBookmarks';
import AddBookmark from './Pages/AddBookmark';
import PrivateRoute from './Components/PrivateRoute';


export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <AuthContextComponent>
        <Layout>
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/logout' component={Logout} />
          <PrivateRoute exact path='/my-bookmarks' component={MyBookmarks} />
          <PrivateRoute exact path='/add-bookmark' component={AddBookmark} />

        </Layout>
      </AuthContextComponent>
    );
  }
}