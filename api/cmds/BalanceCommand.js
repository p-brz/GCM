module.exports = {
    execute: function (data, callback) {

        Account.findOne({id : data.id}).exec(function(err, found){
            if(err){
                callback({error : err});
            }
            else if(typeof(found) === "undefined"){
                //Error é
                var notFoundError = new Error("Not found account '" + data.id + "'");
                notFoundError.error_code = 404;
                callback({error : notFoundError});
            }
            else{
                callback({account : found, balance : found.balance, bonus: found.bonus});
            }
        });
    }
};
