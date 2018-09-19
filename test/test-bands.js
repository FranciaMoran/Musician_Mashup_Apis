const router = express.Router();
const {Bands} = require('../users/models');
const { app, runServer, closeServer } = require('../server')
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);
const expect = chai.expect;



function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

describe('POST in users', function () {

  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

afterEach(function () {
    return tearDownDb();
  });


  after(function () {
    return closeServer();
  });

    it('should add a new band', function () {

      const newBand = {
      bandName: faker.commerce.color(), 
      memberOne: faker.name.firstName()
      };
      return chai.request(app)
        .post('/api/bands')
        .send(newBand)
        .then(function (res) { 
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'bandName', 'memberOne');
          res.body.bandName.should.equal(newBand.bandName);
          res.body.memberOne.should.equal(newBand.memberOne);
          return Band.findById(res.body.id);
        })
        .then(function (post) {
          post.bandName.should.equal(newBand.bandName);
          post.memberOne.should.equal(newBand.memberOne);
        })
    });
  });


