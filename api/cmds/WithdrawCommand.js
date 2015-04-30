module.exports = {
    execute: function (data, callback) {

        Account.findOne({id : data.id}).exec(function(err, found){
            if(err){
                callback({error : err});
            }
            else{
                var getfound = found;
                if(getfound.balance < data.value){
                    callback({error: 'Saldo em conta insuficiente para realizar esta operação'});
                    return;
                }
                
                if(getfound.balance < 2){
                    callback({error: 'Saldo em conta deve ser superior a $2 para realizar esta operação'});
                    return;
                }
                
                getfound.balance -= data.value;

                getfound.save(
                    function(err,s){
                        if(err){
                            callback({error : err});
                            return;
                        }
                        callback({account : s, balance : s.balance});
                    });
            }
        });
    }
};
