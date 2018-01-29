import { TestEntity } from "ClientApp/models/TestEntity";

export interface IHomeProps {   
    patientId: number;
}
export class HomeViewModel implements IHomeProps {
    constructor(props: IHomeProps){
        this.patientId = props.patientId;
        //this.data = new TestEntity();
    }
    patientId: number;
    data: HomeViewModel;
}