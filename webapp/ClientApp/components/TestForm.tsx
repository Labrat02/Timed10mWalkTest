import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { TimedTestService } from '../services/TimedTestService';
import { TestEntity, ITestEntity } from '../models/TestEntity';
import { TrialEntity, ITrialEntity } from '../models/TrialEntity';
import { ITestFormProps, TestFormViewModel } from '../models/TestFormViewModel';
import * as moment from 'moment';
import { Moment } from 'moment';

export class TestForm extends React.Component<RouteComponentProps<ITestFormProps>, TestFormViewModel> {
    ttService: TimedTestService;
    constructor(props: any){
        super(props);
        
        this.ttService = new TimedTestService();

        let testEntity: ITestEntity = {
            id: null,
            idString:'', 
            testDate: new Date(),
            trials: this.getEmptyTrials(),
            testNotes: '',
        };

        this.state = new TestFormViewModel({
            id:  testEntity.idString,
            testEntity: testEntity,
            patientId: '',
            testDate: moment(testEntity.testDate, 'DD/MM/YYYY')
        });
    }

    componentWillMount(){
        let params = this.props.match.params;
        if (params && params.id) {
            this.ttService.getTimedTest(params.id, (t : TestEntity) => {
                this.setState({testEntity: t, testDate: moment(t.testDate)});
            });
        }
    }

    labels = (labelType : string) => {
        let labelText = '';
        switch (labelType) {
            case "SSWS":
                labelText = 'Self-Selected Trials';
                break;
            case "FPWS":
                labelText = 'Fastest Trials';
                break;
            case "newForm":
                labelText = 'New Test';
                break;
            case "editForm":
                labelText = 'Edt Test';
                break;
        
            default:
                break;
        }
        return labelText;
    }

    getEmptyTrials() : Array<ITrialEntity>{
        let todaysDate = new Date();
        return [
            {trialDate: todaysDate, trialType: 'SSWS', trialResultSeconds: '', trialNotes: ''},
            {trialDate: todaysDate, trialType: 'SSWS', trialResultSeconds: '', trialNotes: ''},
            {trialDate: todaysDate, trialType: 'SSWS', trialResultSeconds: '', trialNotes: ''},
            {trialDate: todaysDate, trialType: 'FPWS', trialResultSeconds: '', trialNotes: ''},
            {trialDate: todaysDate, trialType: 'FPWS', trialResultSeconds: '', trialNotes: ''},
            {trialDate: todaysDate, trialType: 'FPWS', trialResultSeconds: '', trialNotes: ''},
            
        ];
    }
    handleTrialTimeChange = (indx: any) => (e: any) => {
        let timedTest = this.state.testEntity;
        timedTest.trials[indx].trialResultSeconds = e.target.value;
        this.setState({testEntity: timedTest});
    }
    handleTrialTimeBlur = (indx: any) => (e: any) => {
        // restrict to 2 or less decimal places
        let trimTimeStr = (t : string) => {
            let decCount = t.indexOf('.') === -1 ? 0
                : t.length - t.indexOf('.') - 1;
            return decCount >= 2 ? parseFloat(t).toFixed(2) : parseFloat(t).toString();
        }
        let timedTest = this.state.testEntity;
        timedTest.trials[indx].trialResultSeconds = trimTimeStr(e.target.value);
        this.setState({testEntity: timedTest});
    }
    updateTestNote = (e: any) => {
        let timedTest = this.state.testEntity;
        timedTest.testNotes = e.target.value;
        this.setState({testEntity: timedTest});
    }
    handleTestDateChange = (date: Moment) => {
        let timedTest = this.state.testEntity;
        timedTest.testDate = date.toDate();
        this.setState({
          testDate: date
        });
      }

    saveChanges = (e: any) => {
        let timedTest = this.state.testEntity;
        if (timedTest.idString === "") {
            this.ttService.createTimedTest(timedTest, (newId : string) => {
                console.log('newId: ' + newId);
                this.props.history.push('/result/' + newId);
                
                //redirect to results
            });
        } else {
            this.ttService.updateTimedTest(timedTest, () => {
                this.props.history.push('/result/' + timedTest.idString);
            });
        }
        e.preventDefault();
    }

    public render() {

        var getTrialInputFields = (trialType: string) => {
            return this.state.testEntity.trials.map((trial:TrialEntity, indx: number) => {
                if (trial.trialType == trialType) return (
                    <div key={ indx } className="form-group">
                        <label htmlFor={ 't'+indx }>Trial #{(indx+1)}:</label>
                        <input type="text" className="form-control" 
                            onChange={ this.handleTrialTimeChange(indx) } 
                            onBlur={this.handleTrialTimeBlur(indx)}
                            value={ parseFloat(trial.trialResultSeconds) > 0 ? trial.trialResultSeconds : '' } 
                            placeholder={ 'Time in seconds' } 
                            id={ 't'+indx } 
                            autoComplete="off"  /> 
                    </div>
                );
            })
        };
        var getTrialCard = (trialType: string) => {
            if (this.state.testEntity.trials.length > 0)
            return (
                <div className="card">
                    <div className="card-header">{ this.labels(trialType) }</div>
                    <div className="card-body">
                        { getTrialInputFields(trialType) }
                    </div>
                </div>

            );
        }

        var getDateField = () => {
            return (
                <div className="container-fluid mb-3">
                    <div className="row">
                        <div className="mx-auto text-nowrap">
                            <label htmlFor="testDate" className="pull-left pr-3">Date:</label>
                            <DatePicker id="testDate" className="pull-left" value={ moment(this.state.testDate).format('MM/DD/YYYY') } selected={ this.state.testDate } onChange={ this.handleTestDateChange } />
                        </div>
                    </div>
                </div>
            );
        }

        return (<div>
            <h4>{ (this.state.testEntity.idString !== "") ? this.labels('editForm') : this.labels('newForm') }</h4>
            
            { getDateField() }
            
            <form className="container-fluid mb-3">
                <div className="row mb-3">
                    <div className="col">
                        { getTrialCard('SSWS') }
                    </div>
                    <div className="col">
                        { getTrialCard('FPWS') }
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col form-group">
                        <label htmlFor="testNotes">Test Notes:</label><br />
                        <textarea onChange={ this.updateTestNote } value={ this.state.testEntity.testNotes } className="form-control"></textarea>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col text-center">
                        <button onClick={ this.saveChanges } className="btn btn-primary">Save &amp; View Result</button>
                        <Link to="/" className="btn btn-secondary ml-3">Cancel</Link>
                    </div>
                </div>
            </form>
        </div>);
    }
}
