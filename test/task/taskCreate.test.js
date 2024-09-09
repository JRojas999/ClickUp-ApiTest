import taskList from "../../src/resources/payload/taskPayload/taskList.json"  with { type: "json" };
import badTaskList from "../../src/resources/payload/taskPayload/badTaskList.json"  with { type: "json" };
import taskSchema from "../../src/resources/schema/taskSchema.json"  with { type: "json" };
import errorSchema from "../../src/resources/schema/errorSchema.json"  with { type: "json" };
import listData from "../../src/resources/payload/listPayload/listData.json"  with { type: "json" };
import { create, deleteR } from "../../src/clickupApi/requestBase.js";
import { setUri } from "../../src/utils/utils.js";
import { task, tasks, list, lists } from "../../src/clickupApi/endpoint.js";
import { spaceId } from "../../src/credentials/credentials.js";
import { assertions } from "../../src/assertions/assertions.js";

describe("Verify creating Task", () => {
  let listId = "";
  let taskId = "";

  before(async () => {
    const listResponse = await create(setUri(lists, spaceId), listData);
    listId = listResponse.body.id;
  });

  after(async () => {
    await deleteR(setUri(list, listId));
  });

  describe("Verify creating Task positive cases", () => {
    afterEach(async () => {
      await deleteR(setUri(task, taskId));
    });

    taskList.forEach((taskData, index) => {
      it(`Should create a task. Case: ${index + 1}`, async () => {
        const response = await create(setUri(tasks, listId), taskData);
        taskId = response.body.id;
        assertions(response, taskSchema, taskData);
      });
    });
  });

  describe("Verify creating Task negative cases", () => {
    badTaskList.forEach((task, index) => {
      it(`Should not create a task. Case: ${index + 1}`, async () => {
        const response = await create(setUri(tasks, listId), task.data);
        assertions(response, errorSchema, undefined, task.status);
      });
    });
  });
});
