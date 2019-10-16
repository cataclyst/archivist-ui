import React from 'react';
import PropTypes from 'prop-types';

function LoadingDocumentPlaceholder(props) {
    return <div className="ui raised card">
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
}

export default LoadingDocumentPlaceholder;