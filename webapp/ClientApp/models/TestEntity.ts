import { TrialEntity } from "ClientApp/models/TrialEntity";
import { ReactType, ReactPropTypes } from "react";

export interface ITestEntity {
    id: number;
    averageWalkSpeed: string;
    resultSeconds: Number;
    sswsTrials: TrialEntity[];
    fpwsTrials: TrialEntity[];
}

export class TestEntity implements ITestEntity{
    id: number;
    averageWalkSpeed: string;
    resultSeconds: Number;
    sswsTrials: TrialEntity[];
    fpwsTrials: TrialEntity[];
}