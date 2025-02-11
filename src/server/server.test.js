const request = require("supertest");
const app = require("./server");

describe("Server API Tests", () => {
    test("Server should return 404 for unknown routes", async () => {
        const response = await request(app).get("/unknown-route");
        expect(response.statusCode).toBe(404);
    });

    test("POST /getLocation should return location data", async () => {
        const response = await request(app)
            .post("/getLocation")
            .send({ city: "Paris" });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("latitude");
        expect(response.body).toHaveProperty("longitude");
        expect(response.body).toHaveProperty("country");
    });
});
