const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const path = require("path");
var multer = require("multer");

const s3Config = new aws.S3({
  accessKeyId: process.env.AWS_IAM_USER_KEY,
  secretAccessKey: process.env.AWS_IAM_USER_SECRET,
  Bucket: process.env.AWS_BUCKET_NAME,
});

const postS3Config = multerS3({
  s3: s3Config,
  bucket: process.env.AWS_BUCKET_NAME,
  // acl: 'public-read',
  metadata: function (req: any, file: any, cb: any) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req: any, file: any, cb: any) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      "public/posts/" +
      file.fieldname +
      "_" +
      uniqueSuffix +
      path.extname(file.originalname)
    );
  },
});

const uploadPost = multer({
  storage: postS3Config,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

//local upload

var storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, __dirname);
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

export { upload, uploadPost }
