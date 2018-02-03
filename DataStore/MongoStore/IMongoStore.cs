using System;
using DataStore.EntityModels;
using MongoDB.Driver;

namespace DataStore
{
    public interface IMongoStore
    {
        MongoClient Connect();
        IMongoDatabase GetDatabase();
        IMongoCollection<T> GetCollection<T>(string collection);

        void LoadData(string inputFileName, string targetCollection);

        // Prevent patient data cross contamination
        //void AddDocumentQueryRule<T>(string document, System.Linq.Expressions.Expression<Func<T, bool>> filter)
        string PatientId { get; set; }
    }
}