export interface ITrialEntity {
    trialType: string;
    trialDate: Date;
    trialResultSeconds: string;
    trialNotes: string;
}

export class TrialEntity implements ITrialEntity {
    trialType: string;
    trialDate: Date;
    trialResultSeconds: string;
    trialNotes: string;
}