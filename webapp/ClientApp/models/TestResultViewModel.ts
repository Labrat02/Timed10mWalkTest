import { TestEntity, ITestEntity } from "./TestEntity";
import { TestEntityHelper } from "./TestEntityHelper";

export interface ITestResultProps {
    id: string,
    testEntity: ITestEntity;

    // averagePreferredVelocity: string;
    // averageFastestVelocity: string;
    // averagePreferredWalkTime: string;
    // averageFastestWalkTime: string;

}
export class TestResultViewModel implements ITestResultProps {
    testEntityHelper: TestEntityHelper;
    constructor(props: ITestResultProps){
        this.testEntity = props.testEntity;
        this.testEntityHelper = new TestEntityHelper();
    }
    id: string;
    testEntity: ITestEntity;
}