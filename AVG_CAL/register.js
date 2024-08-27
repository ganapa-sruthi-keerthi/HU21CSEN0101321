const axios = require('axios');

const register = async () => {
  try {
    const response = await axios.post('http://20.244.56.144/test/register', {
      companyName: "AVG_CAL",
      ownerName: "Sruthi Keerthi Ganapa",
      rollNo: "HU21CSEN0101321",
      ownerEmail: "sganapa@gitam.in",
      accessCode: "RHFsxX"
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error registering:", error.message);
  }
};

register();

// {
//   companyName: 'AVG_CAL',
//   clientID: 'd065ca65-d85d-47a5-9849-f65edd7186e0',
//   clientSecret: 'ohqAnVVzdDLotJXD',
//   ownerName: 'Sruthi Keerthi Ganapa',
//   ownerEmail: 'sganapa@gitam.in',
//   rollNo: 'HU21CSEN0101321'
// }

// Authentication also done 

// {
//     "token_type": "Bearer",
//     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzI0NzM5NjY0LCJpYXQiOjE3MjQ3MzkzNjQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImQwNjVjYTY1LWQ4NWQtNDdhNS05ODQ5LWY2NWVkZDcxODZlMCIsInN1YiI6InNnYW5hcGFAZ2l0YW0uaW4ifSwiY29tcGFueU5hbWUiOiJBVkdfQ0FMIiwiY2xpZW50SUQiOiJkMDY1Y2E2NS1kODVkLTQ3YTUtOTg0OS1mNjVlZGQ3MTg2ZTAiLCJjbGllbnRTZWNyZXQiOiJvaHFBblZWemRETG90SlhEIiwib3duZXJOYW1lIjoiU3J1dGhpIEtlZXJ0aGkgR2FuYXBhIiwib3duZXJFbWFpbCI6InNnYW5hcGFAZ2l0YW0uaW4iLCJyb2xsTm8iOiJIVTIxQ1NFTjAxMDEzMjEifQ.W8TIhK4-_yI0myLUjdTAknx88jWE1FLM8B4xMsvx_nM",
//     "expires_in": 1724739664
// }