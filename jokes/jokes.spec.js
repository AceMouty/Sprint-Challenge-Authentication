const request = require('supertest');
const server = require('../api/server');

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTcxNDE1OTgzLCJleHAiOjE1NzE1MDIzODN9.23xFZZ7QLoaFO5JV6sCVHANk0tBSHJ4dBzm8YRa6gOg

describe("GET /api/jokes", () => {
  describe("Get jokes list", () => {
    it("should return a list of jokes back", async () => {
      const jokes = await request(server)
                          .get('/api/jokes')
                          .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTcxNDE1OTgzLCJleHAiOjE1NzE1MDIzODN9.23xFZZ7QLoaFO5JV6sCVHANk0tBSHJ4dBzm8YRa6gOg')
      expect(jokes.body).not.toHaveLength(0);
    })

    it("Should return with a 200 status", async () => {
      const jokes = await request(server)
                          .get('/api/jokes')
                          .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTcxNDE1OTgzLCJleHAiOjE1NzE1MDIzODN9.23xFZZ7QLoaFO5JV6sCVHANk0tBSHJ4dBzm8YRa6gOg')
      expect(jokes.status).toBe(200)
    })
  })
})