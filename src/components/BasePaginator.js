import React from 'react';
import {rangeMinMax} from '../utils/generalhelper';

import '../css/Paginator.css';

class BasePaginator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1
        };
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    /**
     * Called from pageNavLink in the extending class 
     */
    handleChangePage = (newPage) => {
        this.setState({currentPage: this.state.currentPage + Math.floor(Math.random())});
        this.props.onChangePage(newPage);
    }

    getCurrentPage = (lastItemCount, pageSize) =>
         Math.floor(lastItemCount / pageSize) ; 
    

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);
        console.log( " totalPager, ", totalItems, pageSize, totalPages);
        let startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = startPage === endPage ? [1] : rangeMinMax(startPage, endPage);

        // return object with all pager properties required by the view
        let pgn = {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
        console.log (" PGN ", pgn);
        return pgn;
    }

    renderObjects() {
        let pgn = this.props.pagination ; 
        let currentPage = this.getCurrentPage(pgn.to, pgn.count); 
        return {
            //currentPage: currentPage,
            pager: this.getPager(pgn.records, currentPage, pgn.count)
        };
    }
}



export default BasePaginator;