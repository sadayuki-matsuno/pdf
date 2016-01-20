(function()  {
  if (token) {
    console.log("token : ",token);
    var awsRegion = "ap-northeast-1";
    var creds = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-1:2a22378c-951b-47cf-b9c4-c0109b3da8fa",
      Logins: { 
        'graph.facebook.com': token
      }
    });
    AWS.config.update({
      region: awsRegion,
      credentials: creds
    });
    AWS.config.credentials.get(function(err) {
      if (!err) {
        console.log("Cognito Identity Id: " + AWS.config.credentials.identityId);
        var cognitoId = AWS.config.credentials.identityId;
        var s3 = new AWS.S3();
        var bucketName = 'matsuno-serverless'
        var params = {
          Bucket: bucketName,
          Prefix: cognitoId
        };
        s3.listObjects(params, function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else {
            contents = data['Contents']
            var response = {}
            for (var i = 0; i < contents.length; i++) {
              response[i] = {}
              response[i]['Name'] = contents[i]['Key'];
          }
          console.dir(response)
          }
        });
      }
    });
  }
}());
