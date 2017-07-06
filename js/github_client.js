let token = $("#token").val()


//define functions here
var createGist = function(filename, content, description, token){
  let url = `https://api.github.com/gists`
  let fileName = $('#filename').val()
  let content = $('#content').val()
  let description = $('#description').val()

  let newGist = {
    'description': description,
    'public': true,
    'files': {
      fileName: {
        'content': content
      }
    }
  }

  $.ajax({
    url: url,
    method: 'POST',
    data: JSON.stringify(newGist),
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
