import { Controller, Get, Post, Body } from '@midwayjs/core';
//import * as fs from 'fs';
import { readFileSync, appendFileSync, writeFileSync } from 'fs';

@Controller('/')
export class SaveController {

  private readFile(fileName: string): string[] {
    try {
      const data = readFileSync(fileName, 'utf8');
      return data.split(/\r?\n/).filter(line => line.trim() !== '');
    } catch (error) {
      console.error(`Error reading file ${fileName}:`, error);
      return [];
    }
  }

  private writeFile(fileName: string, content: string[]): void {
    try {
      writeFileSync(fileName, content.join('\n') + '\n', 'utf8');
    } catch (error) {
      console.error(`Error writing file ${fileName}:`, error);
    }
  }

  @Get('/comments')
  async getComments(): Promise<string[]> {
    return this.readFile('comments.txt');
  }

  @Get('/projects')
  async getProjects(): Promise<string[]> {
    return this.readFile('projects.txt');
  }

  @Get('/tasks')
  async getTasks(): Promise<string[]> {
    return this.readFile('tasks.txt');
  }

  @Get('/complete_tasks')
  async getCompleteTasks(): Promise<string[]> {
    return this.readFile('complete_tasks.txt');
  }

  @Post('/projects')
  async postProjects(@Body() body: { newProject: string }): Promise<boolean> {
    try {
      appendFileSync('projects.txt', body.newProject + '\n', 'utf8');
      return true;
    } catch {
      return false;
    }
  }

  @Post('/tasks')
  async postTasks(@Body() body: { newTask: string }): Promise<boolean> {
    try {
      appendFileSync('tasks.txt', body.newTask + '\n', 'utf8');
      return true;
    } catch {
      return false;
    }
  }

  @Post('/complete_tasks')
  async postCompleteTasks(@Body() body: { newTask: string }): Promise<boolean> {
    try {
      const completeTask = body.newTask;
      const tasks = this.readFile('tasks.txt').filter(task => task !== completeTask);
      this.writeFile('tasks.txt', tasks);
      appendFileSync('complete_tasks.txt', completeTask + '\n', 'utf8');
      return true;
    } catch {
      return false;
    }
  }

  @Post('/delete_tasks')
  async deleteTasks(@Body() body: { deleteTask: string }): Promise<boolean> {
    try {
      const tasks = this.readFile('tasks.txt').filter(task => task !== body.deleteTask);
      this.writeFile('tasks.txt', tasks);
      return true;
    } catch {
      return false;
    }
  }

  @Post('/delete_complete_tasks')
  async deleteCompleteTasks(@Body() body: { deleteTask: string }): Promise<boolean> {
    try {
      const completeTasks = this.readFile('complete_tasks.txt').filter(task => task !== body.deleteTask);
      this.writeFile('complete_tasks.txt', completeTasks);
      return true;
    } catch {
      return false;
    }
  }

  @Post('/addComments')
  async addComments(@Body() body: { content: string, number: number }): Promise<boolean> {
    try {
      const comments = this.readFile('comments.txt');
      comments.splice(body.number, 0, body.content);
      this.writeFile('comments.txt', comments);
      return true;
    } catch {
      return false;
    }
  }
}
