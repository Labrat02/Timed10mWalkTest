import { TestEntity } from "./TestEntity";

export interface IHomeProps {   
    patientId: number;
    testHistory: TestEntity[];
}
export class HomeViewModel implements IHomeProps {
    constructor(props: IHomeProps){
        this.patientId = props.patientId;
        this.testHistory = props.testHistory;
    }
    patientId: number;
    testHistory: TestEntity[];
}