import React from 'react'
import { Switch, Route }  from 'react-router-dom';


import Home from '../pages/Home'
import Cadastro from '../pages/Cadastro'
import Login from '../pages/Login'
import SEGUNDATELAADM from '../pages/TESTETELA2'

import Dashboard from '../pages/Dashboard'
import DashboardMod from '../pages/DashboardMod'

import PrivateRouteADM from './PrivateRouteADM'
import PrivateRouteMOD from './PrivateRouteMOD'

export default function Routes(){
    return(
        <Switch>
            <Route path="/" exact component={Home}  />
            <Route path="/Cadastro"  component={Cadastro}  />
            <Route path="/Login"  component={Login}  />
          
            <PrivateRouteMOD path="/mod/dashboard" exact component={ DashboardMod } />
            

            <PrivateRouteADM path="/adm/dashboard" exact component={ Dashboard } />
            <PrivateRouteADM path="/adm/teste" exact component={ SEGUNDATELAADM } />

         

            <Route path="/" component={() => <h1>404</h1>} />
            
        </Switch>
    )
}