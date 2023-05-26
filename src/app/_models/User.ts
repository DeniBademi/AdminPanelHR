import { Token } from "./Token";
 

export class User {
    constructor(username : string, role: string){
        this.username=username
        this.role=role
        

    }
    username: string;
    role: string;
    token: Token | undefined;
}
