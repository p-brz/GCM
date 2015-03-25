module.exports = {
    execute: function (data, callback) {

        Account.findOne({id : data.id}).exec(function(err, found){
            if(err){
                callback({error : err});
            }
            else{
                var getfound = found;
                getfound.balance += data.value;

                getfound.save(
                    function(err,s){
                        sails.log("Deposit ok " + s.id + " " + s.balance);
                    });      

                callback({account : getfound, balance : getfound.balance});
            }
        });
    }
};
