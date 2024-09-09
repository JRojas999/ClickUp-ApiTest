import listdata from "../src/resources/payload/listData.json"  with { type: "json" };
import updatedList1 from "../src/resources/payload/updatedListData.json"  with { type: "json" };
import spacedata from "../src/resources/payload/spaceData.json"  with { type: "json" };
import listSchema from "../src/resources/schema/listSchema.json"  with { type: "json" };
import { create, deleteR, get, update } from "../src/clickupApi/requestBase.js";
import { setUri } from "../src/utils/utils.js";
import { list, lists, space, spaces } from "../src/clickupApi/endpoint.js";
import { teamId } from "../src/credentials/credentials.js";
import { assertions, deleteAssertions } from "../src/assertions/assertions.js";

describe("Verify List endpoints", () => {
  let spaceId = "";
  let listId = "";

  before(async () => {
    const response = await create(setUri(spaces, teamId), spacedata);
    spaceId = response.body.id;
  });

  after(async () => {
    await deleteR(setUri(space, spaceId));
  });

  afterEach(async () => {
    await deleteR(setUri(list, listId));
  });

  it("Should create a list", async () => {
    const response = await create(setUri(lists, spaceId), listdata);
    listId = response.body.id;
    assertions(response, listSchema, listdata);
  });

  describe("Verify RUD List endpoints", () => {
    beforeEach(async () => {
      const response = await create(setUri(lists, spaceId), listdata);
      listId = response.body.id;
    });

    it("Should get a list", async () => {
      const response = await get(setUri(list, listId));
      assertions(response, listSchema, listdata);
    });

    it("Should update a list", async () => {
      const response = await update(setUri(list, listId), updatedList1);
      assertions(response, listSchema, updatedList1);
    });

    it("Should delete a list", async () => {
      const response = await deleteR(setUri(list, listId));
      deleteAssertions(response);
    });
  });
});
