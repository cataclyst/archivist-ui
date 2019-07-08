import React, { useState, useEffect } from 'react';
import moment from "moment";

function RecentChanges(props) {

    const [recentChanges, setRecentChanges] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    var d = moment().subtract(2, 'days');

    useEffect(() => {
        fetch('http://localhost:8080')
        .then(res => res.json())
        .then((data) => {
          setRecentChanges(data);
          setIsLoading(false);
        })
        .catch(function(e) {
            console.error(e);
            setIsLoading(false);
        });
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
        return <div class="ui segment">
            <div class="ui active dimmer">
                <div class="ui text loader">Loading</div>
            </div>
            <p></p>
        </div>;
    }

    return <div id="recent-changes" className="ui four stackable cards container">
        {recentChanges.map((recentChange) => 
            <div key={recentChange.id} className="ui raised card">
                <div className="content">
                    <a className="header">{recentChange.name}</a>
                    <div className="meta" title={moment(recentChange.date).format('lll')}>{moment(recentChange.date).fromNow()}</div>
                    <div className="description">
                        <p>{recentChange.description}</p>
                    </div>
                </div>
                <div className="extra content">
                    {recentChange.labels.map((label) => 
                        <a key={label} className="ui small teal tag label">{label}</a>)
                    }
                </div>
            </div>)
            }
    </div>;
}

const RecentChangesBak = () => (

    <div id="recent-changes" className="ui four stackable cards container">
        <div className="ui raised card">
            <div className="content">
                <a className="header">Rechnung Zahnreinigung</a>
                <div className="meta">12.03.2017</div>
                <div className="description">
                    <p>Rechnungsbetrag: EUR 86,45</p>
                </div>
            </div>
            <div className="extra content">
                <a className="ui small teal tag label">Rechnung</a>
                <a className="ui small tag label">Zahnarzt</a>
            </div>
        </div>

        <div className="ui raised card">
            <div className="content">
                <a className="header">Bestätigung Wertpapierkauf</a>
                <div className="meta">02.01.2017</div>
                <div className="description">
                    <p>Kaufbetrag: EUR 120,00</p>
                </div>
            </div>
            <div className="extra content">
                <a className="ui small yellow tag label">WKN <div className="detail">A1CX3T</div></a>
                <a className="ui small orange tag label">Bank</a>
                <a className="ui small basic circular label">+2</a>
            </div>
        </div>

        <div className="ui raised card">
            <div className="content">
                <a className="header">Kündigung "Der Freitag"</a>
                <div className="meta">20.02.2017</div>
                <div className="description">
                </div>
            </div>
            <div className="extra content">
                <a className="ui small blue tag label">Ausgehend</a>
                <a className="ui small tag label">Zeitung</a>
            </div>
        </div>

        <div className="ui raised card">
            <div className="content">
                <a className="header">Bestätigung Wertpapierkauf</a>
                <div className="meta">02.01.2017</div>
                <div className="description">
                    <p>Kaufbetrag: EUR 120,00</p>
                </div>
            </div>
            <div className="extra content">
                <a className="ui small yellow tag label">WKN <div className="detail">A1CX3T</div></a>
                <a className="ui small orange tag label">Bank</a>
                <a className="ui small basic circular label">+2</a>
            </div>
        </div>

        <div className="ui raised card">
            <div className="content">
                <a className="header">Kündigung "Der Freitag"</a>
                <div className="meta">20.02.2017</div>
                <div className="description">
                </div>
            </div>
            <div className="extra content">
                <a className="ui small blue tag label">Ausgehend</a>
                <a className="ui small tag label">Zeitung</a>
            </div>
        </div>

        <div className="ui raised card">
            <div className="content">
                <a className="header">Rechnung Zahnreinigung</a>
                <div className="meta">12.03.2017</div>
                <div className="description">
                    <p>Rechnungsbetrag: EUR 86,45</p>
                </div>
            </div>
            <div className="extra content">
                <a className="ui small teal tag label">Rechnung</a>
                <a className="ui small tag label">Zahnarzt</a>
            </div>
        </div>

    </div>
);

export default RecentChanges;
