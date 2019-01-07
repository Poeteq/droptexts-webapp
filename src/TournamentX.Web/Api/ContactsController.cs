using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace TournamentX.Web.Api
{

    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {

        private IHostingEnvironment _hostingEnvironment;

        public ContactsController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet("all")]
        public IActionResult GetAllContacts()
        {
            string folderName = "Upload";
            string webRootPath = _hostingEnvironment.WebRootPath;
            string newPath = Path.Combine(webRootPath, folderName);
            //string[] filePaths = Directory.GetFiles(newPath, "*.txt",
            //                             SearchOption.TopDirectoryOnly);

            if (!Directory.Exists(newPath))
            {
                Directory.CreateDirectory(newPath);
            }


            var files = Directory.GetFiles(newPath).Select(Path.GetFileName);
            //for (var i = 0; i < filePaths.Length; i++)
            //{
            //    var toTrim = newPath.ToCharArray();
            //    filePaths[0] = filePaths[0].Trim(toTrim);
            //}

            return Ok(files);
        }

        [HttpDelete("{fileName}")]
        public IActionResult DeleteContact([FromRoute] string fileName)
        {
            string folderName = "Upload";
            string webRootPath = _hostingEnvironment.WebRootPath;
            string newPath = Path.Combine(webRootPath, folderName);
            //string[] filePaths = Directory.GetFiles(newPath, "*.txt",
            //                             SearchOption.TopDirectoryOnly);

            if (!Directory.Exists(newPath))
            {
                Directory.CreateDirectory(newPath);
            }
            var fullFilePath = Path.Combine(newPath, fileName);
            if (System.IO.File.Exists(fullFilePath))
                System.IO.File.Delete(fullFilePath);

            //for (var i = 0; i < filePaths.Length; i++)
            //{
            //    var toTrim = newPath.ToCharArray();
            //    filePaths[0] = filePaths[0].Trim(toTrim);
            //}

            return Ok(true);
        }

        [HttpPost("upload")]
        public IActionResult UploadContacts()
        {
            try
            {
                var lines = new List<string>();
                var file = Request.Form.Files[0];
                string folderName = "Upload";
                string webRootPath = _hostingEnvironment.WebRootPath;
                string newPath = Path.Combine(webRootPath, folderName);

                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }

                if (file.Length > 0)
                {
                    string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    string fullPath = Path.Combine(newPath, fileName);
                    using (var fs = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(fs);
                    }

                }

                return Ok(true);
            }
            catch (System.Exception ex)
            {
                return Ok("Upload Failed: " + ex.Message);
            }
            //using (FileStream fs = new FileStream(fullPath, FileMode.Open, FileAccess.Read))
            //{
            //    using (StreamReader sr = new StreamReader(fs))
            //    {
            //        while (!sr.EndOfStream)
            //        {
            //            string line = sr.ReadLine();
            //            int number;
            //            if (Int32.TryParse(line, out number))
            //                lines.Add(line);
            //        }
            //    }
            //}
        }
        
    }
}
