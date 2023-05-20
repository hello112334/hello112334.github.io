// 初始化 Amazon Cognito 登入資料供應商
// AWS.config.region = "ap-northeast-1"; // 區域
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//   IdentityPoolId: "ap-northeast-1:81752833-c4cf-42f9-942c-c0599a8d4aec",
// });

// var cognitoUserPool = new AmazonCognitoIdentity.CognitoUserPool({
//   UserPoolId: "ap-northeast-1", // ユーザープールのID
//   ClientId: "ap-northeast-1_RpoTCgpQe", // アプリクライアントID
// });

// document
//   .getElementById("loginButton")
//   .addEventListener("click", function () {});// Configure the AWS SDK with your AWS credentials and region
// import { CognitoIdentityServiceProvider } from 'aws-sdk';
const AmazonCognitoIdentity = new AWS.CognitoIdentity();

// Configure the AWS SDK with your AWS credentials and region
AWS.config.update({
  region: "ap-northeast-1",
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "ap-northeast-1:81752833-c4cf-42f9-942c-c0599a8d4aec",
  }),
});

// Configure the Amazon Cognito credentials provider to use your identity pool
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "ap-northeast-1:81752833-c4cf-42f9-942c-c0599a8d4aec",
});

// Initialize the Amazon Cognito user pool with the User Pool ID and Client ID
// var userPool = new AmazonCognitoIdentity.CognitoUserPool({
//   UserPoolId: "ap-northeast-1",
//   ClientId: "ap-northeast-1_RpoTCgpQe",
// });

document.getElementById("loginButton").addEventListener("click", function () {
  console.log("loginButton");

  FB.getLoginStatus(function (response) {
    if (response.status === "connected") {
      console.log("User is logged in");
      var accessToken = response.authResponse.accessToken;
      var expiresAt = response.authResponse.expiresIn;
      var idToken = new AmazonCognitoIdentity.CognitoIdToken({
        IdToken: accessToken,
      });
      var refreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({
        RefreshToken: accessToken,
      });
      var sessionData = {
        IdToken: idToken,
        RefreshToken: refreshToken,
        AccessToken: accessToken,
        ExpiresIn: expiresAt,
        TokenType: "Bearer",
      };
      var session = new AmazonCognitoIdentity.CognitoUserSession(sessionData);
      var userData = {
        Username: "facebook",
        Pool: userPool,
      };
      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
      cognitoUser.setSignInUserSession(session);
      console.log("User is logged in");
    } else {
      console.log("User is not logged in");
      FB.login(function (response) {
        if (response.authResponse) {
          console.log("User has successfully logged in");
        } else {
          console.log("User did not fully log in");
        }
      });
    }
  });
});

function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
}

// Initialize the Facebook SDK
window.onload = function () {
  FB.init({
    appId: "621474459906899",
    cookie: true,
    xfbml: true,
    version: "v16.0",
  });
};
