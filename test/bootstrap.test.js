/**
 * Created by alisonbnt on 18/06/15.
 */

var Sails = require('sails'),sails;

before(function(done) {
    Sails.lift({
        // configuration for testing purposes
    }, function(err, server) {
        console.log('Callback [Sails.lift]');
        console.log(err);
        sails = server;
        if (err) return done(err);
        // here you can load fixtures, etc.
        console.log('[Before Done] Callback [Sails.lift]');
        done(err, sails);
        console.log('[After Done] Callback [Sails.lift]');
    });
});

//after(function(done) {
//    // here you can clear fixtures, etc.
//    sails.lower(done);
//});

after(function(done) {
    done();
});