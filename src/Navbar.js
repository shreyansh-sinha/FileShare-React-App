import React from 'react'
import {Link} from 'react-router-dom';
import {Fragment} from 'react';
import './Navbar.css'
const Navbar = () => {
	return (
		<Fragment>
				<div className = 'test'>
				<Link to = "/" style = {{textDecoration: 'none'}}> <p className = 'item'> Home </p> </Link> 
					<Link to = "/Send" style = {{textDecoration: 'none'}}> <p className = 'item'> Send </p> </Link> 
					<Link to = '/Receive' style = {{textDecoration: 'none'}}> <p className = 'item'> Download </p> </Link>
				</div>
		</Fragment>	
	)
}

export default Navbar;