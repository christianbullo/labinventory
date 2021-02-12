'use strict'
app.use("/api/stock/files", files); 


// Get file order 
// export const fetchFileOrder = (id) => dispatch => {
//     axios
//       .get("/api/stock/orders/uploads/", 
//             { params: { id: id} }, 
//             {
//                 responseType: 'stream'
//             }
//         )
//       .then(response => {
//         //alert('response fetch is ' + response);
//         return response.data;
//       })
//       .then(fileOrder => dispatch(getFileOrder(fileOrder)))
//       .catch(error => dispatch(ordersFailed(error.message)));
//   }



const Fs = require('fs')  
const Path = require('path')  
const Axios = require('axios')

async function downloadImage () {  
  const url = '/api/stock/files';
  const path = Path.resolve(__dirname, 'files', 'test.jpg');
  const writer = Fs.createWriteStream(path);

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

downloadImage();  