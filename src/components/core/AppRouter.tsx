import React from 'react'
import { Switch, Route } from 'react-router';
import ViewResume, { ResumeProps } from '../resume/ViewResume';
import cvObject from '../../data/mockcv.json'
import resumeObject from '../../data/mockresume.json'

const AppRouter : React.FC = () =>
{
    const cvData = cvObject as ResumeProps;
    const resumeData = resumeObject as ResumeProps;

    return (
        <Switch>
            <Route path="/cv" component={() => <ViewResume {...cvData} />}></Route>
            <Route path="/resume" component={() => <ViewResume {...resumeData} />}></Route>
            <Route path="/" component={() => <ViewResume {...cvData} />}></Route>
        </Switch>
    )
}

export default AppRouter;