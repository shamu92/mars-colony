export class NewEncounter {
    constructor(
        public date: string,
        public colonist_id: string,
        public atype: string,
        public action: string

    ) {}
}

export interface Encounter {
    id:string;
    date:string;
    colonist_id:number;
    atype:string;
    action:string

}
export class NewColonist {
    constructor(
        public name: string,
        public age: number,
        public job_id: string

    ) {}
}
export interface Colonist {
     name: string,
     job: Job,
     id:  number,
     age: number
}

export interface Job {
    name: string;
    id: number;
    description: string;
    
}

export class Alien {
    constructor(
        public type: string,
        public submitted_by: string,
        public id: number,
        public description: string
    ) {}
}

export interface Alien {
    id:number;
    type:string;
    description:string;
    submitted_by:string;
}
