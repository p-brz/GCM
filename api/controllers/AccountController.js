/**
 * AccountController
 *
 * @description :: Server-side logic for managing accounts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    // index : function(req, res){
    // 	res.view('account.ejs', {id : 1, balance : 0});
    // },
    balance : function(req, res){
        /*req.param obtem o parâmetro da query id.
					Acredito q pode obter valor do path se estiver especificada uma rota apropriada em config/routes.js.
					Por exemplo: /account/balance/:id   # o ":" é importante
					Ver http://sailsjs.org/#!/documentation/reference/req/req.param.html (para req.param)
						e http://sailsjs.org/#!/documentation/concepts/Routes/URLSlugs.html (para a sintaxe de rotas parametrizadas)
				*/
        sails.log("execute balance");
        sails.log('Balance of ' + req.param('balance'));
        accountId = req.param('id');
        /* Comando de log do sails. Ver: http://sailsjs.org/#!/documentation/concepts/Logging/sails.log.html*/
        sails.log("Get account " + accountId + " balance.");

				//Obtém BalanceCommand
				BalanceCmd = require('../cmds/BalanceCommand.js');
				try{
						callback = function(data){
									//deveriamos testar erros
									//Envia para o cliente a view 'account.ejs' com os dados presentes em data
									res.view('account.ejs', {id : accountId, balance : data.balance, account : data.account});
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
			/*req.param obtem o parâmetro da query id.
				Acredito q pode obter valor do path se estiver especificada uma rota apropriada em config/routes.js.
				Por exemplo: /account/balance/:id   # o ":" é importante
				Ver http://sailsjs.org/#!/documentation/reference/req/req.param.html (para req.param)
					e http://sailsjs.org/#!/documentation/concepts/Routes/URLSlugs.html (para a sintaxe de rotas parametrizadas)
			*/
			sails.log("execute deposit");
			accountId = req.param('id');
			depositValue = req.param('value');
			sails.log("param " +depositValue);
			typeof(depositValue) == "undefined" || depositValue == "" ? depositValue = 0.0 : depositValue = parseFloat(depositValue);
			//sails.log(depositValue);

			/* Comando de log do sails. Ver: http://sailsjs.org/#!/documentation/concepts/Logging/sails.log.html*/
			sails.log("Get account " + accountId + " balance.");

			//Obtém BalanceCommand
			DepositCmd = require('../cmds/DepositCommand.js');
			try{
					callback = function(data){
								//deveriamos testar erros
								//Envia para o cliente a view 'account.ejs' com os dados presentes em data
                depositMsg = "Crédito no valor " + depositValue + " para a conta " + accountId + " realizado com sucesso"
								res.view('account.ejs', {id : accountId, balance : data.balance, message : depositMsg});
					};
					DepositCmd.execute({id : accountId, value : depositValue} , callback);
			}
			catch(e){

        		res.serverError(e);
    		}
    },


   withdraw : function(req, res){
				/*req.param obtem o parâmetro da query id.
					Acredito q pode obter valor do path se estiver especificada uma rota apropriada em config/routes.js.
					Por exemplo: /account/balance/:id   # o ":" é importante
					Ver http://sailsjs.org/#!/documentation/reference/req/req.param.html (para req.param)
						e http://sailsjs.org/#!/documentation/concepts/Routes/URLSlugs.html (para a sintaxe de rotas parametrizadas)
				*/
				sails.log("execute withdraw");
				accountId = req.param('id');
				depositValue = req.param('value');
				typeof(depositValue) == "undefined" || depositValue == "" ? depositValue = 0.0 : depositValue = parseFloat(depositValue);

				/* Comando de log do sails. Ver: http://sailsjs.org/#!/documentation/concepts/Logging/sails.log.html*/
				sails.log("Get account " + accountId + " balance.");

				//Obtém BalanceCommand
				WithdrawCmd = require('../cmds/WithdrawCommand.js');
				try{
						callback = function(data){
									//deveriamos testar erros
									//Envia para o cliente a view 'account.ejs' com os dados presentes em data
									withdrawMsg = "Débito no valor " + depositValue + " para a conta " + accountId + " realizado com sucesso"
									res.view('account.ejs', {id : accountId, balance : data.balance, message : withdrawMsg});
						};
						WithdrawCmd.execute({id : accountId, value : depositValue} , callback);
				}
				catch(e){

            		res.serverError(e);
    			}
    },



    transfer : function(req, res){
        sails.log('Realizando transferência');

        accountId = req.param('id');
        receiverId = req.param('rid');

        transferValue = req.param('value');

        typeof(transferValue) == "undefined" || transferValue == "" ? transferValue = 0.0 : transferValue = parseFloat(transferValue);

        console.log('Value is ' + transferValue);


        TransferCmd = require('../cmds/TransferCommand.js');


        try{
						callback = function(data){
									//deveriamos testar erros
									//Envia para o cliente a view 'account.ejs' com os dados presentes em data
									transferMsg = "Transferência no valor " + transferValue + " para a conta " + receiverId + " realizado com sucesso"
									res.view('account.ejs', {id : accountId, balance : data.balance, message : transferMsg});
						};
						TransferCmd.execute({sender_id: accountId, 'receiver_id': receiverId, 'value': transferValue} , callback);
				}
				catch(e){

            		res.serverError(e);
    			}
    }

};
