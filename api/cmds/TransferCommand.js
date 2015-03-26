module.exports = {
    execute: function (data, callback) {

        Account.find({id : [data.sender_id, data.receiver_id]}).exec(function(err, found){
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
            }

            var value = data.value;
            if(sender.balance < data.value){
                callback({error : 'Insufficient balance for sender'});
            }

            sender.balance -= value;
            receiver.balance += value;

            sender.save();
            receiver.save();
            
            callback({account : found, balance : found.balance});

        });
    }
};
