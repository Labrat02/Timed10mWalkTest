import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface TestWizardState {
    currentCount: number;
    testId?: Number;
    testDate: Date;
    currentTestStage: React.Component;
}

export class TestWizard extends React.Component<RouteComponentProps<{}>, TestWizardState> {
    constructor() {
        super();
        this.state = { currentCount: 0, currentTestStage: this, testDate: new Date() };
    }

    public render() {
        return <div>
            

            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4>Test Wizard Options</h4>
                </div>

                <ul className="list-group">
                    <li className="list-group-item">Complete (6 Trials)</li>
                    <li className="list-group-item">Single - Self Selected (3 Remaining)</li>
                    <li className="list-group-item">Single - Fastest Possible (3 Remaining)</li>
                </ul>
            </div>

            <p>TODO: RENDER WIZARD STEP HERE</p>

            <p>Current count: <strong>{ this.state.currentCount }</strong></p>
            <button onClick={ () => { this.incrementCounter() } }>Increment</button>
        </div>;
    }

    incrementCounter() {
        this.setState({
            currentCount: this.state.currentCount + 1
        });
    }
}
