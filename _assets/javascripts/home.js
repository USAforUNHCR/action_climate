'user-strict'
var gw = new Groundwork({
  'api_url': 'https://api.thegroundwork.com',
  'oauth_client_id': 'pub-un-test.climate-change-test-int-7r9Hc3E7DKCjMgGwTXlHGSN_CXRfF3q4qhAYjYSS7I6jiCCYyxN3VfCS.GkOVmBTM27MGKV8PhzNdhTNxR3qSA'
});

function sendData(data){
  id ? data.externalId = id : null;
  data.tags.send_email = 0;
  gw.supporters.create(data)
  .then(function(res){
    console.log(res);
  })
  .catch(function(res){
    console.log(res);
  });
};



