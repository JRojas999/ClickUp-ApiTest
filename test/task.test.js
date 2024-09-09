import taskData from "../src/resources/payload/taskData.json"  with { type: "json" };
import updatedtask1 from "../src/resources/payload/updatedTaskData.json"  with { type: "json" };
import taskSchema from "../src/resources/schema/taskSchema.json"  with { type: "json" };
import spacedata from "../src/resources/payload/spaceData.json"  with { type: "json" };
import listdata from "../src/resources/payload/listData.json"  with { type: "json" };
import { create, deleteR, get, update } from "../src/clickupApi/requestBase.js";
import { setUri } from "../src/utils/utils.js";
import { teamId } from "../src/credentials/credentials.js";
import {
  task,
  tasks,
  lists,
  space,
  spaces,
} from "../src/clickupApi/endpoint.js";
import { assertions, deleteAssertions } from "../src/assertions/assertions.js";

describe("Verify Task endpoints", () => {
  let spaceId = "";
  let listId = "";
  let taskId = "";

  before(async () => {
    const spaceResponse = await create(setUri(spaces, teamId), spacedata);
    spaceId = spaceResponse.body.id;
    const listResponse = await create(setUri(lists, spaceId), listdata);
    listId = listResponse.body.id;
  });

  after(async () => {
    await deleteR(setUri(space, spaceId));
  });

  afterEach(async () => {
    await deleteR(setUri(task, taskId));
  });

  it("Should create a task", async () => {
    const response = await create(setUri(tasks, listId), taskData);
    taskId = response.body.id;
    assertions(response, taskSchema, taskData);
  });

  describe("Verify RUD Task endpoints", () => {
    beforeEach(async () => {
      const response = await create(setUri(tasks, listId), taskData);
      taskId = response.body.id;
    });

    it("Should get a task", async () => {
      const response = await get(setUri(task, taskId));
      assertions(response, taskSchema, taskData);
    });

    it("Should update a task", async () => {
      const response = await update(setUri(task, taskId), updatedtask1);
      assertions(response, taskSchema, updatedtask1);
    });

    it("Should delete a task", async () => {
      const response = await deleteR(setUri(task, taskId));
      deleteAssertions(response, 204);
    });
  });
});
