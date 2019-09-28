import React, { useState, useEffect } from 'react';
import moment from "moment";

import {Link, withRouter} from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "./store/actions/actions";

function RecentChanges(props) {

    const [recentChanges, setRecentChanges] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const query = `query {
            recentDocuments {
              id
              title
              description
              date
              tags {
                title
                context
              }
            }
          }
        `;

        fetch('http://localhost:9090/query', {
            method: "POST",
            body: JSON.stringify({query: query}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then((data) => {
                setRecentChanges(data.data.recentDocuments);
                setIsLoading(false);
            })
            .catch(function(e) {
                console.error(e);
                setIsLoading(false);
            })
    }, []);

    if (isLoading) {
        return <div id="recent-changes" className="ui four stackable cards container">
            { [...Array(20)].map((e, i) => loadingDocument(i)) }
        </div>;
    }

    return <div id="recent-changes" className="ui four stackable cards container">
        {(recentChanges || []).map((recentChange) =>
            <div key={recentChange.id} className="ui raised card">
                <div className="content">
                    <Link to={"/documents/" + recentChange.id} className="header">{recentChange.title}</Link>
                    <div className="meta" title={moment(recentChange.date).format('lll')}>{moment(recentChange.date).fromNow()}</div>
                    <div className="description">
                        <p>{recentChange.description}</p>
                    </div>
                </div>
                <div className="extra content">
                    { tagList(recentChange) }
                </div>
            </div>)
        }
    </div>;
}

const loadingDocument = i =>
    <div key={i} className="ui raised card">
        <div className="content">
            <div className="ui placeholder">
                <div className="header">
                    <div className="full line"/>
                    <div className="medium line"/>
                    <div className="very long line"/>
                    <div className="long line"/>
                </div>
            </div>
        </div>
        <div className="extra content">
            <div className="ui placeholder">
                <div className="paragraph">
                    <div className="line"/>
                    <div className="line"/>
                    <div className="line"/>
                </div>
            </div>
        </div>
    </div>;

function tagList(recentChange) {
    if (recentChange.tags) {
        return recentChange.tags.map((tag) => {
            return <a key={tag.title} className="ui small teal tag label">{tag.title}</a>
        });
    }
}

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = {
    showEditEntryForm: actions.showEditEntryForm
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(RecentChanges));
