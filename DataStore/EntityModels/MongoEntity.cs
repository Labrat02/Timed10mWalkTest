using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DataStore.EntityModels
{
    public class MongoEntity<T>
    {
        private ObjectId _objectId;
        [BsonId]
        public ObjectId Id
        {
            get { return _objectId;}
            set { _objectId = value; IdString = value.ToString(); }
        }
        
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string IdString {get; set; }
    }
}