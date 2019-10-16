import {Link} from "react-router-dom";
import moment from "moment";
import React from 'react';
import PropTypes from 'prop-types';

function DocumentSummary(props) {

    return <div key={props.documentId} className="ui raised card">
        <div className="content">
            <Link to={"/documents/" + props.documentId} className="header">{props.title}</Link>
            <div className="meta" title={moment(props.date).format('lll')}>{moment(props.date).fromNow()}</div>
            <div className="description">
                <p>{props.description}</p>
            </div>
        </div>
        <div className="extra content">
            { tagList(props.tags) }
        </div>
    </div>;
}

function tagList(tags) {
    if (tags) {
        return tags.map((tag) => {
            return <a key={tag.title} className="ui small teal tag label">{tag.title}</a>
        });
    }
}

DocumentSummary.propTypes = {
    documentId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    date: PropTypes.string.isRequired,
    tags: PropTypes.array
};

export default DocumentSummary;