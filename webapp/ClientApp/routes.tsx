import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { TestWizard } from './components/TestWizard';
import { TestForm } from './components/TestForm';
import { TestResult } from './components/TestResult';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/wizard' component={ TestWizard } />
    <Route path='/testform' component={ TestForm } />
    <Route path='/result' component={ TestResult } />
    <Route path='/fetchdata' component={ FetchData } />
</Layout>;
