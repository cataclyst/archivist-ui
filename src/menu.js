import React from 'react';
import {NavLink} from "react-router-dom";
import { Menu, Button } from 'semantic-ui-react';

const AppMenu = ({match}) => (
    <div className="ui secondary pointing stackable menu">
        <div className="ui container">
            <div className="header item">Archivist</div>
            <NavLink to="/" exact activeClassName="active" className="item">
                <i className="bar chart icon"/> Recent documents
            </NavLink>
            <NavLink to="/tags" activeClassName="active" className="item">
                <i className="tags icon"/> Tags
            </NavLink>
            <Menu.Item>
                <Button primary>
                    {/* <i className="add square icon"/>  */}
                    New document
                </Button>
            </Menu.Item>
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

export default AppMenu;