import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { TestWizard } from './components/TestWizard';
import { TestForm } from './components/TestForm';
import { TestResult } from './components/TestResult';

export const routes = <Layout>
        <Route exact path='/' component={ Home } />
        <Route path='/wizard' component={ TestWizard } />
        <Route path='/new' component={ TestForm } />
        <Route path='/edit/:id' component={ TestForm } />
        <Route path='/result/:id' component={ TestResult } />
        {/* <Route path='/fetchdata' component={ FetchData } /> */}
</Layout>;
