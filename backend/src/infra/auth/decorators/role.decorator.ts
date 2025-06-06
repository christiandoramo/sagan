import { SetMetadata } from '@nestjs/common';
import { Authority } from '../authority.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Authority[]) => SetMetadata(ROLES_KEY, roles);
