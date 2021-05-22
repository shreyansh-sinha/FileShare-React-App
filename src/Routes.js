import React from 'react';
// import {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './Home'
import Send from './Send';
import Receive from './Receive';

const Routes = () => {
		return (
		<>
			<Switch>			
				<Route path = "/" component = {Home} exact />
				<Route path = "/Send" component = {Send} exact />
				<Route path = "/Receive" component = {Receive} exact />
			</Switch>	
		</>
		
	)
}

export default Routes;