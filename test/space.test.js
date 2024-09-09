import spacedata from "../src/resources/payload/spaceData.json"  with { type: "json" };
import updatedspace from "../src/resources/payload/updatedSpaceData.json"  with { type: "json" };
import spaceSchema from "../src/resources/schema/spaceSchema.json"  with { type: "json" };
import { create, deleteR, get, update } from "../src/clickupApi/requestBase.js";
import { setUri } from "../src/utils/utils.js";
import { space, spaces } from "../src/clickupApi/endpoint.js";
import { teamId } from "../src/credentials/credentials.js";
import { assertions, deleteAssertions } from "../src/assertions/assertions.js";

describe("Verify Space endpoints", () => {
  let spaceId = "";

  afterEach(async () => {
    await deleteR(setUri(space, spaceId));
  });

  describe("Verify RUD Space endpoints", () => {
    beforeEach(async () => {
      const response = await create(setUri(spaces, teamId), spacedata);
      spaceId = response.body.id;
    });

    it("Should get a space", async () => {
      const response = await get(setUri(space, spaceId));
      assertions(response, spaceSchema, spacedata);
    });

    it("Should update a space", async () => {
      const response = await update(setUri(space, spaceId), updatedspace);
      assertions(response, spaceSchema, updatedspace);
    });

    it("Should delete a space", async () => {
      const response = await deleteR(setUri(space, spaceId));
      deleteAssertions(response);
    });
  });

  it("Should create a space", async () => {
    const response = await create(setUri(spaces, teamId), spacedata);
    spaceId = response.body.id;
    assertions(response, spaceSchema, spacedata);
  });
});
