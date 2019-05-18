const supertest = require("supertest");
const should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:31906");

//Unit test begin
describe('Testovi za post metodu fox/teme/izmjeniTemu/:idTeme', ()=> {
  it('Treba da vrati status 200 i poruku \'Uspjesno azurirana tema!\'', (done) => {
    //API call
    server.put('/fox/teme/izmjeniTemu/2')
    .send({
      "naziv": "Test update tema",
      "opis": "Ovo je opis testne update teme"
    })
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err, res) {
      //console.log(res.body.message);
      res.statusCode.should.equal(200);
      res.body.message.should.equal('Uspjesno azurirana tema!');
      done();
    })
  });

  it('Treba da vrati status 400 i poruku \'Neispravni parametri unutar body-a! Ocekivani format formatu [naziv, opis]\'', (done) => {
    //API call
    server.put('/fox/teme/izmjeniTemu/2')
    .send({
        "nazivi": "Test update tema",
        "opisi": "Ovo je opis testne update teme"
    })
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err, res) {
      res.statusCode.should.equal(400);
      res.body.message.should.equal('Neispravni parametri unutar body-a! Ocekivani format formatu [naziv, opis]');
      done();
    })
  });

  it('Treba da vrati status 404 i poruku \'Neispravan id teme!\' za nepostojeci idPredmeta', (done) => {
    //API call
    server.put('/fox/teme/izmjeniTemu/-1')
    .send({
        "naziv": "Test update tema",
        "opis": "Ovo je opis testne update teme"
    })
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err, res) {
      res.statusCode.should.equal(404);
      res.body.message.should.equal('Neispravan id teme!');
      done();
    })
  });

});
