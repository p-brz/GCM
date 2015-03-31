/**
 * AccountController
 *
 * @description :: Server-side logic for managing accounts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

function redirectWithMessage(req, res, message, accountId){
    req.session.message = message;
    res.redirect('/account/' + accountId);
}

var Logger = require('../utils/Logger.js');

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
        Logger.log("Get account " + accountId + " balance.");

        BalanceCmd = require('../cmds/BalanceCommand.js');
        try{
            callback = function(data){
                res.view('account.ejs', {id : accountId, balance : data.balance, account : data.account, message: flash_message, bonus: data.bonus});
            };
            BalanceCmd.execute({id : accountId} , callback);
        }
        catch(e){
            /* Sails provê alguns métodos para facilitar notificação de erros.
							 Ver: http://sailsjs.org/#!/documentation/concepts/Custom-Responses
						*/
            res.serverError(e);
        }
    },

    deposit : function(req, res){
        Logger.log("execute deposit");
        accountId = req.param('id');
        depositValue = req.param('value');
        Logger.log("Deposit value: " +depositValue);
        typeof(depositValue) == "undefined" || depositValue == "" ? depositValue = 0.0 : depositValue = parseFloat(depositValue);
        
        Logger.log("Get account " + accountId + " balance.");

        DepositCmd = require('../cmds/DepositCommand.js');
        try{
            callback = function(data){
                depositMsg =
                    "Crédito no valor " + depositValue
                    + " para a conta " + accountId + " realizado com sucesso."
                    + " Bônus de " + data.creditedBonus + " pontos creditado."
                    + " Saldo de Bônus: " + data.bonus
                    + ". Continue usando nossos serviços e acumule bônus.";

                redirectWithMessage(req, res, depositMsg, accountId);
            };
            DepositCmd.execute({id : accountId, value : depositValue} , callback);
        }
        catch(e){

            res.serverError(e);
        }
    },


    withdraw : function(req, res){
        Logger.log("execute withdraw");
        accountId = req.param('id');
        depositValue = req.param('value');
        typeof(depositValue) == "undefined" || depositValue == "" ? depositValue = 0.0 : depositValue = parseFloat(depositValue);

        Logger.log("Get account " + accountId + " balance.");

        WithdrawCmd = require('../cmds/WithdrawCommand.js');
        try{
            callback = function(data){
                withdrawMsg = "Débito no valor " + depositValue + " para a conta " + accountId + " realizado com sucesso"
                redirectWithMessage(req, res, withdrawMsg, accountId);
            };
            WithdrawCmd.execute({id : accountId, value : depositValue} , callback);
        }
        catch(e){

            res.serverError(e);
        }
    },



    transfer : function(req, res){
        Logger.log('Realizando transferência');

        accountId = req.param('id');
        receiverId = req.param('rid');

        transferValue = req.param('value');

        typeof(transferValue) == "undefined" || transferValue == "" ? transferValue = 0.0 : transferValue = parseFloat(transferValue);

        console.log('Value is ' + transferValue);


        TransferCmd = require('../cmds/TransferCommand.js');


        try{
            callback = function(data){
                transferMsg = "Transferência no valor " + transferValue + " para a conta " + receiverId + " realizado com sucesso"
                redirectWithMessage(req, res, transferMsg, accountId);
            };
            TransferCmd.execute({sender_id: accountId, 'receiver_id': receiverId, 'value': transferValue} , callback);
        }
        catch(e){

            res.serverError(e);
        }
    }

};
