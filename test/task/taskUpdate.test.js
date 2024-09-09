import listdata from "../../src/resources/payload/listPayload/listData.json" with { type: "json" };
import taskData from "../../src/resources/payload/taskPayload/taskData.json"  with { type: "json" };
import updatedTaskList from "../../src/resources/payload/taskPayload/updatedTaskList.json" with { type: "json" };
import badUpdatedTaskList from "../../src/resources/payload/taskPayload/badUpdatedTaskList.json" with { type: "json" };
import taskSchema from "../../src/resources/schema/taskSchema.json" with { type: "json" };
import errorSchema from "../../src/resources/schema/errorSchema.json" with { type: "json" };
import { create, deleteR, update } from "../../src/clickupApi/requestBase.js";
import { setUri } from "../../src/utils/utils.js";
import {
  task as taskEndpoint,
  tasks,
  list,
  lists,
} from "../../src/clickupApi/endpoint.js";
import { spaceId } from "../../src/credentials/credentials.js";
import { assertions } from "../../src/assertions/assertions.js";

describe("Verify updating Task", () => {
  let listId = "";
  let taskId = "";

  before(async () => {
    const listResponse = await create(setUri(lists, spaceId), listdata);
    listId = listResponse.body.id;
    const taskResponse = await create(setUri(tasks, listId), taskData);
    taskId = taskResponse.body.id;
  });

  after(async () => {
    await deleteR(setUri(list, listId));
  });

  describe("Verify updating Task negative cases", () => {
    updatedTaskList.forEach((taskData, index) => {
      it(`Should update a task. Case: ${index + 1}`, async () => {
        const response = await update(setUri(taskEndpoint, taskId), taskData);
        assertions(response, taskSchema, taskData);
      });
    });
  });

  describe("Verify updating Task negative cases", () => {
    badUpdatedTaskList.forEach((task, index) => {
      it(`Should not update a task. Case: ${index + 1}`, async () => {
        const response = await update(setUri(taskEndpoint, taskId), task.data);
        assertions(response, errorSchema, undefined, task.status);
      });
    });
  });
});
