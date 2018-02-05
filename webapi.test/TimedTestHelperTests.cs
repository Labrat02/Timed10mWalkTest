using System;
using Xunit;
using webapi;
using DataStore;
using MongoDB.Bson;
using MongoDB.Driver;
using DataStore.EntityModels;
using System.Collections.Generic;

namespace webapi.test
{
    public class TimedTestHelperTests
    {
        private MongoDBContext _dbContext;
        private Helpers.TimedTestHelper _helper;

        public TimedTestHelperTests()
        {
            // TODO: Find way to mock MongoDB.Driver?
            var connectionString = (System.Net.Dns.GetHostName().Contains("LAPTOP")) 
                ? @"mongodb://localhost:27017"
                : @"mongodb://mongo_db:27017";

            _dbContext = new MongoDBContext(connectionString, "mockDB");
            _dbContext.PatientId = "123";
            _helper = new Helpers.TimedTestHelper(_dbContext);

            MockDataLoader.LoadJunk(_dbContext);
        }

        [Fact]
        public void GetTestById_ShouldReturnNull_InvalidId()
        {
            var result = _helper.GetTestById(null);
            Assert.Equal(null, result);
        }

        [Fact]
        public void GetTestById_ShouldReturnTimedTest()
        {
            var result = _helper.GetTestById("5513306a2dfd32ffd580e323");

            Assert.Equal("ABC 123", result.TestNotes);
        }
        
        [Fact]
        public void GetAllTimedTests_ShouldReturnAll()
        {
            var result = _helper.GetAllTimedTests();
            Assert.Equal(2, result.Count);
        }

        [Fact]
        public void InsertTimedTest_ShouldSucceed() {
            var newDate = DateTime.Now;

            _helper.InsertTimedTest(new TimedTest(){
                TestDate = newDate,
                TestNotes = "InsertedDoc"
            });
            
            var result = _dbContext.TimedTests.Count(f => f.TestDate.Equals(newDate) && f.TestNotes.Equals("InsertedDoc"));
            Assert.Equal(1, result);
        }

        [Fact]
        public void UpdateTimedTest_ShouldSucceed() {
            var testId = "5513306a2dfd32ffd580e324";
            var timedTest = _helper.GetTestById(testId);
            timedTest.TestNotes = "Update123";
            
            _helper.UpdateTimedTest(testId, timedTest);
            
            var result = _helper.GetTestById(testId);
            Assert.Contains("Update123", result.TestNotes);
        }
    }
}
