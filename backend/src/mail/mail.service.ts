import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { CreateContactDto } from '../contact/dto/create-contact.dto';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly config: ConfigService) {}

  isConfigured(): boolean {
    return !!(
      this.config.get<string>('SMTP_HOST') &&
      this.config.get<string>('SMTP_USER') &&
      this.config.get<string>('SMTP_PASS') &&
      this.config.get<string>('CONTACT_TO_EMAIL')
    );
  }

  async sendContactNotification(dto: CreateContactDto): Promise<void> {
    if (!this.isConfigured()) {
      this.logger.warn(
        'SMTP non configuré — message enregistré en base uniquement.',
      );
      return;
    }

    const transporter = nodemailer.createTransport({
      host: this.config.get<string>('SMTP_HOST'),
      port: Number(this.config.get<string>('SMTP_PORT') ?? 587),
      secure: this.config.get<string>('SMTP_SECURE') === 'true',
      auth: {
        user: this.config.get<string>('SMTP_USER'),
        pass: this.config.get<string>('SMTP_PASS'),
      },
    });

    const to = this.config.get<string>('CONTACT_TO_EMAIL')!;
    const from =
      this.config.get<string>('SMTP_FROM') ??
      `Portfolio Rivo <${this.config.get<string>('SMTP_USER')}>`;
    const subject =
      dto.subject?.trim() ||
      `Portfolio — Nouveau message de ${dto.name}`;

    await transporter.sendMail({
      from,
      to,
      replyTo: dto.email,
      subject,
      text: [
        `Nom : ${dto.name}`,
        `Email : ${dto.email}`,
        `Sujet : ${dto.subject?.trim() || '(non renseigné)'}`,
        '',
        'Message :',
        dto.message,
      ].join('\n'),
      html: `
        <h2>Nouveau message depuis le portfolio</h2>
        <p><strong>Nom :</strong> ${this.escapeHtml(dto.name)}</p>
        <p><strong>Email :</strong> <a href="mailto:${this.escapeHtml(dto.email)}">${this.escapeHtml(dto.email)}</a></p>
        <p><strong>Sujet :</strong> ${this.escapeHtml(dto.subject?.trim() || '(non renseigné)')}</p>
        <hr />
        <p style="white-space: pre-wrap;">${this.escapeHtml(dto.message)}</p>
      `,
    });

    this.logger.log(`Email de contact envoyé à ${to}`);
  }

  private escapeHtml(value: string): string {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }
}