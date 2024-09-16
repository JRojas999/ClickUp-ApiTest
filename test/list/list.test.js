import listdata from "../../src/resources/payload/listPayload/listData.json"  with { type: "json" };
import listSchema from "../../src/resources/schema/listSchema.json"  with { type: "json" };
import errorSchema from "../../src/resources/schema/errorSchema.json" with { type: "json" };
import { create, deleteR, get } from "../../src/clickupApi/requestBase.js";
import { setUri } from "../../src/utils/utils.js";
import { list, lists } from "../../src/clickupApi/endpoint.js";
import { spaceId } from "../../src/resources/ids/validIds.js";
import { badListId } from "../../src/resources/ids/invalidIds.js";
import {
  assertions,
  deleteAssertions,
} from "../../src/assertions/assertions.js";

describe("Verify getting and deleting List positive cases", () => {
  let listId = "";

  beforeEach(async () => {
    const response = await create(setUri(lists, spaceId), listdata);
    listId = response.body.id;
  });

  afterEach(async () => {
    await deleteR(setUri(list, listId));
  });

  it("Should get a list", async () => {
    const response = await get(setUri(list, listId));
    assertions(response, listSchema, listdata);
  });

  it("Should delete a list", async () => {
    const response = await deleteR(setUri(list, listId));
    deleteAssertions(response);
  });
});

describe("Verify getting and deleting List negative cases", () => {
  it("Should not get a list", async () => {
    const response = await get(setUri(list, badListId));
    assertions(response, errorSchema, undefined, 401);
  });

  it("Should not delete a list", async () => {
    const response = await deleteR(setUri(list, badListId));
    assertions(response, errorSchema, undefined, 401);
  });
});
