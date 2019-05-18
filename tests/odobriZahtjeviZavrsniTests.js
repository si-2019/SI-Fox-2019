const supertest = require("supertest");
const should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:31906");

//Unit test begin
describe('Testovi za put metodu fox/teme/odobri/:idTeme', ()=> {
  it('Treba da vrati status 200', (done) => {
    //API call
    server.put('/fox/teme/odobri/2')
    .send({
      "naziv": "Test update tema",
      "opis": "Ovo je opis testne update teme"
    })
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err, res) {
      //console.log(res.body.message);
      res.statusCode.should.equal(200);
      done();
    })
  });

  it('Treba da vrati status 404 i poruku \'Greska! Ne postoji tema sa id-em idTeme.\'', (done) => {
    //API call
    server.put('/fox/teme//odobri/-1')
    .send({
        "naziv": "Test update tema",
        "opis": "Ovo je opis testne update teme"
    })
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err, res) {
      res.statusCode.should.equal(404);
      res.body.message.should.equal('Greska! Ne postoji tema sa id-em idTeme.');
      done();
    })
  });

});
