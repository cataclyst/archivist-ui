import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Menu from './menu';
import RecentChanges from "./recent_changes";
import TagList from "./tag_list";

const App = () => (
    <BrowserRouter>
        <div>
            <Menu />
            <Route path='/' exact component={RecentChanges} />
            <Route path='/tags' component={TagList} />
        </div>
    </BrowserRouter>
);

export default App;
