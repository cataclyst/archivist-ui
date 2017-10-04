import React from 'react';
import {NavLink} from "react-router-dom";

const Menu = ({match}) => (
    <div className="ui secondary pointing stackable menu">
        <div className="ui container">
            <div className="header item">Archivist</div>
            <NavLink to="/" exact activeClassName="active" className="item">
                <i className="bar chart icon"/> Recent documents
            </NavLink>
            <NavLink to="/documents/add" activeClassName="active" className="item">
                <i className="add square icon"/> New document
            </NavLink>
            <NavLink to="/tags" activeClassName="active" className="item">
                <i className="tags icon"/> Tags
            </NavLink>
            <div className="right menu">
                <NavLink to="/settings" activeClassName="active" className="item">
                    <i className="setting icon"/> Settings
                </NavLink>
                <div className="item">
                    <div className="ui icon input">
                        <input placeholder="Search for a document" type="text"/>
                        <i className="search link icon"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Menu;