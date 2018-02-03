using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DataStore.EntityModels
{
    [BsonIgnoreExtraElements]
    public class Trial// : MongoEntity<ObjectId>
    {
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string TrialType { get; set; }
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public DateTime TrialDate { get; set; }
        public Double TrialResultSeconds { get; set; } 
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string TrialNotes { get; set; }
    }
}