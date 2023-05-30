import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { DataSource } from 'typeorm';

export function OwnershipGuard<T extends { id: any }>(
  entity: new () => T,
): any {
  @Injectable()
  class Guard implements CanActivate {
    constructor(private readonly datasource: DataSource) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const userId = request.user.sub; // Assuming the user ID is available in the request's user object
      const entityId = request.params.id; // Assuming the entity ID is available in the request's params

      const repository = this.datasource.getRepository(entity);
      console.log({ repository });
      const entityData = await repository.findOne({
        where: {
          id: entityId,
        },
        relations: ['user'],
      });

      const isOwner = entityData['user']['id'] === userId;
      return isOwner;
    }
  }

  return Guard;
}
