module.exports = {
    
    log: function(data){
        var date = new Date();
        sails.log('\n' + data + '\n\tMessage at ' + date + '\n-----------------------------------\n');
    }
    
}