import React from 'react'
import Dashboard from './pages/Dashboard'
import Customer from './pages/Customer'
import Supplier from './pages/Supplier'
import Products from './pages/Products'
import Login from './pages/Login'
import Error from './pages/Error'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Ingredients from './pages/Ingredients'
const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Dashboard}/>
                <Route exact path='/products' component={Products}/>
                <Route exact path='/ingredients' component={Ingredients}/>
                <Route exact path='/supplier' component={Supplier}/>
                <Route exact path='/customer' component={Customer}/>
                <Route exact path='/login' component={Login}/>
                <Route path='*' component={Error}/>
            </Switch>
        </Router>
    )
}
export default AppRouter