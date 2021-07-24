//AQUÍ SE CREAN LAS PROPIEDADES QUE TENDRÁ LA BASE DE DATOS Y EL TIPO DE DATO QUE ALMACENARÁN

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {

  @Prop()
  title: string;

  @Prop()
  description : string;

  @Prop()
  done: boolean;

  @Prop()
  minutes: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
