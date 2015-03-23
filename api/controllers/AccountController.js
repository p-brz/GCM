/**
 * AccountController
 *
 * @description :: Server-side logic for managing accounts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
		balance : function(req, res){
				accountId = req.param('id');
				console.log("Get account " + accountId + " balance.");
				res.view("account.ejs", {id : accountId});
		}
};
