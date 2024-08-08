import {Controller, Get, Post, Body} from "@midwayjs/core";
import * as fs from 'fs'
import {readFileSync} from "node:fs";

@Controller('/')
export class SaveController {
  @Get ('/projects')
  async getProjects(): Promise<String[]> {
    const project_data = fs.readFileSync('projects.txt', 'utf8');
    const spliter = project_data.split(/\r?\n/);
    let load_projects: String[] = spliter;
    return load_projects;
  }

  @Get('/tasks')
  async getTasks(): Promise<String[]> {
    const task_data = fs.readFileSync('tasks.txt', 'utf8');
    const spliter = task_data.split(/\r?\n/);
    let load_tasks: String[] = spliter;
    return load_tasks;
  }

  @Get('/complete_tasks')
  async getDeleteTasks(): Promise<String[]> {
    const complete_task_data = fs.readFileSync('complete_tasks.txt', 'utf8');
    const spliter = complete_task_data.split(/\r?\n/);
    let load_complete_tasks: String[] = spliter;
    return load_complete_tasks;
  }

  @Post('/projects')
  async postProjects(@Body() body: any): Promise<boolean> {
    let judger = true;
    let add_project = body.newProject + '\n';
    fs.appendFileSync('projects.txt', add_project, 'utf8');
    return judger;
  }

  @Post ('/tasks')
  async postTasks(@Body() body: any): Promise<boolean> {
    let judger = true;
    let add_task = body.newTask + '\n';
    fs.appendFileSync('tasks.txt', add_task, 'utf8');

    return judger;
  }

  @Post ('/complete_tasks')
  async postCompleteTasks(@Body() body: any): Promise<boolean> {
    let judger = true;
    let add_task = body.newTask + '\n';
    fs.appendFileSync('complete_tasks.txt', add_task, 'utf8');

    let complete_task: string = body.newTask;
    const task_list_draw = readFileSync('tasks.txt', 'utf8').split('\n');
    const task_list = task_list_draw.filter(line => line.trim() !== '');
    fs.writeFileSync('tasks.txt', '');
    for (let task of task_list) {
      if (task != complete_task) {
        task = task + '\n';
        fs.appendFileSync('tasks.txt', task, 'utf8');
      }
    }
    return judger;
  }

  @Post ('/delete_tasks')
  async deleteTasks(@Body() body: any): Promise<boolean> {
    let judger = true;
    let deleted_task = body.deleteTask;
    const task_list_draw = readFileSync('tasks.txt', 'utf8').split('\n');
    const task_list = task_list_draw.filter(line => line.trim() !== '');
    fs.writeFileSync('tasks.txt', '');
    for (let task of task_list) {
      if (task != deleted_task) {
        task = task + '\n';
        fs.appendFileSync('tasks.txt', task, 'utf8');
      }
    }

    return judger;
  }

  @Post ('/delete_complete_tasks')
  async deleteCompleteTasks(@Body() body: any): Promise<boolean> {
    let judger = true;
    let deleted_task = body.deleteTask;
    const task_list_draw = readFileSync('complete_tasks.txt', 'utf8').split('\n');
    const task_list = task_list_draw.filter(line => line.trim() !== '');
    fs.writeFileSync('complete_tasks.txt', '');
    for (let task of task_list) {
      if (task != deleted_task) {
        task = task + '\n';
        fs.appendFileSync('complete_tasks.txt', task, 'utf8');
      }
    }

    return judger;
  }


}

