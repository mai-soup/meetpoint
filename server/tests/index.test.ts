import request from "supertest";
import mongoose from "mongoose";
import Group from "../models/Group";
import { app, server, store } from "../index";

const mockGroup1 = {
  title: "Test Group 1",
  owner: "owner1Id",
  description: "This is a test group",
  createdOn: new Date().toISOString(),
  location: "Test location",
  geometry: {
    type: "Point",
    coordinates: [123, 456],
  },
  isPrivate: false,
  tags: ["tag1Id", "tag2Id"],
  members: ["member1Id", "member2Id"],
  pendingMembers: [],
  meetups: ["meetup1Id"],
  logo: {
    url: "https://example.com/test.jpg",
    filename: "test.jpg",
  },
};

const mockGroup2 = {
  title: "Test Group 2",
  owner: "owner2Id",
  description: "This is another test group",
  createdOn: new Date().toISOString(),
  location: "Test location 2",
  geometry: {
    type: "Point",
    coordinates: [234, 567],
  },
  isPrivate: false,
  tags: ["tag1Id", "tag3Id"],
  members: ["member1Id", "member4Id", "member2Id"],
  pendingMembers: [],
  meetups: [],
  logo: {
    url: "https://example.com/test.png",
    filename: "test.png",
  },
};

describe("GET /", () => {
  it(`responds with "HEYO FROM EXPRESS"`, async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("HEYO FROM EXPRESS");
  });
});

describe("GET /groups", () => {
  it("responds with a list of groups", async () => {
    // mock the Group.find function to return a test value
    const mockGroups = [mockGroup1, mockGroup2];
    Group.find = jest.fn().mockResolvedValue(mockGroups);

    const response = await request(app).get("/groups");

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.text)).toEqual(mockGroups);
  });
});

afterAll(async () => {
  await server.close();
  await mongoose.connection.close();
  await store.close();
});
