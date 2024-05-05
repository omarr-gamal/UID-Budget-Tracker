import { Component, inject } from '@angular/core';
import { Task } from './Task';

import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faPen, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

import { Firestore } from '@angular/fire/firestore';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TaskManager';

  faTrashAlt = faTrashAlt
  faPen = faPen
  faCheck = faCheck
  faXmark = faXmark 

  constructor(private firestore: Firestore, public auth: AuthService) { }

  tasks: Task[] = [
    { name: 'Complete project proposal', description: 'Write and submit project proposal document', dueDate: new Date('2024-04-10'), status: false },
    { name: 'Prepare presentation slides', description: 'Create slides for the upcoming presentation', dueDate: new Date('2024-04-15'), status: false },
    { name: 'Review feedback', description: 'Review and address feedback from the team meeting', dueDate: new Date('2024-04-12'), status: true },
    { name: 'Schedule meeting with client', description: 'Reach out to the client and schedule a meeting to discuss project updates', dueDate: new Date('2024-04-20'), status: false },
    { name: 'Go grocery shopping', description: 'Buy groceries for the week, including fruits, vegetables, and household items.', dueDate: new Date('2024-04-08'), status: false },  
  ];
  newTask: Task = new Task;
  editingIndex: number | null = null;
  editedTask: Task = new Task;

  addTask(): void {
    if (this.newTask.name && this.newTask.description && this.newTask.dueDate) {
      this.tasks.push(this.newTask);
      this.newTask = new Task();
    } else {
      alert('Please enter all fields of the task.');
    }
  }

  editTask(index: number): void {
    this.editingIndex = index;
    this.editedTask = { ...this.tasks[index] };
  }

  saveTask(index: number): void {
    this.tasks[index] = { ...this.editedTask! };
    this.editingIndex = null;
    this.editedTask = new Task;
  }

  cancelEdit(): void {
    this.editingIndex = null;
    this.editedTask = new Task;
  }

  toggleTaskStatus(index: number): void {
    this.tasks[index].status = !this.tasks[index].status;
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
  }
}
