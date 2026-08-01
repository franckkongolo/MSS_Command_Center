import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../common/database.service';

export type Client = {
  id: string;
  company: string;
  contactName?: string;
  phone?: string;
  email?: string;
  address?: string;
  sector?: string;
  paymentTerms?: string;
  createdAt: string;
};

@Injectable()
export class ClientsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    const data = await this.db.read();
    return data.clients.sort((a,b)=>String(a.company).localeCompare(String(b.company)));
  }

  async findOne(id: string) {
    const data = await this.db.read();
    const client = data.clients.find(c => c.id === id);
    if (!client) throw new NotFoundException('Client introuvable');
    return client;
  }

  async create(input: Omit<Client, 'id' | 'createdAt'>) {
    const data = await this.db.read();
    const client: Client = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    data.clients.push(client);
    await this.db.write(data);
    return client;
  }

  async update(id: string, input: Partial<Client>) {
    const data = await this.db.read();
    const index = data.clients.findIndex(c => c.id === id);
    if (index < 0) throw new NotFoundException('Client introuvable');
    data.clients[index] = { ...data.clients[index], ...input, id };
    await this.db.write(data);
    return data.clients[index];
  }

  async remove(id: string) {
    const data = await this.db.read();
    const index = data.clients.findIndex(c => c.id === id);
    if (index < 0) throw new NotFoundException('Client introuvable');
    const used = data.missions.some(m => m.clientId === id);
    if (used) throw new Error('Ce client est lié à une mission et ne peut pas être supprimé.');
    const [removed] = data.clients.splice(index, 1);
    await this.db.write(data);
    return removed;
  }
}
