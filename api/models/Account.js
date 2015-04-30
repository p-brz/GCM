/**
* Account.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        username: {
            type: 'STRING',
            defaultsTo: ''
        },
        balance : {
            type: 'float',
            defaultsTo: 0.0
        },
        bonus : {
            type : 'integer',
            defaultsTo: 0
        },
        savings : {
            model : 'Savings'
        }
    }
};
