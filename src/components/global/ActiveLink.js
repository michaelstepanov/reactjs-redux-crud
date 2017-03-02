import React from 'react';
import { Link, Route } from 'react-router-dom';

const ActiveLink = ({ label, to, activeOnlyWhenExact }) => (
    <Route path={to} exact={activeOnlyWhenExact} children={({match}) => (
        <li className={match ? 'active item' : 'item'}><Link to={to}>{label}</Link></li>
    )} />
);

export default ActiveLink;