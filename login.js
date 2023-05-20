// login.js
AWS.config.region = 'us-east-1'; // リージョン
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', // CognitoのIdentity Pool ID
});

var cognitoUserPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId: 'us-east-1_xxxxxxxxx', // ユーザープールのID
    ClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxx', // アプリクライアントID
});

document.getElementById('loginButton').addEventListener('click', function() {
    var authenticationData = {
        Username: 'username',
        Password: 'password',
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var userData = {
        Username: 'username',
        Pool: "cognitoUserPool"
    }
});