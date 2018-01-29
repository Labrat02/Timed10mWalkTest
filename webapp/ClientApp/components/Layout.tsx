import * as React from 'react';
import { NavMenu } from './NavMenu';
import { Link, NavLink } from 'react-router-dom';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    constructor(props: any) {
        super(props);
    }
    public ReturnHome() {
        if (window.location.pathname == '/') return null;
        // if test is running & url not home
        return (<div className="panel panel-default">
            <div className="panel-body">
                <NavLink to={ '/' } exact activeClassName='active'>
                    <span className='glyphicon glyphicon-circle-arrow-left'></span> Return Home
                </NavLink>
            </div>
        </div>);
    }
    
    public render() {
        return <div>
            <this.ReturnHome />
            <div className='container-fluid'>
                <div className='row'>
                    {/* <div className='col-sm-3'>
                        <NavMenu />
                    </div> */}
                    <div className='col-sm-12'>
                        { this.props.children }
                    </div>
                </div>
            </div>
        </div>;
    }
}
