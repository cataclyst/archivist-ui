import React from 'react'
import {Link, NavLink, withRouter} from "react-router-dom";
import { Menu, Button, Icon, Input, Container } from 'semantic-ui-react';

import { connect } from "react-redux";
import * as actions from "./store/actions/actions";

const AppMenu = (props) => (
      <Menu pointing secondary stackable>
        <Container>
            <Menu.Item header>Archivist</Menu.Item>
            <NavLink to="/" exact className="item">
                <Icon name="chart bar" /> Recent documents
            </NavLink>
            <NavLink to="/tags" className="item">
                <Icon name="tags"/> Tags
            </NavLink>
            <Menu.Item>
                <Link to={"/documents/new"}>
                    <Button primary onClick={props.showNewEntryForm}>
                        <Icon name="add circle" /> New document
                    </Button>
                </Link>
            </Menu.Item>
            <Menu.Menu position='right'>
                <NavLink to="/settings" className="item">
                    <Icon name="setting"/> Settings
                </NavLink>
                <Menu.Item>
                    <Input icon="search" placeholder="Search for a document" onChange={e => onSearch(e, props.history)}/>
                </Menu.Item>
            </Menu.Menu>
        </Container>
    </Menu>
);

function onSearch(e, history) {
    if (e.target.value) {
        history.push('/search/' + escape(e.target.value));
    } else {
        history.push('/');
    }
}

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