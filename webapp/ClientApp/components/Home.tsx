import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route } from 'react-router-dom';
import { HomeViewModel, IHomeProps } from '../models/index';

export class Home extends React.Component<RouteComponentProps<IHomeProps>, HomeViewModel> {
    constructor(props: any){
        super(props);
        
        this.state = new HomeViewModel({patientId: 12345});
    }
    startTestWizard(){
        // Show Wizard Start Page
        this.props.history.push('/wizard');
    }

    public render() {
        return <div>
            <div className="well">
                <button className="btn btn-primary" onClick={ () => { this.startTestWizard() } }>New Test</button>
                <button className="btn btn-primary" onClick={ () => { this.startTestWizard() } }>New Test Wizard</button>
            </div>

            <h4>Test History</h4>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Test Date</th>
                        <th>Trials Completed</th>
                        <th>Avg Vel</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1/28/2018</td>
                        <td>6</td>
                        <td>4 m/s</td>
                        <td>Edit / View Result</td>
                    </tr>
                    <tr>
                        <td>1/26/2017</td>
                        <td>6</td>
                        <td>4 m/s</td>
                        <td>Edit / View Result</td>
                    </tr>
                    <tr>
                        <td>1/24/2016</td>
                        <td>6</td>
                        <td>4 m/s</td>
                        <td>Edit / View Result</td>
                    </tr>
                </tbody>
            </table>
        </div>
    }
}
