//LOS MÉTODOS AQUÍ IMPLEMENTADOS REALIZARÁN LAS CONSULTAS CON Mongoose PARA OBTENER LAS TAREAS

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'src/schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';


@Injectable()
export class TasksService{

  constructor(@InjectModel(Task.name)
  private taskModel:Model<TaskDocument>) {}


//Método para crear una nueva tarea
async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

//Método que devolverá todas las tareas de la bd
  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  //Método para devolver las tareas por su id
  async findOne(id: string): Promise<Task>{

    return this.taskModel.findById(id);
  }

//Método para actualizar una tarea de la bd
async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task>{

  return this.taskModel.findByIdAndUpdate(id, updateTaskDto);

}

//Método para eliminar una tarea
async remove(id: string): Promise<Task>{

  return this.taskModel.findByIdAndDelete(id);
  }


//Método que devolverá todas las tareas realizadas
async findDone(): Promise<Task[]>{

  return this.taskModel.find({"done": true}).exec();
}

//Método que devolverá todas las tareas que quedan por hacer
async findTodo(): Promise<Task[]>{

  return this.taskModel.find({"done": false}).exec();
  }

}
