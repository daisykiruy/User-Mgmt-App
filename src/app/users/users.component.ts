import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';   // for ngModel
import { CommonModule } from '@angular/common'; // for *ngFor, *ngIf

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' }
  ];

  newUser = { name: '', email: '' };
  editingUser: any = null; // store user being edited

  // ✅ Add user
  addUser() {
    if (this.newUser.name && this.newUser.email) {
      const newId = this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
      this.users.push({ id: newId, ...this.newUser });

      this.newUser = { name: '', email: '' }; // reset form
    }
  }

  // ✅ Delete user
  deleteUser(id: number) {
    this.users = this.users.filter(u => u.id !== id);
  }

  // ✅ Start editing
  editUser(user: any) {
    this.editingUser = { ...user }; // copy user data
  }

  // ✅ Save updated user
  updateUser() {
    const index = this.users.findIndex(u => u.id === this.editingUser.id);
    if (index !== -1) {
      this.users[index] = this.editingUser;
    }
    this.editingUser = null; // clear editing
  }

  // ✅ Cancel editing
  cancelEdit() {
    this.editingUser = null;
  }
}
