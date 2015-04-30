module.exports = {
    execute: function (data, callback) {

        Savings.findOne({id : data.id}).exec(function(err, found){
            if(err){
                callback({error : err});
            }
            else{
                var getfound = found;
                getfound.balance += data.value;


                

                getfound.save(
                    function(err,s){

                        if(err){
                            callback({error : err});
                            return;
                        }

                        callback({savingsId : getfound.id);
                    });
            }
        });
    }
};