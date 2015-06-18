module.exports = {
    execute: function (data, callback) {

        Account.findOne({id : data.id}).exec(function(err, found){
        	
            if(err){
                callback({error : err});
            }
            else{
                var getfound = found;
                getfound.balance += data.value;

                var creditedBonus = parseInt(parseInt(data.value) * 0.03);
                sails.log(creditedBonus);
                getfound.bonus += creditedBonus;

                getfound.save(
                    function(err,s){

                        if(err){
                            sails.log(err);
                            callback({error : err});
                            return;
                        }

                        callback({account : s, balance : s.balance, bonus: s.bonus, creditedBonus : creditedBonus});
                    });
            }
        });
    }
};
