exports.removeLinebreaks=( str )=> { 
    return str.replace( /[\r\n]+/gm, "" ); 
}