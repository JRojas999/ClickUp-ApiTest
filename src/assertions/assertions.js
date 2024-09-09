import { expect } from "chai";
import { validateJson } from "../utils/utils.js";

export const assertions = (response, spaceSchema, spacedata) => {
  expect(validateJson(spaceSchema, response.body)).to.be.true;
  for (const key in spacedata) {
    expect(spacedata[key]).to.be.equal(response.body[key]);
  }
  expect(response.statusCode).to.be.equal(200);
};

export const deleteAssertions = (response, expectedStatus = 200) => {
  expect(response.statusCode).to.be.equal(expectedStatus);
  if (expectedStatus === 204) expect(response.noContent).to.be.true;
};
