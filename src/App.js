import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AppMenu from './menu';
import RecentChanges from "./recent_changes";
import TagList from "./tag_list";
import NewEntry from "./new_entry";
import SearchResults from "./search";

const App = () => (
    <BrowserRouter>
        <div>
            <AppMenu />
            <Route path='/' exact component={RecentChanges} />
            <Route path='/tags' component={TagList} />
            <Route path='/search/:searchTerm' component={SearchResults}/>
            <Switch>
                <Route path="/documents/new" component={NewEntry} />
                <Route path="/documents/:id" component={NewEntry} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default App;
