/**
 * This module provides a middle-ware to convert a query JSON to an XQUery format 
 * understandable by the back-end.
 */



/**
 * Specifies the filter configuration
 * The filter configuration is used to construct the XQuery. 
 * this is typically converted to the form: 
 *    [ {xqueryElementXPath}[{xqueryAttr} eq '{incomingFilterValue}' {or...} ] ]
 * for example if the incoming filter value is for "countries" :
 * 
 *  "countries":["bf","mr"]
 * 
 * then the Query is constructed as:
 * 
 * [ .//an:FRBRcountry[@value eq 'bf' or @value eq 'mr' ] ]
 * 
 * if it is for "langs":
 * 
 *  "langs":["eng"], 
 * 
 * then the Query is constructed as:
 * 
 * [ .//an:FRBRlanguage[ @language eq 'eng' ]] 
 *    
 */
const filterConfig = {
    'countries': {
      xqueryElementXPath: './/an:FRBRcountry',
      xqueryAttr: '@value',
      xqueryAttrType: 'string'
    },
    'langs': {
      xqueryElementXPath: './/an:FRBRlanguage',
      xqueryAttr: '@language',
      xqueryAttrType: 'string'
    },
    'years': {
      xqueryElementXPath: './/an:FRBRdate',
      xqueryAttr: 'year-from-date(@date)',
      xqueryAttrType: 'int'
    },
    'keywords': {
      xqueryElementXPath: './/an:classification/an:keyword',
      xqueryAttr: '@value',
      xqueryAttrType: 'string'
    } 
};

/**
 * This returns an XQuery query which is sent to the data server
 * as a server side query. Takes a filter JSON object provided by the client.
 * @param {object} filter incoming filter object from client
 * This is typically sent in the format as below: 
 * { 
 *      "langs":["eng"], 
 *      "countries":["bf","mr"]
 *  }
 */
export const xQueryFilterBuilder = (filter) => {
    // the root document collection
    let xQuery = [];
    
    for (let filterName in filter) {
        
        let cfg = filterConfig[filterName];
        if (filter[filterName].length > 0 ) {
            let attrQuery = filter[filterName].map(
                value => {
                    let qValue = cfg.xqueryAttrType === 'int' ? value : `'${value}'` ;
                    return `${cfg.xqueryAttr} eq ${qValue}`;
                }
            ).join(" or ");
            
            xQuery.push(
                `[${cfg.xqueryElementXPath}[ ${attrQuery} ]]`
            );
        }
    }
    return xQuery;
};
