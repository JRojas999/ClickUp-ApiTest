import listdata from "../../src/resources/payload/listPayload/listData.json" with { type: "json" };
import listOfUpdatedLists from "../../src/resources/payload/listPayload/listOfUpdatedLists.json" with { type: "json" };
import listOfBadUpdatedLists from "../../src/resources/payload/listPayload/listOfBadUpdatedLists.json" with { type: "json" };
import listSchema from "../../src/resources/schema/listSchema.json" with { type: "json" };
import errorSchema from "../../src/resources/schema/errorSchema.json" with { type: "json" };
import { create, deleteR, update } from "../../src/clickupApi/requestBase.js";
import { setUri } from "../../src/utils/utils.js";
import { list as listEndpoint, lists } from "../../src/clickupApi/endpoint.js";
import { spaceId } from "../../src/credentials/credentials.js";
import { assertions } from "../../src/assertions/assertions.js";

describe("Verify updating List", () => {
  let listId = "";

  before(async () => {
    const response = await create(setUri(lists, spaceId), listdata);
    listId = response.body.id;
  });

  after(async () => {
    await deleteR(setUri(listEndpoint, listId));
  });

  describe("Verify updating List positive cases", () => {
    listOfUpdatedLists.forEach((listdata, index) => {
      it(`Should update a list. Case: ${index + 1}`, async () => {
        const response = await update(setUri(listEndpoint, listId), listdata);
        assertions(response, listSchema, listdata);
      });
    });
  });

  describe("Verify updating List negative cases", () => {
    listOfBadUpdatedLists.forEach((list, index) => {
      it(`Should not update a list. Case: ${index + 1}`, async () => {
        const response = await update(setUri(listEndpoint, listId), list.data);
        assertions(response, errorSchema, undefined, list.status);
      });
    });
  });
});
