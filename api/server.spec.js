const request = require('supertest');
const server = require('./server');
const db = require('../database/dbConfig');

/*
  1. does it return the correct status code for the input provided?
  2. does it return the data in the expected format?
  3. does the data returned, if any, have the right content? 
*/

describe("POST /register", () => {

  describe('Registering a user', () => {
    beforeEach(async () => {
      await db('users')
      .truncate()
    })

    it('Should register a user and return the proper status code', async () => {
      const newUser = await request(server)
                            .post('/api/auth/register')
                            .send({username: "John Doe", password: "Test123"})
      expect(newUser.status).toBe(201)
    })

    it('Should register a user and return the newly created user', async () => {
      const newUser = await request(server)
                            .post('/api/auth/register')
                            .send({username: "John Doe", password: "Test123"})
      expect(newUser.body.data.username).toMatch(/John Doe/i);
      expect(newUser.body.data.id).toBe(1);
    })

    it("Should register a user and come back in JSON format",async () => {
      const newUser = await request(server)
                            .post('/api/auth/register')
                            .send({username: "John Doe", password: "Test123"})
      expect(newUser.type).toMatch(/json/i);
    })
  })
})
