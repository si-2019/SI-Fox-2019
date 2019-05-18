const supertest = require("supertest");
const should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:31906");

//Unit test begin
describe('Testovi za delete metodu fox/teme/izbrisiTemu/:idTeme', ()=> {
    it('Treba da vrati status 200 za idTeme (potrebno unijeti idTeme koja postoji u bazi)', (done) => {
      //API call
      server.delete('/fox/teme/izbrisiTemu/8')
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err, res) {
        res.statusCode.should.equal(200);
        res.body.message.should.equal('Uspjesno obrisana tema!');
        done();
      })
    });
    it('Treba da vrati status 404 za idTeme -1', (done) => {
        //API call
        server.delete('/fox/teme/izbrisiTemu/-1')
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err, res) {
          res.statusCode.should.equal(404);
          //res.body.message.should.equal('Neispravan id teme!');
          done();
        })
      });
});