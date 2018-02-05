using System.Collections.Generic;
using System.Linq;
using DataStore;
using DataStore.EntityModels;
using MongoDB.Bson;
using MongoDB.Driver;

namespace webapi.Helpers
{
    public class TimedTestHelper
    {
        IMongoDBContext _dbContext;
        public TimedTestHelper(IMongoDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public TimedTest GetTestById(string id)
        {
            return (!string.IsNullOrEmpty(id)) ? _dbContext.TimedTests.Find(f => f.Id.Equals(new ObjectId(id))).FirstOrDefault() : null;
        }

        public List<TimedTest> GetAllTimedTests()
        {
            return _dbContext.TimedTests.Find(filter: f => f.PatientId.Equals(_dbContext.PatientId)).ToList();
        }

        public void InsertTimedTest(TimedTest value)
        {
            if (value == null) return;
            _dbContext.TimedTests.InsertOne(value);
        }

        public void UpdateTimedTest(string id, TimedTest value)
        {
            if (string.IsNullOrEmpty(id) || value == null) return;

            var collection = _dbContext.TimedTests;
            var timedTest = collection.Find(f => f.Id.Equals(new ObjectId(id))).FirstOrDefault();

            // merge value and timedTest
            // TODO:  Refactor merge
            if (value.TestDate != null)
                timedTest.TestDate = value.TestDate;
            if (value.Trials != null && value.Trials.Count() > 0)
                timedTest.Trials = value.Trials;
            if (value.TestNotes != null)
                timedTest.TestNotes = value.TestNotes;

            collection.ReplaceOne(f => f.Id.Equals(new ObjectId(id)), timedTest);

        }

    }
}
