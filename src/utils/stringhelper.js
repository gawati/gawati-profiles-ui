
export const substringBeforeLastMatch = (theString, charMatch) => 
     theString.substring(0, theString.lastIndexOf(charMatch)) ;

/**
 * From https://github.com/tjcafferkey/stringinject
 * @param {string} str 
 * @param {array/object} data 
 */
export const stringTemplate = (str, data) => {
        if (typeof str === 'string' && (data instanceof Array)) {
    
            return str.replace(/({\d})/g, function(i) {
                return data[i.replace(/{/, '').replace(/}/, '')];
            });
        } else if (typeof str === 'string' && (data instanceof Object)) {
    
            for (let key in data) {
                return str.replace(/({([^}]+)})/g, function(i) {
                    let key = i.replace(/{/, '').replace(/}/, '');
                    if (!data[key]) {
                        return i;
                    }
    
                    return data[key];
                });
            }
        } else {
    
            return false;
        }
}

/**
 * Take a string, capitalize the first letter and return the whole string.
 * "sherlock" -> "Sherlock"
 * @param {string} str
 */
export const capitalizeFirst = (str) => {
  if (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}