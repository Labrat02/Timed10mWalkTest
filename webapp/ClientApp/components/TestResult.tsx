import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

export class TestResult extends React.Component<any, any> {
    constructor() {
        super();
        this.state = { forecasts: [], loading: true };
    }

    goBack() {
        this.props.history.push('/');
    }

    public render() {
        return <div>
            <h4>Test Result</h4>
            <div></div>
            <div className="card card-success mt-3 mb-3">
                <div className="card-header">Results</div>
                <div className="card-body">
                    
                    <pre className="border bg-light p-3">
                        Test Date: <br />
                        <br />
                        Self-Selected Velocity:  Average time 00.00 seconds.<br />
                        Fast Velocity:  Average time 00.00 seconds.<br />
                        <br />
                        Actual Velocity:<br />
                        Average Self-Selected Velocity:  12.3 m/s<br />
                        Average Fast Velocity:  12.3 m/s
                    </pre>

                    <div className="pull-right">
                        <button className="btn">
                            <span className="fa fa-copy"></span> Copy
                        </button>
                    </div>
                </div>
            </div>

            <div className="text-center"><button className="btn btn-secondary" onClick={ () => { this.goBack() }} >Done</button></div>
        </div>;
    }
}
