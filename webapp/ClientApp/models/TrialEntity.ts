export interface ITrialEntity {
    trialId: number;
    recordedTimeSeconds: number;
    practitionerNotes: string;
}

export class TrialEntity implements ITrialEntity {
    trialId: number;
    recordedTimeSeconds: number;
    practitionerNotes: string;
}