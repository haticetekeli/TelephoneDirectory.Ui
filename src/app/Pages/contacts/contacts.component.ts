import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../Services/ContactService/contact.services';

@Component({
  selector: 'app-contacts',
  standalone: true, // ✅ Standalone
  imports: [CommonModule, FormsModule], // ✅ ngModel için FormsModule ekledik
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: any[] = [];
  newContact: any = { name: '', phone: '' };

  constructor(private ContactService: ContactService) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.ContactService.getContacts().subscribe(data => {
      this.contacts = data;
    });
  }

  addContact() {
    if (!this.newContact.name || !this.newContact.phone) return;

    this.ContactService.addContact(this.newContact).subscribe(() => {
      this.newContact = { name: '', phone: '' };
      this.loadContacts();
    });
  }

  deleteContact(id: number) {
    this.ContactService.deleteContact(id).subscribe(() => {
      this.loadContacts();
    });
  }
}