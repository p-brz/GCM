module.exports = {
    execute: function (data, callback) {

        Savings.findOne({id : data.id}).exec(function(err, found){
            
            if(err){
                callback({error : err});
            }
            else{
                callback(found);
            }
        });
    }
};
