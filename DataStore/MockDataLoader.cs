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
        public static void LoadJunk(IMongoDBContext dbContext)
        {
            var db = dbContext.GetDatabase();
            try{
                db.DropCollection("TimedTests" + dbContext.PatientId);
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
                dbContext.TimedTests.InsertMany(timedTests);
            }
            catch(Exception ex)
            {
                Console.Write("Error:  {0} - {1}", ex.Message, ex.Source );
            }
            
        }
    }
}
