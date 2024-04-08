

export class Person {
    // public name: string ;
    // private address: string;

    constructor( 
        public firstName: string, 
        public secondName: string, 
        private address: string = 'No Address'
    ) {}

}

// export class Hero extends Person {

//     constructor(
//         public alterEgo: string,
//         public age: number,
//         public realName: string,
//     ){
//         super( realName, 'New York')
//     }

// }

export class Hero {

    // public person: Person;

    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
        public person: Person,
    ){
        
        // this.person = new Person(realName);

    }

}

const tony = new Person('Tony Stark', 'Stark', 'New York');

const ironman = new Hero('Ironman', 21, 'Tony', tony);

console.log(ironman);