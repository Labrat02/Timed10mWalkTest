using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataStore;
using DataStore.EntityModels;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using webapi.Helpers;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    public class TimedTestController : Controller
    {
        TimedTestHelper _helper;
        public TimedTestController(IMongoStore mongoStore)
        {
            _helper = new TimedTestHelper(mongoStore);
        }
        // GET api/values
        [HttpGet]
        public List<TimedTest> Get()
        {
            return _helper.GetAllTimedTests();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public TimedTest Get(string id)
        {
            var objectId = new ObjectId(id);
            return _helper.GetTestById(objectId); //new ObjectId("5513306a2dfd32ffd580e323")
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]TimedTest value)
        {
            _helper.InsertTimedTest(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(string id, [FromBody]TimedTest value)
        {
            _helper.UpdateTimedTest(id, value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            //_helper.DeleteDocument(id);
        }
    }
}
