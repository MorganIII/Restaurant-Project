import { Country } from "./country";


export class State {
    id: number;
    name: string;
    code: string;
    country: Country;

    constructor(id: number, name: string, code: string, country: Country) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.country = country;
    }
}
