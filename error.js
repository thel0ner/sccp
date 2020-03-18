module.exports = (id) => {
    let answer = {};
    switch(id){
        case 1 : {
            answer =  {
                toShow : {
                    success : false,
                    message : "no request is provided",
                },
                status : 400
            };
            break;
        };
        case 2 : {
            answer = {
                toShow : {
                    success : false,
                    message : "could not create time file!" 
                },
                status : 500
            }
            break;
        };
        case 3 : {
            answer = {
                toShow : {
                    success : false,
                    message : "server is temporary down!" 
                },
                status : 503
            }
            break;
        };
        case 4 : {
            answer = {
                toShow : {
                    success : false,
                    message : "could not create data file!" 
                },
                status : 500
            }
            break;
        };
        case 5 : {
            answer = {
                toShow : {
                    success : false,
                    message : "could not read time file!" 
                },
                status : 500
            }
            break;
        };
        case 6 : {
            answer = {
                toShow : {
                    success : false,
                    message : "could not read data file!" 
                },
                status : 503
            }
            break;
        }
        case 7 : {
            answer = {
                toShow : {
                    success : false,
                    message : "router not found" 
                },
                status : 404
            }
            break;
        };
        case 8 : {
            answer = {
                toShow : {
                    success : false,
                    message : "access denied" 
                },
                status : 403
            }
            break;
        };
        default : {
            answer = {
                toShow : {
                    success : false,
                    message : "fuck you" 
                },
                status : 503
            }
            break;
        };
    }
    return answer;
};