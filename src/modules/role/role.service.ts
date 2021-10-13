import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CreateRoleDto, ReadRoleDto, UpdateRoleDto } from './dtos';
import { Role } from './role.entity';
import { RoleRepository } from './role.repository';
import { status } from '../../shared/entity-status.enum';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async get(id: number): Promise<ReadRoleDto> {
    if (!id) {
      throw new BadRequestException('Id must be send!');
    }

    const role: Role = await this._roleRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!role) {
      throw new NotFoundException();
    }

    return plainToClass(ReadRoleDto, role);
  }

  async getAll(): Promise<ReadRoleDto[]> {
    const roles: Role[] = await this._roleRepository.find({
      where: { status: status.ACTIVE },
    });

    return roles.map((role: Role) => plainToClass(ReadRoleDto, role));
  }

  async create(role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    const savedRole: Role = await this._roleRepository.save(role);
    return plainToClass(ReadRoleDto, savedRole);
  }

  async update(id: number, role: Partial<UpdateRoleDto>): Promise<ReadRoleDto> {
    const foundRole = await this._roleRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!foundRole) {
      throw new NotFoundException('This role does not exist');
    }

    foundRole.name = role.name;
    foundRole.describe = role.description;

    const updatedRole: Role = await this._roleRepository.save(foundRole);

    return plainToClass(ReadRoleDto, updatedRole);
  }

  async delete(id: number): Promise<void> {
    const roleExist = await this._roleRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!roleExist) {
      throw new NotFoundException();
    }

    await this._roleRepository.update(id, { status: status.INACTIVE });
  }
}
