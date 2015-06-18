/**
 * Created by alisonbnt on 18/06/15.
 */


var assert = require('chai').assert;

DepositCmd = require('../api/cmds/DepositCommand.js');
describe('DepositCmd', function(){
    describe('#execute()', function(){
        it('should add account balance', function(done){
            Account.create({username:'Manolo', balance: 1000}).exec(function (err, created){
                console.log('Example account has been created');
                DepositCmd.execute({id : created.id, value: 10} , function(data){
                    assert.equal(1010, data.account.balance);
                    assert.equal('Manolo', data.account.username);
                    //assert.equal(-1, [1,2,3].indexOf(0));
                    Account.destroy({id: data.account.id}).exec(function (err){
                        console.log('The account has been deleted');
                        done();
                    });
                });
            });

        })
    })
});

describe('DepositCmd', function(){
    describe('#execute()', function(){
        it('should return error', function(done){
            BalanceCmd.execute({id : -1, value: 10} , function(data){
                console.log(typeof data.error);
                assert.isUndefined(data.account);
                done();
            });

        })
    })
});