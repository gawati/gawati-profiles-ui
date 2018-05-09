import React from 'react';
import GwSpinner from './GwSpinner';
import DivListing from './DivListing';

const ListingLoading = ({children}) => {
        return (
            <DivListing>
                {children}
                <GwSpinner />
            </DivListing>
        );
    };

export default ListingLoading;
