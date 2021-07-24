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


//Método para crear una nueva colección
async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

//Método que devolverá todas las colecciones de la bd
  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  //Método para devolver las colecciones por su id
  async findOne(id: string): Promise<Task>{

    return this.taskModel.findById(id);
  }

//Método para actualizar una colección de la bd
async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task>{

  return this.taskModel.findByIdAndUpdate(id, updateTaskDto);

}

//Método para eliminar una colección
async remove(id: string): Promise<Task>{

  return this.taskModel.findByIdAndDelete(id);
  }


}
