using System;
using DataStore.EntityModels;
using MongoDB.Driver;

namespace DataStore
{
    public interface IMongoDBContext
    {
        MongoClient Connect();
        IMongoDatabase GetDatabase();
        IMongoCollection<T> GetCollection<T>(string collection);

        IMongoCollection<TimedTest> TimedTests {get;}

        void LoadData(string inputFileName, string targetCollection);

        // Prevent patient data cross contamination
        //void AddDocumentQueryRule<T>(string document, System.Linq.Expressions.Expression<Func<T, bool>> filter)
        string PatientId { get; set; }
    }
}