import React, { Component } from 'react'
import {NavLink, withRouter } from "react-router-dom";
import { Menu, Button } from 'semantic-ui-react';

import { connect } from "react-redux";
import * as actions from "./store/actions/actions";

const AppMenu = (props) => (
      <Menu pointing secondary stackable>
        <div className="ui container">
            <div className="header item">Archivist</div>
            <NavLink to="/" exact className="item">
                <i className="bar chart icon"/> Recent documents
            </NavLink>
            <NavLink to="/tags" className="item">
                <i className="tags icon"/> Tags
            </NavLink>
            <Menu.Item>
                <Button primary onClick={props.showNewEntryForm}>
                    {/* <i className="add square icon"/>  */}
                    New document
                </Button>
            </Menu.Item>
            <Menu.Menu position='right'>
                <NavLink to="/settings" className="item">
                    <i className="setting icon"/> Settings
                </NavLink>
                <Menu.Item>
                    <div className="ui icon input">
                        <input placeholder="Search for a document" type="text"/>
                        <i className="search link icon"/>
                    </div>
                </Menu.Item>
            </Menu.Menu>
        </div>
    </Menu>
)

const mapStateToProps = state => {
    return {}
  };
  
const mapDispatchToProps = {
    showNewEntryForm: actions.showNewEntryForm
};
  
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AppMenu));