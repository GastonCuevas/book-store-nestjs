import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MapperService } from '../../shared/mapper.service';
import { Role } from './role.entity';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
    private readonly _mapperService: MapperService,
  ) {}

  async get(id: number): Promise<Role> {
    if (!id) {
      throw new BadRequestException('Id must be send!');
    }

    const role: Role = await this._roleRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!role) {
      throw new NotFoundException();
    }

    return role;
  }

  async getAll(): Promise<Role> {
    const roles: Role[] = await this._roleRepository.find({
      where: { status: 'ACTIVE' },
    });

    return this._mapperService.mapCollection<Role, Role>(roles, new Role());
  }

  async create(role: Role): Promise<Role> {
    const savedRole: Role = await this._roleRepository.save(role);
    return savedRole;
  }

  async update(id: number, role: Role): Promise<void> {
    await this._roleRepository.update(id, role);
  }

  async delete(id: number): Promise<void> {
    const roleExist = await this._roleRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!roleExist) {
      throw new NotFoundException();
    }

    await this._roleRepository.update(id, { status: 'INACTIVE' });
  }
}
