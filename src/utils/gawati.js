import {anProprietary} from './akomantoso';

export const propGawati = (doc, type) => anProprietary(doc, type).gawati ;

export const gawatiDateEntryInForce = (doc, type) => {
    console.log(" PROPS" , anProprietary(doc, type));
    let gw = propGawati(doc, type);
    if (gw.date) {
        if (Array.isArray(gw.date)) {
            return gw.date.find(dateObj => dateObj.refersTo === '#dtInForce');
        } else {
            if (gw.date.refersTo === '#dtInForce') {
                 return gw.date;   
            }
        }
    } else return undefined;
};