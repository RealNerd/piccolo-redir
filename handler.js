'use strict';

function calculateRedirection(event) {
    let path   = event.path || "/";
    let outUrl = "https://piccolo-composer.app.link/r";
    let debug  = [];

    // remove leading and trailing slash
    path = path.replace(/^\/|\/$/g, '');
    debug.push("Path: " + path);

    let queryAppend = "";

    if (path != "") {
        let parts = path.split("/");
        debug.push("Parts: " + JSON.stringify(parts));
        if (parts.length == 1) {
            debug.push("Parts len is 1");
            // this is a standard checkin for a business
            queryAppend = "?redir_type=checkin&tag_code=" + path;
        } else if (parts.length == 2) {
            debug.push("Parts len is 2");
            // this is a more complex redirect, the first path part is the type, the second part is the data
            let subType = parts[0];
            if (subType == "m") {
                debug.push("Manager referral");
                // this is a redirect for a manager request
                queryAppend = "?redir_type=manager&handle=" + parts[1];
            } else if (subType == "a") {
                debug.push("Affiliate referral");
                // this is a redirect for an affiliate installation
                queryAppend = "?redir_type=affiliate&affiliate_id=" + parts[1];
            }
        }
    }

    return outUrl + queryAppend;
    return JSON.stringify({inPath: path, outUrl: outUrl + queryAppend, debug: debug});
}

module.exports.hello = async event => {
  return {
    statusCode: 301,
    body: null,
    headers: {
        "Location": calculateRedirection(event)
    }
  };
// return {
//     statusCode: 200,
//     body: calculateRedirection(event)
//   };
};
