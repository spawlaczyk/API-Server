const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concerts.models');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  before(async () => {
    const testConcertOne = new Concert({
      _id: '5d9f1140f10a81216cfd4408',
      performer: 'TestPerformer1',
      genre: 'TestGenre1',
      price: 30,
      day: 1,
      image: '/img/uploads/1fsd324fsdg.jpg'
    });
    await testConcertOne.save();

    const testConcertTwo = new Concert({
      _id: '5d9f1159f81ce8d1ef2bee48',
      performer: 'TestPerformer2',
      genre: 'TestGenre2',
      price: 40,
      day: 2,
      image: '/img/uploads/1fsd324fsdg.jpg'
    });
    await testConcertTwo.save();
  });
  after(async () => {
    await Concert.deleteMany();
  });

  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
  });
  it('/:id should return one concert by :id', async () => {
    const res = await request(server).get('/api/concerts/5d9f1159f81ce8d1ef2bee48');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });
  it('/performer/:performer should return one performer', async () => {
    const res = await request(server).get('/api/concerts/performer/TestPerformer1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });
  it('/genre/:genre should return one genre', async () => {
    const res = await request(server).get('/api/genre/TestGenre1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });
  it('/price/:minPrice/:maxPrice should return concerts in price range', async () => {
    const res = await request(server).get('/api/concerts/price/30/40');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });
  it('/day/:day should return concerts by :day', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });
});