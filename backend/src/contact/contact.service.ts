import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async create(dto: CreateContactDto) {
    const saved = await this.prisma.contactMessage.create({
      data: {
        name: dto.name,
        email: dto.email,
        subject: dto.subject,
        message: dto.message,
      },
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        createdAt: true,
      },
    });

    try {
      await this.mailService.sendContactNotification(dto);
    } catch (error) {
      this.logger.error('Échec envoi email de contact', error);

      if (process.env.NODE_ENV === 'production' && this.mailService.isConfigured()) {
        throw new InternalServerErrorException(
          "Le message a été enregistré mais l'email n'a pas pu être envoyé. Réessayez plus tard.",
        );
      }
    }

    return saved;
  }
}