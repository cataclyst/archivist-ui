import React, { useState, useEffect } from 'react';
import DocumentSummary from "./document_summary";
import PropTypes from 'prop-types';
import LoadingDocumentPlaceholder from "./loading_document_placeholder";
import { useParams } from "react-router-dom";

function SearchResults(props) {

    const {searchTerm} = useParams();

    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const query = `query {
            search(term: "${searchTerm}") {
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
                setIsLoading(false);
                if (data.errors) {
                    // TODO does not render - why?
                    return <div>ERROR!</div>;
                }
                setSearchResults(data.data.search);
            })
            .catch(function(e) {
                console.error(e);
                setIsLoading(false);
            })
    }, [searchTerm]);

    if (isLoading) {
        return <div id="recent-changes" className="ui four stackable cards container">
            { [...Array(20)].map((e, i) => <LoadingDocumentPlaceholder key={i}/>) }
        </div>;
    }

    return <div id="recent-changes" className="ui four stackable cards container">
        {(searchResults || []).map((recentChange) =>
            <DocumentSummary
                documentId={recentChange.id}
                title={recentChange.title}
                description={recentChange.description}
                date={recentChange.date}
                tags={recentChange.tags} />)
        }
    </div>;
}

export default SearchResults;