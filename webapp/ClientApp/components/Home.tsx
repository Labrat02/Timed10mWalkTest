import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { HomeViewModel, IHomeProps } from '../models/index';
import { TimedTestService } from '../services/TimedTestService';
import { TestEntity } from '../models/TestEntity';
import { TestEntityHelper } from '../models/TestEntityHelper';
import * as moment from 'moment';

export class Home extends React.Component<RouteComponentProps<IHomeProps>, HomeViewModel> {
    ttService: TimedTestService;
    helper: TestEntityHelper;
    constructor(props: any){
        super(props);
        
        this.state = new HomeViewModel({
            patientId: 123,
            testHistory: []
        });

        this.ttService = new TimedTestService();
        this.helper = new TestEntityHelper();
    }
    startTestWizard(){
        // Show Wizard Start Page
        this.props.history.push('/wizard');
    }
    newTestForm(){
        this.props.history.push('/new');
    }
    viewResult(id: string){
        this.props.history.push('/result/' + id);
    }

    editTest(e: any, id: string) {
        e.stopPropagation();
        e.preventDefault();
        this.props.history.push('/edit/' + id);
    }
    deleteTest(e: any, id: string) {
        e.stopPropagation();
        e.preventDefault();

        this.ttService.deleteTest(id, () => {
            var newTestHistory = this.state.testHistory.filter( (t) => t.idString !== id );
            this.setState({ testHistory: newTestHistory });
        });
        //this.props.history.push('/confirm-delete/' + id);
    }

    componentWillMount(){
       
        this.ttService.getAllTimedTests((data: TestEntity[]) => {
            this.setState({ testHistory: data });
        });
        
    }

    public render() {
        return <div className="pt-3">
            <div className="card mb-3">
                <div className="card-header">
                    Timed 10 meter Walk Test
                </div>
                <div className="card-body">
                    <button className="btn btn-primary" onClick={ () => { this.newTestForm() } }>New Test</button>
                    {/* <button className="btn btn-primary ml-3" onClick={ () => { this.startTestWizard() } }>Test Wizard</button> */}
                </div>
            </div>

            <h4>Test History</h4>
            <table className="table table-striped table-hover table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th>Test Date</th>
                        <th>Trials Completed</th>
                        <th>Preferred (Avg Seconds)</th>
                        <th>Fastest (Avg Seconds)</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.testHistory.map(
                        (timedTest:TestEntity) => {
                            return (
        
                                <tr key={ timedTest.idString } onClick={ () => { this.viewResult(timedTest.idString) } } >
                                    <td>{ moment(timedTest.testDate).format('MM/DD/YYYY') }</td>
                                    <td>{ timedTest.trials.length }</td>
                                    <td>{ this.helper.getPreferredWalkTime(timedTest.trials) } sec.</td>
                                    <td>{ this.helper.getFastestWalkTime(timedTest.trials) } sec.</td>
                                    <td className="btnLinks">
                                        <a className="pl-2" href="#" 
                                            onClick={ (e: any) => { this.editTest(e, timedTest.idString) } }>
                                                <span className="fa fa-edit"></span> Edit</a>
                                        <a className="pl-2" href="#" 
                                            onClick={ (e: any) => { this.deleteTest(e, timedTest.idString) } }>
                                                <span className="fa fa-remove"></span> Delete</a>
                                    </td>
                                </tr>
        
                            );
                        }
                    )}
                </tbody>
            </table>
        </div>
    }
}
