import React from 'react';
import FacebookProvider, { Comments } from 'react-facebook';
import socialApps from '../configs/social.json';

const langMap = {
    en: "en_US",
    fr: "fr_FR",
    pt: "pt_PT",
    ik: "en_US"
}


class DivListing extends React.Component {

    constructor (props) {
        super();
        this.state = {lang: props.lang};
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.lang !== this.state.lang) {
            this.setState({"lang": nextProps.lang});
        }
    }


    render () {
        let lang = null;
        if (this.state && this.state.lang){
            lang = langMap[this.state.lang]
        }
        return (
            <div className={ `main-col col-xs-12 col-lg-9 col-md-9 col-sm-12`}>
                <div className="search-result">
                {this.props.children}
                {
                    lang? (
                    <FacebookProvider appId={socialApps.fb.appId} language={lang} >
                        <Comments href={window.location.href.replace('@', '&#064;')} width="100%" />
                    </FacebookProvider>
                    ) : (<span></span>
                    )
                }
                </div>
            </div>
        );
    }
}

export default DivListing;