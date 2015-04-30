/**
 * SavingsController
 *
 * @description :: Server-side logic for managing savings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


function redirectWithMessage(req, res, message, savingsId){
    req.session.message = message;
    res.redirect('/savings/' + savingsId);
}

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
				content = {
					id : data.id,
					balance : data.balance,
					message : flash_message
				};
                res.view('savings.ejs', content);
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
    deposit : function(req, res){
        savingsId = req.param('id');
        depositValue = req.param('value');

        typeof(depositValue) == "undefined" || depositValue == "" ? depositValue = 0.0 : depositValue = parseFloat(depositValue);


        DepositCmd = require('../cmds/SavingsDepositCommand.js');
        try{
            callback = function(data){
				depositMsg =
					"Crédito no valor " + depositValue
					+ " para a conta " + data.savingsId + " realizado com sucesso.";
                redirectWithMessage(req, res, depositMsg, data.savingsId);
            };
            DepositCmd.execute({id : savingsId, value : depositValue} , callback);
        }
        catch(e){

            res.serverError(e);
        }
    }

};
