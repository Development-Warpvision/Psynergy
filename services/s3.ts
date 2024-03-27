import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_IAM_USER_KEY,
  secretAccessKey: process.env.AWS_IAM_USER_SECRET,
});

export const uploadedImage = async (params: {
  decodedData: any;
  Key: string;
}) => {
  const s3Config = await s3
    .upload({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: params.Key,
      Body: params.decodedData,
    })
    .promise();
  return s3Config.Location;
};
