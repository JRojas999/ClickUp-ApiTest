import { expect } from "chai";
import { validateJson } from "../utils/utils.js";

export const assertions = (response, schema, data, statusCode = 200) => {
  expect(validateJson(schema, response.body)).to.be.true;
  if (data)
    for (const key in data) {
      if (response.body[key] && typeof response.body[key] !== "object") {
        expect(data[key] == response.body[key]).to.be.true;
      }
    }
  expect(response.statusCode).to.be.equal(statusCode);
};

export const deleteAssertions = (response, expectedStatus = 200) => {
  expect(response.statusCode).to.be.equal(expectedStatus);
  if (expectedStatus === 204) expect(response.noContent).to.be.true;
};
