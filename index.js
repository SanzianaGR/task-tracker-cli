import fs from 'fs';
import path from 'path';

const taskFilePath = path.join(process.cwd(), 'tasks.json');

const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    cyan: "\x1b[36m",
}

function readTasks() {
    if (fs.existsSync(taskFilePath)) {
        const data = fs.readFileSync(taskFilePath);
        return JSON.parse(data);
    }
    return [];
}

function writeTasks(tasks) {
    fs.writeFileSync(taskFilePath, JSON.stringify(tasks, null, 2), "utf-8");
}

function getNextId(tasks) {
    const ids = tasks.map(task => task.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
}

function listTasks(status) {
    const tasks = readTasks();
    let filteredTasks = tasks;

    if (status) {
        if (status.toLowerCase() === 'done') {
            filteredTasks = tasks.filter(task => task.completed);
        }
        else if (status.toLowerCase() === 'todo') {
            filteredTasks = tasks.filter(task => !task.completed && !task.inProgress);
        }
        else if (status.toLowerCase() === 'inprogress') {
            filteredTasks = tasks.filter(task => task.inProgress);
        }
        else {
            console.log(`${colors.red}Invalid status. Please use todo, inprogress or done${colors.reset}`);
            return;
        }
    }

    if (filteredTasks.length) {
        console.log(`${colors.cyan}Tasks${colors.reset}`);
        filteredTasks.forEach(task => {
            const status = task.completed ? 'done' : task.inProgress ? 'in progress' : 'todo';
            console.log(`${colors.cyan}${task.id}${colors.reset}: ${task.description} - ${status}`);
        });
    }
    else {
        console.log(`${colors.yellow}No tasks found${colors.reset}`);
    }
}

function addTask(description) {
    const tasks = readTasks();
    const newTask = {
        id: getNextId(tasks),
        description: description,
        completed: false,
        inProgress: false,
    };
    tasks.push(newTask);
    writeTasks(tasks);
    console.log(`${colors.green} Task added successfully ${colors.reset}`);
} 

function updateTask(id, description) {
    const tasks = readTasks();
    const task = tasks.find(task => task.id === parseInt(id));
    if (task) {
        task.description = description;
        writeTasks(tasks);
        console.log(`${colors.green} Task updated successfully ${colors.reset}`);
    }
    else {
        console.log(`${colors.red} Task not found ${colors.reset}`);
    }
}

function deleteTask(id) {
    const tasks = readTasks();
    newTasks = tasks.filter(task => tasks.id !== parseInt(id));

    if (newTasks.length < tasks.length) {
        writeTasks(newTasks);
        console.log(`${colors.green} Task deleted successfully ${colors.reset}`);
    }
    else {
        console.log(`${colors.red} Task not found ${colors.reset}`);
    }
}

function markDone(id) {
    const tasks = readTasks();
    const task = tasks.find(task => task.id === parseInt(id));

    if (task) {
        task.completed = true;
        task.inProgress = false;
        writeTasks(tasks);
        console.log(`${colors.green} Task marked as done ${colors.reset}`);
    }
    else {
        console.log(`${colors.red} Task not found ${colors.reset}`);
    }
}

function markProgress(id) {
    const tasks = readTasks();
    const task = tasks.find(task => task.id === parseInt(id));

    if (task) {
        task.inProgress = true;
        task.completed = false;
        writeTasks(tasks);
        console.log(`${colors.green} Task marked as in progress ${colors.reset}`);
    }
    else {
    console.log(`${colors.red} Task not found ${colors.reset}`);
    }
}

const args = process.argv.slice(2);
if (args.includes("add")) {
    const taskDescription = args.slice(1).join(" ");
    if (!taskDescription) {
        console.log(`${colors.red}Please provide a description${colors.reset}`);
    }
    else {
        addTask(taskDescription);
    }
}
else if (args.includes("list")) {
        const status =  args[1];
        listTasks(status);
}
else if (args.includes("update")) {
    const id = args[1];
    const description = args.slice(2).join(" ");
    if (!id || !description) {
        console.log(`${colors.red}Please provide an id and a description${colors.reset}`);
    }
    else {
        updateTask(id, description);
    }
}

else if (args.includes("delete")) {
    const id = args[1];
    if (!id) {
        console.log(`${colors.red}Please provide an id${colors.reset}`);
    }
    else {
        deleteTask(id);
    }
}

else if (args.includes("done")) {
    const id = args[1];
    if (!id) {
        console.log(`${colors.red}Please provide an id${colors.reset}`);
    }
    else {
        markDone(id);
    }
}

else if (args.includes("inprogress")) {
    const id = args[1];
    if (!id) {
        console.log(`${colors.red}Please provide an id${colors.reset}`);
    }
    else {
        markProgress(id);
    }
}
else {
    console.log(`${colors.cyan} Usage node index.js <command> [arguments] ${colors.reset}`);
    console.log(`${colors.cyan} Commands: ${colors.reset}`);
    console.log(`${colors.cyan} add <description> ${colors.reset}`);
    console.log(`${colors.cyan} list [status] ${colors.reset}`);
    console.log(`${colors.cyan} update <id> <description> ${colors.reset}`);
    console.log(`${colors.cyan} delete <id> ${colors.reset}`);
    console.log(`${colors.cyan} done <id> ${colors.reset}`);
    console.log(`${colors.cyan} inprogress <id> ${colors.reset}`);
}