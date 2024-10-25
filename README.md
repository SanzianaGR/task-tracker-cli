# task-tracker-cli
🛠️ Solution for the roadmap.sh [backend challenge](https://roadmap.sh/projects/task-tracker)



## Description
The user should be able to: <br>

* Add, Update, and Delete tasks
* Mark a task as in progress or done
* List all tasks
* List all tasks that are done
* List all tasks that are not done
* List all tasks that are in progress

## Constraints
* use positional args in command line to accept user inputs
* Use a JSON file to store the tasks in the current directory
* The JSON file should be created if it does not exist.
* Use the native file system module of your programming language to interact with the JSON file.
* Do not use any external libraries or frameworks to build this project.
* Ensure to handle errors and edge cases gracefully.

## Commands

| Command         | Arguments    | Description     | Example                                      |
|--------------|------------------------|-------------------------------------------------------|----------------------------------------------|
| `add`        | `<description>`        | Adds a new task with the given description.           | `node index.js add "Finish the app"`         |
| `list`       | `[status]`             | Lists tasks. Optional `status`: `todo`, `done`, `inprogress` | `node index.js list done`           |
| `update`     | `<id> <new description>` | Updates the task with the given ID.                 | `node index.js update 1 "New task description"` |
| `delete`     | `<id>`                 | Deletes the task with the given ID.                   | `node index.js delete 1`                    |
| `done`       | `<id>`                 | Marks the task with the given ID as "done."           | `node index.js done 2`                      |
| `inprogress` | `<id>`                 | Marks the task with the given ID as "in progress."    | `node index.js inprogress 3`                |
