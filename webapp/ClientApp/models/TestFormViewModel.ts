import { TestEntity, ITestEntity } from "./TestEntity";
import { Moment } from "moment";

export interface ITestFormProps {
    id: string;
    patientId: string;
    testEntity: ITestEntity;
    testDate: Moment;
}
export class TestFormViewModel implements ITestFormProps {
    constructor(props: ITestFormProps){
        this.patientId = props.patientId;
        this.testEntity = props.testEntity;
    }
    id: string;
    patientId: string;
    testEntity: ITestEntity;
    testDate: Moment;
}