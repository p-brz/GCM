/**
 * SavingsController
 *
 * @description :: Server-side logic for managing savings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    balance : function(req, res){

        Logger.log("Session message: " + req.session.message);
        var flash_message = undefined;
        if(req.session.message){
            Logger.log('We have a message!');
            flash_message = req.session.message;
            req.session.message = undefined;
        }

        Logger.log("execute balance");
        Logger.log('Balance of ' + req.param('balance'));
        accountId = req.param('id');
        Logger.log("Get account " + accountId + "savings balance.");

        SavingsBalanceCmd = require('../cmds/SavingsBalanceCommand.js');
        try{
            callback = function(data){
                res.view('savings.ejs', {id : accountId, balance : data.balance, account : data.account, message: flash_message});
            };
            SavingsBalanceCmd.execute({id : accountId} , callback);
        }
        catch(e){
            /* Sails provê alguns métodos para facilitar notificação de erros.
							 Ver: http://sailsjs.org/#!/documentation/concepts/Custom-Responses
						*/
            res.serverError(e);
        }
    },
};

