import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactData: ContactData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  isSubmitting = false;
  submitMessage = '';
  isSubmitSuccess = false;

  onSubmit() {
    if (!this.contactData.name || !this.contactData.email || !this.contactData.message) {
      this.showMessage('Please fill in all required fields.', false);
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.contactData.email)) {
      this.showMessage('Please enter a valid email address.', false);
      return;
    }
    
    // Create mailto link with form data
    const subject = this.contactData.subject || `Message from ${this.contactData.name}`;
    const body = `Dear Abdalrhman,

You have received a new message from your portfolio website.

-----------------------------
Name: ${this.contactData.name}
Email: ${this.contactData.email}
Subject: ${this.contactData.subject || 'No subject provided'}
-----------------------------

Message:
${this.contactData.message}

-----------------------------

This message was sent from your portfolio contact form.`;
    const mailtoLink = `mailto:bdhm28191@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open user's default email client
    window.location.href = mailtoLink;
    
    // Show success message
    this.showMessage('Opening your email client to send the message...', true);
    
    // Reset form after a short delay
    setTimeout(() => {
      this.contactData = { name: '', email: '', subject: '', message: '' };
    }, 2000);
  }
  
  private showMessage(message: string, isSuccess: boolean) {
    this.submitMessage = message;
    this.isSubmitSuccess = isSuccess;
    
    // Clear message after 5 seconds
    setTimeout(() => {
      this.submitMessage = '';
    }, 5000);
  }
}