export class Category {

    id:number;
    name:string;
    logo:string;
    data_created:Date;
    data_updated:Date;
    
    constructor(id:number, name:string, logo:string, data_created:Date, data_updated:Date) {
        this.id = id;
        this.name = name;
        this.logo = logo;
        this.data_created = data_created;
        this.data_updated = data_updated;
    }
}
