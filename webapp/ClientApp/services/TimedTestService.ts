import { TestEntity, ITestEntity } from "ClientApp/models/TestEntity";

export class TimedTestService {
    timedTestServiceURL: string;
    constructor() {
        //super();
        // TODO: Configure this in ENV variable or app settings.
        this.timedTestServiceURL = 'http://robin.yeadongroup.com:8086/api/TimedTest';
        //this.timedTestServiceURL = 'http://localhost:5050/api/TimedTest';
    }
    
    getAllTimedTests(cb: ICallback){

        fetch(this.timedTestServiceURL).then( results => {
            return results.json();
        }).then(
            (data: Array<any>) => { 
                // convert incoming data types
                if (data.length > 0) {
                    data.forEach( d => {
                        if (typeof d.testDate === "string")
                            d.testDate = new Date(d.testDate);
                    });
                }

                return cb(data); 
            }
        );
    }

    getTimedTest(id: string, cb: ICallback) {
        fetch(this.timedTestServiceURL + '/' + id).then( results => {
            return results.json();
        }).then(
            (testEntity: TestEntity) => { 
                // convert incoming data types
                    if (typeof testEntity.testDate === "string")
                    testEntity.testDate = new Date(testEntity.testDate);
                    
                    //testEntity.patientId = testEntity.patientId.valueOf();

                    return cb(testEntity); 
            }
        );
    }

    deleteTest(id: string, cb: ICallback) {
        fetch(this.timedTestServiceURL + '/' + id, {
            method: 'DELETE'
        })
        .then( results => { 
            return cb(results);
        });
    }

    createTimedTest(timedTest: ITestEntity, cb: ICallback): any {
        //let data = new FormData(timedTest);
        //data.append("timedTest", JSON.stringify(timedTest));
        delete timedTest.id;
        console.log(JSON.stringify(timedTest));
        
        fetch(this.timedTestServiceURL, {
            method: 'POST',
            body: JSON.stringify(timedTest),
            headers: new Headers({
                "Content-Type": "application/json;charset=utf-8",                
            })
        })
        .then(results => results.text())
        .then( results => { 
            return cb(results);
        });
    }

    updateTimedTest(timedTest: ITestEntity, cb: ICallback): any {
        console.log(JSON.stringify(timedTest));
        fetch(this.timedTestServiceURL + '/' + timedTest.idString, {
            method: 'PUT',
            body: JSON.stringify(timedTest),
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            }
        })
        .then( results => { 
            return cb(results.statusText);
        });
    }
}

interface ICallback {
    ( data: any ) : any;    
}
