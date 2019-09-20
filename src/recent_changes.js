import React, { useState, useEffect } from 'react';
import moment from "moment";

import {Link, NavLink, withRouter} from "react-router-dom";

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

    // useEffect(() => {
    //     setRecentChanges([
    //         {
    //             id: "abcdef-ghijk",
    //             name: "ABC",
    //             date: d,
    //             description: "Betrag: 123",
    //             labels: ["l1", "l2"],
    //         },
    //         {
    //             id: "abcdef-ghijk2",
    //             name: "DEF",
    //             date: d,
    //             description: "blub",
    //             labels: ["l1", "l2"],
    //         },
    //         {
    //             id: "abcdef-ghijk3",
    //             name: "GHI",
    //             date: d,
    //             description: "Abonnement",
    //             labels: ["l1", "l2"],
    //         },
    //         {
    //             id: "abcdef-ghijk4",
    //             name: "JKE",
    //             date: d,
    //             description: "Ausgehende Rechnung",
    //             labels: ["l1", "l2"],
    //         }
    //     ]);
    //     console.log("effect done");
    // }, []);

    if (isLoading) {
        return <div className="ui segment">
            <div className="ui active dimmer">
                <div className="ui text loader">Loading</div>
            </div>
        </div>;
    }

    return <div id="recent-changes" className="ui four stackable cards container">
        {recentChanges.map((recentChange) => 
            <div key={recentChange.id} className="ui raised card">
                <div className="content">
                    <Link to={"/documents/" + recentChange.id} className="header">{recentChange.title}</Link>
                    <div className="meta" title={moment(recentChange.date).format('lll')}>{moment(recentChange.date).fromNow()}</div>
                    <div className="description">
                        <p>{recentChange.description}</p>
                    </div>
                </div>
                <div className="extra content">
                    { bla(recentChange) }
                </div>
            </div>)
            }
    </div>;
}

function bla(recentChange) {
    if (recentChange.tags) {
        return recentChange.tags.map((label) =>
                <a key={label} className="ui small teal tag label">{label}</a>);
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
