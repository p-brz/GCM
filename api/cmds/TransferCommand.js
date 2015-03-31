module.exports = {
    execute: function (data, callback) {

        Account.find({id : [data.sender_id, data.receiver_id]}).exec(function(err, found){
            
            if(err){
                callback({error : err});
                return;
            }
            
            var receiver = undefined;
            var sender = undefined;
            while (found.length){
                var element = found.pop();

                if(element.id == data.sender_id){
                    sender = element;
                }else{
                    receiver = element;
                }
            }

            
            if(!receiver || !sender){
                callback({error : 'Undefined receiver / sender'});
                return;
            }

            var value = parseFloat(data.value);
            if(sender.balance < data.value){
                callback({error : 'Insufficient balance for sender'});
                return;
            }
            
            sender.balance = parseFloat(sender.balance) - value;
            receiver.balance = parseFloat(receiver.balance) + value;
            
            receiver.save();
            sender.save(function(err, s){
                callback({account : s.id});
            });

        });
    }
};
