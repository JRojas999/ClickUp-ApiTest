import taskData from "../../src/resources/payload/taskPayload/taskData.json"  with { type: "json" };
import listdata from "../../src/resources/payload/listPayload/listData.json"  with { type: "json" };
import taskSchema from "../../src/resources/schema/taskSchema.json"  with { type: "json" };
import errorSchema from "../../src/resources/schema/errorSchema.json" with { type: "json" };
import { create, deleteR, get } from "../../src/clickupApi/requestBase.js";
import { setUri } from "../../src/utils/utils.js";
import { spaceId } from "../../src/resources/ids/validIds.js";
import { badTaskId } from "../../src/resources/ids/invalidIds.js";
import { task, tasks, list, lists } from "../../src/clickupApi/endpoint.js";
import {
  assertions,
  deleteAssertions,
} from "../../src/assertions/assertions.js";

describe("Verify getting and deleting Task", () => {
  let listId = "";
  let taskId = "";

  before(async () => {
    const listResponse = await create(setUri(lists, spaceId), listdata);
    listId = listResponse.body.id;
  });

  after(async () => {
    deleteR(setUri(list, listId));
  });

  describe("Verify getting and deleting Task positive cases", () => {
    beforeEach(async () => {
      const response = await create(setUri(tasks, listId), taskData);
      taskId = response.body.id;
    });

    afterEach(async () => {
      await deleteR(setUri(task, taskId));
    });

    it("Should get a task", async () => {
      const response = await get(setUri(task, taskId));
      assertions(response, taskSchema, taskData);
    });

    it("Should delete a task", async () => {
      const response = await deleteR(setUri(task, taskId));
      deleteAssertions(response, 204);
    });
  });

  describe("Verify getting and deleting Task negative cases", () => {
    it("Should not get a task", async () => {
      const response = await get(setUri(task, badTaskId));
      assertions(response, errorSchema, undefined, 401);
    });

    it("Should not delete a task", async () => {
      const response = await deleteR(setUri(task, badTaskId));
      assertions(response, errorSchema, undefined, 401);
    });
  });
});
