import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Cadastro from '../pages/Cadastro';


import DashboardPodcaster from '../pages/DashboardPodcaster';
import PrivateRouteADM from './PrivateRouteADM';
import PrivateRouteMOD from './PrivateRouteMOD';
import PrivateRoutePOD from './PrivateRoutePod';


import Login from '../pages/examples/Login'

import "../assets/css/argon-design-system-react.css";
import "../assets/css/custom.css";




export default function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/Cadastro" component={Cadastro} />
			<Route path="/Login" component={Login} />

			<PrivateRouteMOD path="/mod/dashboard" exact component={DashboardMod} />

			<PrivateRouteADM path="/adm/dashboard" exact component={Dashboard} />
	
			<PrivateRoutePOD
				path="/podcaster/dashboard"
				exact
				component={DashboardPodcaster}
			/>

			<Route path="/" component={() => <h1>404</h1>} />
		</Switch>
	);
}
