import listOfLists from "../../src/resources/payload/listPayload/listOfLists.json"  with { type: "json" };
import listOfBadLists from "../../src/resources/payload/listPayload/listOfBadLists.json"  with { type: "json" };
import listSchema from "../../src/resources/schema/listSchema.json"  with { type: "json" };
import errorSchema from "../../src/resources/schema/errorSchema.json"  with { type: "json" };
import { create, deleteR } from "../../src/clickupApi/requestBase.js";
import { setUri } from "../../src/utils/utils.js";
import { list, lists } from "../../src/clickupApi/endpoint.js";
import { spaceId } from "../../src/resources/ids/validIds.js";
import { assertions } from "../../src/assertions/assertions.js";

describe("Verify creating List positive cases", () => {
  let listId = "";

  afterEach(async () => {
    await deleteR(setUri(list, listId));
  });

  listOfLists.forEach((listdata, index) => {
    it(`Should create a list. Case: ${index + 1}`, async () => {
      const response = await create(setUri(lists, spaceId), listdata);
      listId = response.body.id;
      assertions(response, listSchema, listdata);
    });
  });
});

describe("Verify creating List negative cases", () => {
  listOfBadLists.forEach((list, index) => {
    it(`Should not create a list. Case: ${index + 1}`, async () => {
      const response = await create(setUri(lists, spaceId), list.data);
      assertions(response, errorSchema, undefined, list.status);
    });
  });
});
