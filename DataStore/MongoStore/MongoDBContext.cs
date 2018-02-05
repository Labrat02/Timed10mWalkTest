// Mongo Library using Standard MongoDB.Driver 
// Created By Collin Yeadon
//
//
using System;
using System.IO;
using DataStore.EntityModels;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;

namespace DataStore
{
    public class MongoDBContext : IMongoDBContext
    {
        private MongoClient _client = null;
        private IMongoDatabase _db = null;
        private string _connectionString;
        private string _databaseName;
        public string PatientId { get; set; }

        public MongoDBContext(string connectionString, string databaseName) => MongoDBContextOptions(connectionString, databaseName);
        private void MongoDBContextOptions(string connectionString, string databaseName)
        {
            _connectionString = connectionString;
            _databaseName = databaseName;
            try
            {
                _client = this.Connect();
                _db = _client.GetDatabase(_databaseName);
            }
            catch (System.Exception ex)
            {
                Console.WriteLine($"MongoDBContext Error: {ex.Message}");
                throw ex;
            }

        }

        public MongoClient Connect() => new MongoClient(_connectionString);
        public IMongoDatabase GetDatabase() => _client.GetDatabase(_databaseName);
        public IMongoCollection<T> GetCollection<T>(string collection) => _db.GetCollection<T>(collection);

        // Expose collections explicitly
        public IMongoCollection<TimedTest> TimedTests { get => _db.GetCollection<TimedTest>("TimedTests" + PatientId); }

        public void LoadData(string inputFileName, string targetCollection ){
            if (_db == null) return;
            
            var collection = _db.GetCollection<BsonDocument>(targetCollection);
            using (var streamReader = new StreamReader(inputFileName))
            {
                string line;
                while ((line = streamReader.ReadLine()) != null)
                {
                    using (var jsonReader = new JsonReader(line))
                    {
                        var context = BsonDeserializationContext.CreateRoot(jsonReader);
                        var document = collection.DocumentSerializer.Deserialize(context);
                        collection.InsertOne(document);
                    }
                }
            }
        }
    }
}


