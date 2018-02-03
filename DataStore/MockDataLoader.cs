using DataStore.EntityModels;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Collections;
using System.Collections.Generic;
using System;

namespace DataStore 
{
    public static class MockDataLoader
    {
        public static void LoadJunk(IMongoDatabase db, string collection)
        {
            
            try{
                db.DropCollection(collection);
            }
            finally{
                
            }
            
            var timedTests = new List<TimedTest>(){
                new TimedTest(){
                    PatientId = "123",
                    Id = new ObjectId("5513306a2dfd32ffd580e323"),
                    TestDate = new DateTime(2017, 2, 1),
                    TestNotes = "ABC 123",
                    Trials = new List<Trial>(){
                        new Trial(){TrialDate = new DateTime(2017, 2, 1),TrialResultSeconds = 12.4,TrialType = "SSWS"},
                        new Trial(){TrialDate = new DateTime(2017, 2, 1),TrialResultSeconds = 12.5,TrialType = "SSWS"},
                        new Trial(){TrialDate = new DateTime(2017, 2, 1),TrialResultSeconds = 12.6,TrialType = "SSWS"},
                        new Trial(){TrialDate = new DateTime(2017, 2, 1),TrialResultSeconds = 9.1,TrialType = "FPWS"},
                        new Trial(){TrialDate = new DateTime(2017, 2, 1),TrialResultSeconds = 9.2,TrialType = "FPWS"},
                        new Trial(){TrialDate = new DateTime(2017, 2, 1),TrialResultSeconds = 9.3,TrialType = "FPWS"}
                    }
                }, 
                new TimedTest(){
                    PatientId = "123",
                    Id = new ObjectId("5513306a2dfd32ffd580e324"),
                    TestDate = new DateTime(2016, 2, 1),
                    Trials = new List<Trial>(){
                        new Trial(){TrialDate = new DateTime(2016, 2, 1),TrialResultSeconds = 12.1,TrialType = "SSWS"},
                        new Trial(){TrialDate = new DateTime(2016, 2, 1),TrialResultSeconds = 12.2,TrialType = "SSWS"},
                        new Trial(){TrialDate = new DateTime(2016, 2, 1),TrialResultSeconds = 12.3,TrialType = "SSWS"},
                        new Trial(){TrialDate = new DateTime(2016, 2, 1),TrialResultSeconds = 8.0,TrialType = "FPWS"},
                        new Trial(){TrialDate = new DateTime(2016, 2, 1),TrialResultSeconds = 8.5,TrialType = "FPWS"},
                        new Trial(){TrialDate = new DateTime(2016, 2, 1),TrialResultSeconds = 9.6,TrialType = "FPWS"}
                    }
                },
                new TimedTest(){
                    PatientId = "X",
                    Id = new ObjectId("5513306a2dfd32ffd580e325"),
                    TestDate = new DateTime(2016, 2, 1),
                    Trials = new List<Trial>(){
                        new Trial(){TrialDate = new DateTime(2016, 2, 1),TrialResultSeconds = 30.3,TrialType = "SSWS"},
                        new Trial(){TrialDate = new DateTime(2016, 2, 1),TrialResultSeconds = 29.1,TrialType = "SSWS"},
                        new Trial(){TrialDate = new DateTime(2016, 2, 1),TrialResultSeconds = 48.2,TrialType = "SSWS"},
                        new Trial(){TrialDate = new DateTime(2016, 2, 1),TrialResultSeconds = 8.0,TrialType = "FPWS"},
                        new Trial(){TrialDate = new DateTime(2016, 2, 1),TrialResultSeconds = 8.5,TrialType = "FPWS"},
                        new Trial(){TrialDate = new DateTime(2016, 2, 1),TrialResultSeconds = 9.6,TrialType = "FPWS"}
                    }
                }
            };

            try
            {
                db.GetCollection<TimedTest>(collection).InsertMany(timedTests);
            }
            catch(Exception ex)
            {
                Console.Write("Error:  {0} - {1}", ex.Message, ex.Source );
            }
            
        }
    }
}


// { "_id" : ObjectId("5513306a2dfd32ffd580e323"), "testDate" : "2017-01-25T22:02:18Z", "patientId" : "1", "testNotes" : "Test 1", "trials" : [ {"trialType" : "SSWS", "trialDate" : "2017-01-01T12:12:00Z", "trialResultSeconds" : 12.6}, {"trialType" : "SSWS", "trialDate" : "2017-01-01T12:12:01Z", "trialResultSeconds" : 11.4}, {"trialType" : "SSWS", "trialDate" : "2017-01-01T12:12:02Z", "trialResultSeconds" : 12.1}, {"trialType" : "FPWS", "trialDate" : "2017-01-01T12:12:03Z", "trialResultSeconds" : 9.6}, {"trialType" : "FPWS", "trialDate" : "2017-01-01T12:12:04Z", "trialResultSeconds" : 8.2}, {"trialType" : "FPWS", "trialDate" : "2017-01-01T12:12:05Z", "trialResultSeconds" : 6.6}] }
// { "_id" : ObjectId("5513306a2dfd32ffd580e327"), "testDate" : "2017-02-01T22:02:18Z", "patientId" : "1", "testNotes" : "Test 2", "trials" : [ {"trialType" : "SSWS", "trialDate" : "2017-01-01T12:12:00Z", "trialResultSeconds" : 12.6}, {"trialType" : "SSWS", "trialDate" : "2017-01-01T12:12:01Z", "trialResultSeconds" : 11.4}, {"trialType" : "SSWS", "trialDate" : "2017-01-01T12:12:02Z", "trialResultSeconds" : 12.1}, {"trialType" : "FPWS", "trialDate" : "2017-01-01T12:12:03Z", "trialResultSeconds" : 9.6}, {"trialType" : "FPWS", "trialDate" : "2017-01-01T12:12:04Z", "trialResultSeconds" : 8.2}, {"trialType" : "FPWS", "trialDate" : "2017-01-01T12:12:05Z", "trialResultSeconds" : 6.6}] }
// { "_id" : ObjectId("5513306a2dfd32ffd580e328"), "testDate" : "2017-02-01T22:02:18Z", "patientId" : "2", "testNotes" : "Test 3", "trials" : [ {"trialType" : "SSWS", "trialDate" : "2017-01-01T12:12:00Z", "trialResultSeconds" : 12.6}, {"trialType" : "SSWS", "trialDate" : "2017-01-01T12:12:01Z", "trialResultSeconds" : 11.4}, {"trialType" : "SSWS", "trialDate" : "2017-01-01T12:12:02Z", "trialResultSeconds" : 12.1}, {"trialType" : "FPWS", "trialDate" : "2017-01-01T12:12:03Z", "trialResultSeconds" : 9.6}, {"trialType" : "FPWS", "trialDate" : "2017-01-01T12:12:04Z", "trialResultSeconds" : 8.2}, {"trialType" : "FPWS", "trialDate" : "2017-01-01T12:12:05Z", "trialResultSeconds" : 6.6}] }
// { "_id" : ObjectId("5513306c2dfd32ffd580e324"), "x" : 2.0 }
// { "_id" : ObjectId("5513306e2dfd32ffd580e325"), "x" : 3.0 }
// { "_id" : ObjectId("551330712dfd32ffd580e326"), "x" : 4.0 }