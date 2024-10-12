import { RelayMutationInput, RelayMutationPayload } from '@wener/nestjs/type-graphql';
import { ArgsType, Field, ID, InputType, ObjectType } from 'type-graphql';

// export interface BaseResolver<O, E extends StandardBaseEntity, SVC extends EntityBaseService<E>> {
//   readonly EntityType: EntityClass<E>;
//   readonly ObjectType: ObjectClass<O>;
//   readonly em: EntityManager;
//   readonly repo: EntityRepository<E>;
//   readonly svc: SVC;
//
//   findAll(page: PageRequestArgs): Promise<PageResponse<O>>;
//
//   resolve(args: ResolveArgs): Promise<E | null | undefined>;
//
//   get(args: GetArgs): Promise<E>;
//
//   delete(args: GetArgs): Promise<GeneralResponseObject>;
//
//   attributes(root: O, args: JSONArgs): any;
//
//   properties(root: O, args: JSONArgs): any;
// }

@ArgsType()
export class ResolveArgs {
  @Field((type) => ID, { nullable: true })
  id?: string;
  @Field((type) => String, { nullable: true })
  uid?: string;
  @Field((type) => Number, { nullable: true })
  sid?: number;
  @Field((type) => String, { nullable: true })
  eid?: string;
  @Field((type) => String, { nullable: true })
  cid?: string;
  @Field((type) => String, { nullable: true })
  rid?: string;
  @Field((type) => Boolean, { nullable: true })
  deleted?: boolean;
}

@ArgsType()
export class GetArgs {
  @Field((type) => ID, { nullable: true })
  id!: string;
}

@ArgsType()
export class DeleteArgs {
  @Field((type) => ID, { nullable: true })
  id!: string;
}

@InputType()
export class DeleteEntityInput extends RelayMutationInput {
  @Field((type) => ID, { nullable: false })
  id!: string;
}

@ObjectType()
export class DeleteEntityPayload extends RelayMutationPayload {}

// export function BaseResolverOf<O extends object, E extends StandardBaseEntity, SVC extends EntityBaseService<E>>({
//                                                                                                                    ObjectType,
//                                                                                                                    EntityType,
//                                                                                                                    InputType,
//                                                                                                                    PageResponseType = PageResponseOf(ObjectType),
//                                                                                                                  }: {
//   ObjectType: Constructor<O>;
//   EntityType: EntityClass<E>;
//   InputType?: Constructor<O>;
//   PageResponseType?: Constructor<PageResponse<O>>;
//   ServiceType?: Constructor<SVC>;
// }): Constructor<BaseResolver<O, E, SVC>> {
//   const name = `Abstract${ObjectType.name}Resolver`;
//   return computeIfAbsent(getTypeCache(), name, () => {
//     let objectName = getObjectName(ObjectType);
//     let inputName = InputType?.name.replace(/Input$/, '');
//
//     @Injectable()
//     @Resolver(ObjectType)
//     abstract class AbstractBaseResolver<
//       O extends object,
//       E extends StandardBaseEntity,
//       SVC extends EntityBaseService<E>,
//     > {
//       protected readonly log = new Logger(this.constructor.name);
//       readonly EntityType: EntityClass<E>;
//       readonly ObjectType: ObjectClass<O>;
//       readonly em: EntityManager;
//       readonly repo: EntityRepository<E>;
//       protected _svc?: SVC;
//
//       protected constructor(@Inject(MikroORM) protected readonly orm: MikroORM) {
//         this.EntityType = EntityType;
//         this.ObjectType = ObjectType;
//         this.em = orm.em;
//         this.repo = this.em.getRepository(this.EntityType);
//       }
//
//       get svc(): SVC {
//         return (this._svc ??= EntityBaseService.requireService(this.EntityType) as unknown as SVC);
//       }
//
//       @Authorized()
//       @Query((returns) => PageResponseType, { name: `find${objectName}` })
//       async findAll(@Args(() => PageRequestArgs) page: PageRequestArgs, @Ctx() ctx: any): Promise<PageResponse<E>> {
//         return this.svc.list(page);
//       }
//
//       @Authorized()
//       @Query((returns) => ObjectType, { name: `resolve${objectName}`, nullable: true })
//       async resolve(@Args(() => ResolveArgs) args: ResolveArgs, @Ctx() ctx: any): Promise<E | null | undefined> {
//         return this.svc.resolve(args);
//       }
//
//       @Authorized()
//       @Query((returns) => ObjectType, { name: `get${objectName}` })
//       async get(@Args(() => GetArgs) args: GetArgs, @Ctx() ctx: any): Promise<E> {
//         return this.svc.get(args);
//       }
//
//       @Authorized()
//       @Mutation((returns) => DeleteEntityPayload, { name: `delete${objectName}` })
//       async delete(
//         @Arg('input', () => DeleteEntityInput) input: DeleteEntityInput,
//         @Ctx() ctx: any,
//       ): Promise<DeleteEntityPayload> {
//         return runRelayClientMutation(input, async () => {
//           await this.svc.delete(input);
//         });
//       }
//
//       @FieldResolver(() => GraphQLJSONScalar, { nullable: true })
//       attributes(@Root() root: O, @Args(() => JSONArgs) args: JSONArgs) {
//         return resolveGraphQLJSON((root as any)?.attributes, args);
//       }
//
//       @FieldResolver(() => GraphQLJSONScalar, { nullable: true })
//       properties(@Root() root: O, @Args(() => JSONArgs) args: JSONArgs) {
//         return resolveGraphQLJSON((root as any)?.properties, args);
//       }
//     }
//
//     return AbstractBaseResolver;
//   });
// }
