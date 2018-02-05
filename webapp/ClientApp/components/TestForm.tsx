import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, Link } from 'react-router-dom';

export class TestForm extends React.Component<RouteComponentProps<any>, any> {
    constructor(props: any){
        super(props);
        
        //this.state = new HomeViewModel({patientId: 12345});
        this.state = {
            currentDate: new Date()
        }
    }
    startTestWizard(){
        // Show Wizard Start Page
        this.props.history.push('/wizard');
    }

    public render() {
        return <div>
            <h4>Test Form</h4>
            <p>...</p>
            <form className="container-fluid">
                <div className="row">
                    <div className="col">
                        
                        <div className="card">
                            <div className="card-header">Self-Selected Trials</div>
                            <div className="card-body">

                                <div className="form-group">
                                    <label htmlFor="t1">Trial #1:</label>
                                    <input type="text" className="form-control" id="t1" /> 
                                </div>
                                <div className="form-group">
                                    <label htmlFor="t2">Trial #2:</label>
                                    <input type="text" className="form-control" id="t2" /> 
                                </div>
                                <div className="form-group">
                                    <label htmlFor="t3">Trial #3:</label>
                                    <input type="text" className="form-control" id="t3" />
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className="col">
                    
                        <div className="card">
                            <div className="card-header">Fastest Possible Trials</div>
                            <div className="card-body">
                            
                                <div className="form-group">
                                    <label htmlFor="t4">Trial #1:</label>
                                    <input type="text" className="form-control" id="t4" /> 
                                </div>
                                <div className="form-group">
                                    <label htmlFor="t5">Trial #2:</label>
                                    <input type="text" className="form-control" id="t5" /> 
                                </div>
                                <div className="form-group">
                                    <label htmlFor="t6">Trial #3:</label>
                                    <input type="text" className="form-control" id="t6" />
                                </div>
                                
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row pt-3">
                    <div className="col form-group">
                        <label htmlFor="testNotes">Test Notes:</label><br />
                        <textarea id="testNotes" className="form-control"></textarea>
                    </div>
                </div>
                <div className="row pt-3">
                    <div className="col text-center">
                        <Link to="/result/123" className="btn btn-primary">Save &amp; View Result</Link>
                        <Link to="/" className="btn btn-secondary ml-3">Cancel</Link>
                    </div>
                </div>
            </form>
        </div>
    }
}
