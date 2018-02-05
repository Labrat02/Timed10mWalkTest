interface ICallback {
    ( data: any ) : any;
}
export class TimedTestService {

    getAllTimedTests(cb: ICallback){

        fetch('http://robin.yeadongroup.com:8086/api/TimedTest').then( results => {
            return results.json();
        }).then(
            data => { return cb(data); }
        );
    }
    
}