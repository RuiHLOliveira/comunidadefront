export default {
    toQueryString(params, withStartingQuestionMark = false){
        let queryString = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
        }).join('&');
        if(withStartingQuestionMark) {
            queryString = '?' + queryString
        }
        return queryString;
    }
};