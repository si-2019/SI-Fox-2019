const supertest = require("supertest");
const should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:31906");

//Unit test begin
describe('Testovi za post metodu fox/teme/novaTema', ()=> {
  it('Treba da vrati status 200 i poruku \'Uspjesno dodana nova tema!\'', (done) => {
    //API call
    server.post('/fox/teme/novaTema')
    .send({
      "naziv": "Test tema",
      "opis": "Ovo je opis testne teme",
      "idProfesora": 246,
      "idPredmeta": 4
    })
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err, res) {
      //console.log(res.body.message);
      res.statusCode.should.equal(200);
      res.body.message.should.equal('Uspjesno dodana nova tema!');
      done();
    })
  });

  it('Treba da vrati status 400 i poruku \'Neispravni parametri unutar body-a! Ocekivani format [naziv, opis, idPredmeta, idProfesora]\'', (done) => {
    //API call
    server.post('/fox/teme/novaTema')
    .send({
      
    })
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err, res) {
      res.statusCode.should.equal(400);
      res.body.message.should.equal('Neispravni parametri unutar body-a! Ocekivani format [naziv, opis, idPredmeta, idProfesora]');
      done();
    })
  });

  it('Treba da vrati status 404 i poruku \'Neispravni id-evi!\' za nepostojeci idPredmeta', (done) => {
    //API call
    server.post('/fox/teme/novaTema')
    .send({
      "naziv": "Test tema",
      "opis": "Ovo je opis testne teme",
      "idProfesora": 246,
      "idPredmeta": -1
    })
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err, res) {
      res.statusCode.should.equal(404);
      res.body.message.should.equal('Neispravni id-evi!');
      done();
    })
  });

  it('Treba da vrati status 404 i poruku \'Neispravni id-evi!\' za nepostojeci idProfesora', (done) => {
    //API call
    server.post('/fox/teme/novaTema')
    .send({
      "naziv": "Test tema",
      "opis": "Ovo je opis testne teme",
      "idProfesora": -1,
      "idPredmeta": 4
    })
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err, res) {
      res.statusCode.should.equal(404);
      res.body.message.should.equal('Neispravni id-evi!');
      done();
    })
  });
});
