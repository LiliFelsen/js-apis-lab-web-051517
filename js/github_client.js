let token = '4903eaa06801bacddda2e1de919d758287a8ebee'


//define functions here
var createGist = function(file_name, content, description, token){
  let url = `https://api.github.com/gists`
  let data = {
    'public': true,
    'description': description,
    'files': {}
  }
  data['files'][file_name] = {
    'content': content
  }

  $.ajax({
    url: url,
    method: 'POST',
    data: JSON.stringify(data),
    headers: {
      Authorization: 'token ' + token
    },
    success: function (response) {
      myGists(response.owner.login, token)
    },
    error: function () {
      console.log('Something went wrong, please check your token');
    }
  })
};

var myGists = function (username, token){
 $.ajax({
   url: url: 'https://api.github.com/users/' + username + '/gists?access_token=' + token,
  dataType: 'jsonp',
  success: function(data) {
    var receivedData = data.data
    receivedData.forEach(function(gist){
        $('#gists').append(`<p><a href="${gist.html_url}">${gist.description}</a></p>`)
    })
  }
 })
};

var bindCreateButton = function(event) {
  // call functions here
  event.preventDefault()
  $("#buttonCreate").on("click", function(){
    let filename = $("#filename").val()
    let content = $("#content").val()
    let description = $("#description").val()
    let token = $("#token").val()

    createGist(filename, content, description, token)
  })
  };

$(document).ready(function(){
  bindCreateButton()
});
