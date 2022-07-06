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
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Invalid Path");
      });
  });
});

describe("GET /api/reviews", () => {
  describe.only("GET /api/reviews/:review_id", () => {
    test("status 200: responds with review object with relevant keys ", () => {
      return request(app)
        .get("/api/reviews/3")
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual({
            review_id: 3,
            title: "Ultimate Werewolf",
            category: "social deduction",
            designer: "Akihisa Okui",
            owner: "bainesface",
            review_body: "We couldn't find the werewolf!",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            created_at: "2021-01-18T10:01:41.251Z",
            votes: 5,
          });
          expect(body).toHaveProperty("review_id");
          expect(body).toHaveProperty("title");
          expect(body).toHaveProperty("review_body");
          expect(body).toHaveProperty("designer");
          expect(body).toHaveProperty("review_img_url");
          expect(body).toHaveProperty("votes");
          expect(body).toHaveProperty("category");
          expect(body).toHaveProperty("owner");
          expect(body).toHaveProperty("created_at");
        });
    });
    test("returns status: 404 if review_id is not found", () => {
      return request(app)
        .get("/api/reviews/33")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("review_id not found");
        });
    });
    test("returns status: 400 if review_id is invalid", () => {
      return request(app)
        .get("/api/reviews/banana")
        .expect(400);
    });
  });
});
