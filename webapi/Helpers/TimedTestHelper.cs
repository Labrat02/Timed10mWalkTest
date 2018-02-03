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
        IMongoStore _mongoStore;
        public TimedTestHelper(IMongoStore mongoStore)
        {
            _mongoStore = mongoStore;
        }
        
        public TimedTest GetTestById(ObjectId id){
            return _mongoStore.GetCollection<TimedTest>("mockData").Find(f => f.Id.Equals(id)).FirstOrDefault();
        }

        public List<TimedTest> GetAllTimedTests(){
            return _mongoStore.GetCollection<TimedTest>("mockData").Find(filter: f => f.PatientId.Equals(_mongoStore.PatientId)).ToList();
        }

        public void InsertTimedTest(TimedTest value)
        {
            _mongoStore.GetCollection<TimedTest>("mockData").InsertOne(value);
        }

        public void UpdateTimedTest(string id, TimedTest value)
        {
            var collection = _mongoStore.GetCollection<TimedTest>("mockData");
            var timedTest = collection.Find(f => f.Id.Equals(new ObjectId(id))).FirstOrDefault();

            // merge value and timedTest
            if (value.TestDate != null) {
                timedTest.TestDate = value.TestDate;
                
            }
            if (value.Trials != null && value.Trials.Count() > 0){
                timedTest.Trials = value.Trials;
                
            }
            if (value.TestNotes != null) {
                timedTest.TestNotes = value.TestNotes;
            }
            // TODO:  Refactor this using reflection  to update Builder for each property of new object
            // var updateDefinition = Builders<TimedTest>.Update //new UpdateDefinitionBuilder<TimedTest>() //Builders<TimedTest>.Update
            //     .Set("TestNotes", value.TestNotes)
            //     .Set("Trials", value.Trials);

            //var update = Builders<TimedTest>.Update
            //                .Set("TestNotes", timedTest.TestNotes);

            //collection.UpdateOne<TimedTest>(f => f.Id.Equals(new ObjectId(id)), updateDefinition);
            
            collection.ReplaceOne(f => f.Id.Equals(new ObjectId(id)), timedTest);

        }

    }
}
