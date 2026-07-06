import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);
  private readonly portfolioService = inject(PortfolioService);

  email = signal('rivoandriamifidy0@gmail.com');
  phone = signal('+261 34 42 978 89');

  submitting = signal(false);
  success = signal(false);
  error = signal(false);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    subject: ['', Validators.maxLength(200)],
    message: ['', [Validators.required, Validators.maxLength(2000)]],
  });

  ngOnInit() {
    this.portfolioService.getProfile().subscribe({
      next: (profile) => {
        if (profile.email) this.email.set(profile.email);
        if (profile.phone) this.phone.set(profile.phone);
      },
    });
  }

  submit() {
    if (this.form.invalid || this.submitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.success.set(false);
    this.error.set(false);

    this.contactService.sendMessage(this.form.getRawValue()).subscribe({
      next: () => {
        this.success.set(true);
        this.submitting.set(false);
        this.form.reset();
      },
      error: () => {
        this.error.set(true);
        this.submitting.set(false);
      },
    });
  }
}