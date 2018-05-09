import React from 'react';
import bellIcon from '../images/bell.png';

function NotifBar() {
    return (
        <div className="col-1 col-xs-2">
            <img alt="notif" className="bell" src={bellIcon} width="27" />
        </div>
    );
}

export default NotifBar;