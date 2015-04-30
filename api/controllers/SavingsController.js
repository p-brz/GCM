/**
 * SavingsController
 *
 * @description :: Server-side logic for managing savings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

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
    }
};
