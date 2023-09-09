export class Order {

    id: number;
    name: string;
    data_created: Date;
    data_updated: Date;
    description: string;
    img: string;
    price: number;
    //make constructor
    constructor(id: number, name: string, data_created: Date, data_updated: Date, description: string, image: string, price: number) {
        this.id = id;
        this.name = name;
        this.data_created = data_created;
        this.data_updated = data_updated;
        this.description = description;
        this.img = image;
        this.price = price;
    }
    
}
