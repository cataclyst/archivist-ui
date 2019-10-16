import React, { useState, useEffect } from 'react';
import DocumentSummary from "./document_summary";

import {withRouter} from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "./store/actions/actions";
import LoadingDocumentPlaceholder from "./loading_document_placeholder";

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
            { [...Array(20)].map((e, i) => <LoadingDocumentPlaceholder key={i} />) }
        </div>;
    }

    return <div id="recent-changes" className="ui four stackable cards container">
        {(recentChanges || []).map((recentChange) =>
            <DocumentSummary
                documentId={recentChange.id}
                title={recentChange.title}
                description={recentChange.description}
                date={recentChange.date}
                tags={recentChange.tags} />)
        }
    </div>;
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
