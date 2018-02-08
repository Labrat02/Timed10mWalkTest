import { TrialEntity } from "./TrialEntity";
import { ReactType, ReactPropTypes } from "react";

export interface ITestEntity {
    id: any;
    idString: string;
    testDate: Date;
    testNotes: string;
    trials: TrialEntity[];   
}

export class TestEntity implements ITestEntity{
    id: any;
    idString: string;
    testDate: Date;
    testNotes: string;
    trials: TrialEntity[];
}