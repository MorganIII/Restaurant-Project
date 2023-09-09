import { State } from "./state";


export class Country {
    id: number;
    name: string;
    code: string;
    states: State[];

    constructor(id: number, name: string, code: string, states: State[]) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.states = states;
    }
    
}
