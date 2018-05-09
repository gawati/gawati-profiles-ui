
import React from 'react';

function DivFeed({customClass, children}) {
    return (
        <div className={ `feed w-clearfix  ${customClass || ''}` }>
            { children }
        </div>
    );
}

export default DivFeed;

