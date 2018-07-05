import { User } from "../entity/User";
import { Config } from "../Config";
export declare class UserRepository {
    private config;
    constructor(config: Config);
    find(): Promise<User[]>;
    create(user: User): Promise<User>;
}
//# sourceMappingURL=UserRepository.d.ts.map