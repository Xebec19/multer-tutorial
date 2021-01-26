import express from 'express';
import multer from 'multer';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000

//multer set
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/myuploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
 
var upload = multer({ 
	storage: storage ,

}).single('profilepic');

app.set('view engine','ejs');

app.use(express.static('./public'));

app.get('/',(req,res) => {
res.render('index');
})

//Desc
app.post('/upload',(req,res) => {
	upload(req,res,(error) => {
		if(error){
			res.render('index',{
				message: error
			})
		}else {
			res.render('index',{
				message:'Successfully uploaded ...',
				filename: `myuploads/${req.file.filename}`
			})
		}
	})
})

app.listen(port,() => console.log(`Running ${port}`))