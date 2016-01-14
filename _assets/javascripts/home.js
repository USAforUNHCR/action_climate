'user-strict'
var gw = new Groundwork({
  'api_url': 'https://api.thegroundwork.com',
  'oauth_client_id': 'pub-un.climate-change-int-FKQNCktMwjde7J6UUnKf8eEZL7FCNIaS5Jem7Mj79dmNGsTOp1vCfI80IyjrFtcPMQ_jr.9QDxI07qYwunPFIA'
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



