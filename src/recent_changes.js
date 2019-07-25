import React, { useState, useEffect } from 'react';
import moment from "moment";

function RecentChanges(props) {

    const [recentChanges, setRecentChanges] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:9090/query', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: '{ recentDocuments { id, title, description } }' }),
        })
            .then(res => res.json())
            .then((data) => {
                setRecentChanges(data);
                setIsLoading(false);
            })
            .catch(function (e) {
                console.error(e);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div id="recent-changes" className="ui four stackable cards container">
            { [...Array(20)].map((e, i) => loadingDocument) }
        </div>;
    }

    return <div id="recent-changes" className="ui four stackable cards container">
        {recentChanges.data.recentDocuments.map((recentChange) =>
            <div key={recentChange.id} className="ui raised card">
                <div className="content">
                    <a className="header" href={'/doc/' + recentChange.id}>{recentChange.title}</a>
                    <div className="meta" title={moment(recentChange.date).format('lll')}>{moment(recentChange.date).fromNow()}</div>
                    <div className="description">
                        <p>{recentChange.description}</p>
                    </div>
                </div>
                <div className="extra content">
                    {(recentChange.tags || []).map((tag) =>
                        <a key={tag.label} className="ui small teal tag label">{tag.label}</a>)
                    }
                </div>
            </div>)
        }
    </div>;
}

const loadingDocument =
    <div class="ui raised card">
        <div className="content">
            <div class="ui placeholder">
                <div class="header">
                    <div class="full line"></div>
                    <div class="medium line"></div>
                    <div class="very long line"></div>
                    <div class="long line"></div>
                </div>
            </div>
        </div>
        <div className="extra content">
            <div class="ui placeholder">
                <div class="paragraph">
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                </div>
            </div>
        </div>
    </div>;

export default RecentChanges;
