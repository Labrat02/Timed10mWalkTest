using System.Collections.Generic;
using DataStore;
using DataStore.EntityModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using webapi.Helpers;

namespace webapi.Controllers
{
    [EnableCors("CorsPolicy")] 
    [Route("api/[controller]")]
    public class TimedTestController : Controller
    {
        TimedTestHelper _helper;
        public TimedTestController(IMongoDBContext dbContext)
        {
            _helper = new TimedTestHelper(dbContext);
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
            return _helper.GetTestById(id);
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
