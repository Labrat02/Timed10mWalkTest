import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { ITestResultProps, TestResultViewModel } from '../models/TestResultViewModel';
import { ITestEntity } from '../models/TestEntity';
import { TestEntityHelper } from '../models/TestEntityHelper';
import { TimedTestService } from '../services/TimedTestService';

export class TestResult extends React.Component<RouteComponentProps<ITestResultProps>, TestResultViewModel> {
    ttService: TimedTestService;
    helper: TestEntityHelper;
    constructor() {
        super();

        this.helper = new TestEntityHelper();
        this.ttService = new TimedTestService();

        let testEntity: ITestEntity = {
            id: null,
            idString:'', 
            testDate: new Date(),
            trials: [],
            testNotes: '',
        };
        this.state = new TestResultViewModel({
            id: '',
            testEntity: testEntity,
        });
    }
    componentWillMount(){
        let params = this.props.match.params;
        if (params && params.id) {
            this.ttService.getTimedTest(params.id, (data: ITestEntity) => {
                this.setState({testEntity: data});
            })
        }
    }

    goBack() {
        this.props.history.push('/');
    }

    copyToClipboard = () => {
        // let textField = document.getElementById('copyArea');
        // if (textField) {
        //     textField.select()
        //     document.execCommand('copy')
        // }
      }

    public render() {
        return <div>
            <h4>View Test Result</h4>
            <div></div>
            <div className="card card-success mt-3 mb-3">
                <div className="card-header">Results</div>
                <div className="card-body">
                    
                    <pre className="border bg-light p-3" id="copyArea">
                        Test Date: {this.state.testEntity.testDate.toDateString()}<br />
                        <br />
                        Self-Selected Velocity:  Average time { this.helper.getPreferredWalkTime(this.state.testEntity.trials) } seconds.<br />
                        Fast Velocity:  Average time { this.helper.getFastestWalkTime(this.state.testEntity.trials) } seconds.<br />
                        <br />
                        Actual Velocity:<br />
                        Average Self-Selected Velocity:  { this.helper.getPreferredVelocity(this.state.testEntity.trials) } m/s<br />
                        Average Fast Velocity:  { this.helper.getFastestVelocity(this.state.testEntity.trials) } m/s
                    </pre>

                    <div className="pull-right">
                        <button className="btn" onClick={() => {}}>
                            <span className="fa fa-copy"></span> Copy
                        </button>
                    </div>
                </div>
            </div>

            <div className="text-center"><button className="btn btn-secondary" onClick={ () => { this.goBack() }} >Done</button></div>
        </div>;
    }
}
