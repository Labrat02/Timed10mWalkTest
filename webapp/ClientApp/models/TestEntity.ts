import { TrialEntity } from "ClientApp/models/TrialEntity";
import { ReactType, ReactPropTypes } from "react";

export interface ITestEntity {
    id: number;
    averageWalkSpeed: string;
    sswsAverageSeconds(): Number;
    trials: TrialEntity[];
}

export class TestEntity implements ITestEntity{
    id: number;
    averageWalkSpeed: string;
    sswsAverageSeconds(){
        
        let sswsList = this.trials.reduce((ssws, trial) => {
                if (trial.recordedTimeSeconds > 0 && trial.trialType === 'SSWS')
                    ssws.push(trial);
                return ssws;
            }, new Array<TrialEntity>());

        let sswsSeconds = sswsList.reduce((seconds, trial) => {
                let rts = (trial.trialType==='SSWS') ? trial.recordedTimeSeconds : 0;
                return seconds + rts;
            }, 0);
        
        return sswsSeconds / 3;
    }
    trials: TrialEntity[];
}