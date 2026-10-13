import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  standalone: false,
  styleUrl: './about.component.css'
})
export class AboutComponent {

  // the values of the contact form (template driven)
  contact = {
    name: '',
    email: '',
    message: ''
  };

  sent = false;
  sentName = '';

  sendMessage(form: NgForm) {
    if (form.valid) {
      this.sentName = this.contact.name;
      this.sent = true;
      form.resetForm();
    }
  }
}
