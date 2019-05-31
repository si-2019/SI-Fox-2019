const supertest = require("supertest");
const should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:31906");

//Unit test begin
describe('Testovi za get metodu fox/teme/:idPredmeta', ()=> {
    it('Treba da vrati status 200 za idPredmeta 4', (done) => {
      //API call
      server.get('/fox/teme/4')
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err, res) {
        res.statusCode.should.equal(200);
        done();
      })
    });
    it('Treba da vrati status 404 za idPredmeta -1', (done) => {
        //API call
        server.get('/fox/teme/-1')
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err, res) {
          res.statusCode.should.equal(404);
          done();
        })
      });
});