export interface ITrialEntity {
    id: number;
    trialType: string;
    recordedTimeSeconds: number;
    trialNotes: string;
}

export class TrialEntity implements ITrialEntity {
    id: number;
    trialType: string;
    recordedTimeSeconds: number;
    trialNotes: string;
}