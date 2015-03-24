module.exports = {
    execute: function (data, callback) {

        Account.findOne({id : data.sid}).exec(function(err, found){
            
            if(err){
                callback({error : err});
            }
            else{
                callback({account : found, balance : found.balance});
            }
        });
    }
};
