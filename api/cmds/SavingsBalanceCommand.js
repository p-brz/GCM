module.exports = {
    execute: function (data, callback) {

        Account.findOne({id : data.id}).exec(function(err, found){
            
            if(err){
                callback({error : err});
            }
            else{
                callback({account : found, balance : found.savings.balance});
            }
        });
    }
};
