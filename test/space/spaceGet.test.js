import spacedata from "../../src/resources/payload/spacePayload/spaceData.json"  with { type: "json" };
import spaceSchema from "../../src/resources/schema/spaceSchema.json"  with { type: "json" };
import errorSchema from "../../src/resources/schema/errorSchema.json" with { type: "json" };
import { get, update } from "../../src/clickupApi/requestBase.js";
import { setUri } from "../../src/utils/utils.js";
import { space } from "../../src/clickupApi/endpoint.js";
import { spaceId } from "../../src/credentials/credentials.js";
import { assertions } from "../../src/assertions/assertions.js";

describe("Verify Space endpoints", () => {
  const badSpaceId = "89613212";

  before(async () => {
    await update(setUri(space, spaceId), spacedata);
  });

  it("Should get a space", async () => {
    const response = await get(setUri(space, spaceId));
    assertions(response, spaceSchema, spacedata);
  });

  it("Should not get a space", async () => {
    const response = await get(setUri(space, badSpaceId));
    assertions(response, errorSchema, undefined, 401);
  });
});
