import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { HomeViewModel, IHomeProps } from '../models/index';
import { TimedTestService } from '../services/TimedTestService';

export class Home extends React.Component<RouteComponentProps<IHomeProps>, HomeViewModel> {
    constructor(props: any){
        super(props);
        
        this.state = new HomeViewModel({
            patientId: 123,
            testHistory: []
        });
        //new HomeViewModel({patientId: 123});
    }
    startTestWizard(){
        // Show Wizard Start Page
        this.props.history.push('/wizard');
    }
    newTestForm(){
        this.props.history.push('/testform');
    }
    viewResult(id: string){
        this.props.history.push('/result/' + id);
    }

    componentWillMount(){
        
        // fetch('http://robin.yeadongroup.com:8086/api/TimedTest').then( results => {
        //     return results.json();
        // }).then(data => {
        //     let testHistory = data.map(
        //         (timedTest:any) => {
        //             return (
        //             <tr key={timedTest.idString}>
        //                 <td>{timedTest.testDate}</td>
        //                 <td>{timedTest.trials.length}</td>
        //                 <td>4 m/s</td>
        //                 <td>
        //                     View Results
        //                 </td>
        //             </tr>);
        //         }
        //     );
        //     this.setState({testHistory: testHistory});
        // });
        let tts = new TimedTestService();
        tts.getAllTimedTests((data) => {
            let testHistory = data.map(
                (timedTest:any) => {
                    return (
                        <tr key={timedTest.idString} onClick={ () => { this.viewResult(timedTest.idString) }} >
                            <td>{timedTest.testDate}</td>
                            <td>{timedTest.trials.length}</td>
                            <td>4 m/s</td>
                            <td>
                            <Link to="/TestForm/123">test</Link>
                                
                                <a className="pl-2" href="#"><span className="fa fa-edit"></span> Edit</a>
                                <a className="pl-2" href="#"><span className="fa fa-remove"></span> Delete</a>
                            </td>
                        </tr>
                    );
                }
            );
            this.setState({testHistory: testHistory});
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
                    <button className="btn btn-primary ml-3" onClick={ () => { this.startTestWizard() } }>Test Wizard</button>
                </div>
            </div>

            <h4>Test History</h4>
            <table className="table table-striped table-hover table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th>Test Date</th>
                        <th>Trials Completed</th>
                        <th>Avg Vel</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.testHistory}
                </tbody>
            </table>
        </div>
    }
}
