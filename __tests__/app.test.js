const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /api/categories", () => {
  test("status: 200 responds with array of objects with slug and description keys", () => {
    return request(app) //supertest allows you to test use request from app UI (like postman)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual([
          {
            slug: "euro game",
            description: "Abstact games that involve little luck",
          },
          {
            slug: "social deduction",
            description: "Players attempt to uncover each other's hidden role",
          },
          { slug: "dexterity", description: "Games involving physical skill" },
          {
            slug: "children's games",
            description: "Games suitable for children",
          },
        ]);
      });
  });

  test("status 404: handles bad path", () => {
    return request(app)
      .get("/api/bad_path")
      .expect(404)
      .then(({body: {msg} }) => {
        expect(msg).toBe("Invalid Path");
      });
  });
});
