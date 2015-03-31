module.exports = {
    execute: function (data, callback) {

        Account.findOne({id : data.id}).exec(function(err, found){
            if(err){
                callback({error : err});
            }
            else{
                var getfound = found;
                getfound.balance += data.value;

                var creditedBonus = parseInt(parseInt(data.value) / 10);
                sails.log(creditedBonus);
                getfound.bonus += creditedBonus;

                getfound.save(
                    function(err,s){

                        if(err){
                            sails.log(err);
                            callback({error : err});
                            return;
                        }

                        sails.log("Deposit ok " + s.id + " " + s.balance);
                        sails.log('Total bonus: ' + s.bonus);

                        callback({account : s, balance : s.balance, bonus: s.bonus, creditedBonus : creditedBonus});
                    });
            }
        });
    }
};
