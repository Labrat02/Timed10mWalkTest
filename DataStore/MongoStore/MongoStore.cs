// Mongo Library using Standard MongoDB.Driver 
// Created By Collin Yeadon
//
//
using System;
using System.IO;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;

namespace DataStore
{
    public class MongoStore : IMongoStore
    {
        private MongoClient _client = null;
        private IMongoDatabase _db = null;
        private string _connectionString;
        public string PatientId { get; set; }

        //public MongoStore() => MongoStoreOptions();
        public MongoStore(string connectionString, string databaseName) => MongoStoreOptions(connectionString, databaseName);
        //private void MongoStoreOptions() => MongoStoreOptions(defaultConnectionString, defaultDatabaseName);
        private void MongoStoreOptions(string connectionString, string databaseName)
        {
            _connectionString = connectionString;
            _databaseName = databaseName;
            _client = this.Connect();
            _db = _client.GetDatabase(_databaseName);
            
            //this.LoadData(@"./mockdata/mockdata.json", "mockData");
        }

        public string ConnectionString
        {
            get { return _connectionString;}
            set { _connectionString = value;}
        }
        private string _databaseName;
        public string DatabaseName
        {
            get { return _databaseName;}
            set { _databaseName = value;}
        }
        public MongoClient Connect() => new MongoClient(_connectionString);
        public IMongoDatabase GetDatabase() => _client.GetDatabase(_databaseName);
        public IMongoCollection<T> GetCollection<T>(string collection) => _db.GetCollection<T>(collection);


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


