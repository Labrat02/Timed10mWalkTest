import { TrialEntity } from "./TrialEntity";

export class TestEntityHelper {

    getPreferredWalkTime(trials : TrialEntity[]): string {
        let sswsList = trials.reduce((ssws, trial) => {
            if (parseFloat(trial.trialResultSeconds) > 0 && trial.trialType === 'SSWS')
                ssws.push(trial);
            return ssws;
        }, new Array<TrialEntity>());

        let secs = sswsList.reduce((seconds, trial) => {
            return seconds + parseFloat(trial.trialResultSeconds);
        }, 0);
        var avg = secs / sswsList.length;
        return avg.toFixed(2);
    }

    getFastestWalkTime(trials : TrialEntity[]): string {
        let fpwsList = trials.reduce((fpws, trial) => {
            if (parseFloat(trial.trialResultSeconds) > 0 && trial.trialType === 'FPWS')
                fpws.push(trial);
            return fpws;
        }, new Array<TrialEntity>());

        let secs = fpwsList.reduce((seconds, trial) => {
            return seconds + parseFloat(trial.trialResultSeconds);
        }, 0);
        
        var avg = secs / fpwsList.length;
        return avg.toFixed(2);
    }

    getPreferredVelocity(trials : TrialEntity[]): string {
        return (parseFloat(this.getPreferredWalkTime(trials)) / 6).toFixed(2);
    }
    
    getFastestVelocity(trials : TrialEntity[]): string {
        return (parseFloat(this.getFastestWalkTime(trials)) / 6).toFixed(2);
    }
}