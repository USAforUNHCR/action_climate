'use-strict';
var gwData = {};
var govResponse = {};

$(document).ready(function(){
  id = getId();
  reachListener();
  messageListener();
  dialogListener();
  dialogCloseListener();
})

function getId(){
  var id = /=(.*)/.exec(document.location.href);
  if(id){
  return id[1];
  }
  else{
    return null;
  }
}

function reachListener(){
  var form = $('.reach-out-form');
  form.submit(function(event){
    event.preventDefault();
    var data = {};
    data.tags = {};
    var tags = data.tags;
    data.email = form.find("[name='email']").val();
    data.givenName = form.find("[name='fname']").val();
    data.address1 = form.find("[name='addr1']").val();
    data.address2 = form.find("[name='addr2']").val();
    data.city = form.find("[name='city']").val();
    data.state = form.find("[name='state']").val();
    var stateLong = form.find("[value='" + tags.state + "']").html();
    data.postalCode = form.find("[name='zip']").val();
    customForm(data,stateLong);
    if(form.hasClass('mayor')){
      data.source = ("kickstarter mayor");
    }
    else if(form.hasClass('governor')){
      data.source = ("kickstarter governor");
      geofunc(tags.zip);  
    }
    else if(form.hasClass('aid-worker')){
      data.source = ("kickstarter thanks");
    }
    gwData = data;
    sendData(data);
  });
}

function customForm(data,stateLong){
  var message = $('.message-div');
  message.find('.mess-name').html(data.givenName);
  message.find('.state').html(data.state);
  message.find('.city').html(data.city);
  message.find('.email').html(data.email);
  message.find('.state-long').html(stateLong);
  message.attr('contenteditable',true);
  $('#message-submit').show();
}


function messageListener(){
  $('#message-submit').click(function(event){
    event.preventDefault();
    var form = $('.message-form');
    gwData.tags.message = form.find('.message-div').html();
    gwData.source = gwData.source + " message";
    debugger;
    $('#message-submit').hide();
    $('.message-form').append('<span>Thanks for your message</span>');
    sendData(gwData);
  });
}

function dialogListener(){
  $('.message-form').click(function(event){
    event.stopPropagation();
    if($('.message-div').attr('contenteditable') === 'false'){
    $(".dialog").show();
  }
  })
}

function dialogCloseListener(){
  $(document).click(function(event){
    $('.dialog:visible').hide();
  })
}