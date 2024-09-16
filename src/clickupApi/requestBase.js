import supertest from "supertest";
import { YOUR_API_KEY_HERE } from "../credentials/credentials.js";
import { baseUrl } from "./uri.js";

export const create = async (endpoint, payload) => {
  return await supertest(baseUrl)
    .post(endpoint)
    .set("Authorization", YOUR_API_KEY_HERE)
    .send(payload);
};

export const get = async (endpoint) => {
  return await supertest(baseUrl)
    .get(endpoint)
    .set("Authorization", YOUR_API_KEY_HERE)
    .send();
};

export const update = async (endpoint, payload) => {
  return await supertest(baseUrl)
    .put(endpoint)
    .set("Authorization", YOUR_API_KEY_HERE)
    .send(payload);
};

export const deleteR = async (endpoint) => {
  return await supertest(baseUrl)
    .delete(endpoint)
    .set("Authorization", YOUR_API_KEY_HERE)
    .send();
};
