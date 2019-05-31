const supertest = require("supertest");
const should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:31906");

//Unit test begin
describe('Testovi za get metodu fox/bodoviIspit/:idKorisnika/:idIspita', ()=> {
    it('Treba da vrati status 200 za idKorisnika 1 i idIspita 1', (done) => {
      //API call
      server.get('/fox/bodoviIspit/1/1')
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err, res) {
        res.statusCode.should.equal(200);
        done();
      })
    });

    it('Treba da vrati status 404 za idKorisnika -1', (done) => {
        //API call
        server.get('/fox/bodoviIspit/-1/1')
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err, res) {
          res.statusCode.should.equal(404);
          done();
        })
      });

      it('Treba da vrati status 404 za idIspita -1', (done) => {
        //API call
        server.get('/fox/bodoviIspit/1/-1')
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err, res) {
          res.statusCode.should.equal(404);
          done();
        })
      });
});