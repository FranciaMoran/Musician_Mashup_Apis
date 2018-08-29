 
 const chai = require('chai');
 const chaiHttp = require('chai-http');

 const {app} = require('../server');

 const should = chai.should();
 chai.use(chaiHttp);

 describe('API', function() {

   it('should 200 on GET requests testing', function() {
     return chai.request(app)
       .get('/')
       .then(function(res) {
         res.should.be.json;
       });
   });
 });