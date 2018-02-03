using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DataStore.EntityModels
{
    [BsonIgnoreExtraElements]
    public class TimedTest : MongoEntity<ObjectId>
    {
        
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public DateTime TestDate { get; set; }
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string PatientId { get; set; }
        
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string TestNotes { get; set; }

        public List<Trial> Trials { get; set; }
       
    }
}