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
		savingsId = req.param('id');
		Savings.findOne({id : savingsId}).exec(function(err, found){
            if(err){
				res.serverError(err);
            }
            else{
				res.view('savings.ejs', found);
            }
        });
    },
    deposit : function(req, res){
        savingsId = req.param('id');
        depositValue = req.param('value');
        
        typeof(depositValue) == "undefined" || depositValue == "" ? depositValue = 0.0 : depositValue = parseFloat(depositValue);
        
        
        DepositCmd = require('../cmds/SavingsDepositCommand.js');
        try{
            callback = function(data){

                redirectWithMessage(req, res, undefined, data.savingsId);
            };
            DepositCmd.execute({id : savingsId, value : depositValue} , callback);
        }
        catch(e){

            res.serverError(e);
        }
    }

};
