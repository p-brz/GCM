/**
 * SavingsController
 *
 * @description :: Server-side logic for managing savings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    balance : function(req, res){
        var flash_message = undefined;
        if(req.session.message){
            flash_message = req.session.message;
            req.session.message = undefined;
        }
        savingsId = req.param('id');
        SavingsBalanceCmd = require('../cmds/SavingsBalanceCommand.js');
        try{
            callback = function(data){
                res.view('savings.ejs', data);
            };
            SavingsBalanceCmd.execute({id : savingsId} , callback);
        }
        catch(e){
            /* Sails provê alguns métodos para facilitar notificação de erros.
							 Ver: http://sailsjs.org/#!/documentation/concepts/Custom-Responses
						*/
            res.serverError(e);
        }
    },
};
