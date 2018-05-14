import React from 'react';
import {Link} from 'react-router-dom';
import BasePaginator from './BasePaginator';
import FontAwesome from 'react-fontawesome';
import 'font-awesome/css/font-awesome.css';

class ThemeListPaginator extends BasePaginator {

    pageLink = (pager, lang, themes, count, from, to, text) => 
        <Link to={ 
            "/_lang/"+ lang + 
            "/themes/" + themes +
            "/_count/"+ count +
            "/_from/" + from  +
            "/_to/" + to  
            } onClick={() => this.handleChangePage({lang: lang, themes: themes.split('|'), count: count, from: from, to: to, text: text})}>
            { text }
        </Link>;

    pageNavLink = (disableCondition, pager, lang, themes, count, from, to, text) =>
            <li className={ disableCondition ? "disabled": ""}>
                {disableCondition ? <span>{ text } </span> : this.pageLink(pager, lang, themes, count, from, to, text) }
            </li>
        ;

    render() {

        let pager = super.renderObjects().pager ;
        let pgn = this.props.pagination;
        console.log( "PAGER === ", pager);
        /* 
        let currentPage = this.getCurrentPage(pgn.to, pgn.count);
        let pagerObject = this.getPager(pgn.records, currentPage, pgn.count);
        */
        return (
            <ul className="gw-pager">
                {
                    /**
                     * First page link 
                     */
                    this.pageNavLink(
                        pager.currentPage === 1, 
                        pager, 
                        pgn.lang, 
                        pgn.themes,
                        pgn.count, 
                        1, 
                        pgn.count, 
                        <FontAwesome name="angle-double-left" />
                    )
                }
                {
                    /**
                     * Previous page link
                     */
                    this.pageNavLink(
                        pager.currentPage === 1, 
                        pager, 
                        pgn.lang, 
                        pgn.themes,
                        pgn.count,  
                        pgn.from - pgn.count , 
                        pgn.from - 1 , 
                        <FontAwesome name="angle-left" />
                    )
                }
                {
                    /**
                     * Render numbered page links
                     */
                    pager.pages.map(
                        (page, index) =>
                            <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                                {
                                    this.pageLink(
                                        pager, 
                                        pgn.lang, 
                                        pgn.themes,
                                        pgn.count, 
                                        ((page - 1) * pgn.count) + 1, 
                                        (page * pgn.count) , 
                                        page
                                    ) 
                                }
                            </li>
                    )
                }
                {
                    /**
                     * Next Page
                     */
                    this.pageNavLink(
                        pager.currentPage === pager.totalPages, 
                        pager, 
                        pgn.lang, 
                        pgn.themes,
                        pgn.count, 
                        pgn.to + 1, 
                        pgn.to + pgn.count, 
                        <FontAwesome name="angle-right" /> 
                    )
                }
                {
                    /**
                     * Last Page
                     */
                    this.pageNavLink(
                        pager.currentPage === pager.totalPages,
                        pager,
                        pgn.lang, 
                        pgn.themes,
                        pgn.count, 
                        ((pager.totalPages - 1) * pgn.count) + 1,  
                        pgn.records === (pager.totalPages * pgn.count) ? pager.totalPages * pgn.count : (pager.totalPages * pgn.count) - pgn.records, 
                        <FontAwesome name="angle-double-right" />
                    )
                }
            </ul>
        );
    }
}



export default ThemeListPaginator;
