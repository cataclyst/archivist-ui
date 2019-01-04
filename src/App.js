import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import AppMenu from './menu';
import RecentChanges from "./recent_changes";
import TagList from "./tag_list";

const App = () => (
    <BrowserRouter>
        <div>
            <AppMenu />
            <Route path='/' exact component={RecentChanges} />
            <Route path='/tags' component={TagList} />
            {/* <Route path='/add' component={NewEntry} /> */}
        </div>
    </BrowserRouter>
);

export default App;
