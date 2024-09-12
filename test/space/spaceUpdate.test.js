import updatedSpaceList from "../../src/resources/payload/spacePayload/updatedSpaceList.json"  with { type: "json" };
import badUpdatedSpaceList from "../../src/resources/payload/spacePayload/badUpdatedSpaceList.json"  with { type: "json" };
import spaceSchema from "../../src/resources/schema/spaceSchema.json"  with { type: "json" };
import errorSchema from "../../src/resources/schema/errorSchema.json"  with { type: "json" };
import { update } from "../../src/clickupApi/requestBase.js";
import { setUri } from "../../src/utils/utils.js";
import { space as spaceEndpoint } from "../../src/clickupApi/endpoint.js";
import { spaceId } from "../../src/credentials/credentials.js";
import { assertions } from "../../src/assertions/assertions.js";

describe("Verify updating Space", () => {
  describe("Verify updating Space positive cases", () => {
    updatedSpaceList.forEach((updatedspace, index) => {
      it(`Should update a space. Case: ${index + 1}`, async () => {
        const response = await update(
          setUri(spaceEndpoint, spaceId),
          updatedspace
        );
        assertions(response, spaceSchema, updatedspace);
      });
    });
  });

  describe("Verify updating Space negative cases", () => {
    badUpdatedSpaceList.forEach((space, index) => {
      it(`Should not update a space. Case: ${index + 1}`, async () => {
        const response = await update(
          setUri(spaceEndpoint, spaceId),
          space.data
        );
        assertions(response, errorSchema, undefined, space.status);
      });
    });
  });
});
