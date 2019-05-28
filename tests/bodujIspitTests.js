const supertest = require("supertest");
const should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:31906");

//Unit test begin
describe('Testovi za post metodu fox/bodoviIspit', ()=> {
  it('Treba da vrati status 200', (done) => {
    //API call
    server.post('/fox/bodoviIspit')
    .send({
      "idIspita": 1,
      "idKorisnika": 1,
      "bodovi": 18
    })
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err, res) {
      //console.log(res.body.message);
      res.statusCode.should.equal(200);
      done();
    })
  });

  it('Treba da vrati status 404 i poruku \'Neispravni id-evi! Ne postoji idIspita ili idKorisnika sa ulogom idUloga:1 (student)\'', (done) => {
    //API call
    server.post('/fox/bodoviIspit')
    .send({
        "idIspita": -1,
        "idKorisnika": 1,
        "bodovi": 18
    })
    .expect("Content-type",/json/)
    .expect(404)
    .end(function(err, res) {
      res.statusCode.should.equal(404);
      res.body.message.should.equal('Neispravni id-evi! Ne postoji idIspita ili idKorisnika sa ulogom idUloga:1 (student)');
      done();
    })
  });

  it('Treba da vrati status 400 i poruku \'Neispravni parametri unutar body-a! Ocekivani format [idIspita, idKorisnika, bodovi]\'', (done) => {
    //API call
    server.post('/fox/bodoviIspit')
    .send({
        "idIspit": 1,
        "idKorisnik": 1,
        "bodovi": 18
    })
    .expect("Content-type",/json/)
    .expect(400)
    .end(function(err, res) {
      res.statusCode.should.equal(400);
      res.body.message.should.equal('Neispravni parametri unutar body-a! Ocekivani format [idIspita, idKorisnika, bodovi]');
      done();
    })
  });

});
