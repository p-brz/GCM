/**
 * Created by alisonbnt on 18/06/15.
 */


BalanceCmd = require('../api/cmds/BalanceCommand.js');

var assert = require('chai').assert;
describe('BalanceCmd', function(){
    describe('#execute()', function(){
        it('should return user', function(done){
            Account.create({username:'Manolo', balance: 1000}).exec(function (err, created){
                console.log('Example account has been created');
                BalanceCmd.execute({id : created.id} , function(data){
                    assert.equal(1000, data.account.balance);
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

describe('BalanceCmd', function(){
    describe('#execute()', function(){
        it('should return error', function(done){
            BalanceCmd.execute({id : -1} , function(data){
                console.log(typeof data.error);
                assert.isUndefined(data.account);
                done();
            });

        })
    })
});
