$(document).on('ready', function() {
  // get all speakers on DOM load
  getSpeakers();
});

// // handle form submission
// $('form').on('submit', function(e){
//   e.preventDefault();
//   // clear message
//   $('#message').html('');
//   // create payload on form submit
//   var payload = {
//     name: $('#name').val(),
//     zoo:$('#checkbox').prop('checked'),
//     nemesis: $('#nemesis').val()
//   };
//   // send post request to server
//   $.post('/penguins', payload, function(data) {
//     // append 'Added' to DOM
//     $('#message').html('Added');
//     // get all penguins
//     getPenguins();
//   });
// });

// get all speakers function
function getSpeakers() {
  // clear all speakers
  $('#all').html('');
  // send get request to server
  $.get('/api/v1/speakers', function(data) {
    // loop through array of objects, appending each to the DOM
    for (var i = 0; i < data.length; i++) {
      $('#all').append(
        '<tr>'+
          '<td>'+(i+1)+'</td>'+
          '<td>'+data[i].first_name+'</td>'+
          '<td>'+data[i].last_name+'</td>'+
          '<td>'+data[i].email+'</td>'+
          '<td>'+data[i].topic+'</td>'+
          '<td>'+data[i].speaking_date+'</td>'+
          '<td>'+data[i].company+'</td>'+
          '<td>'+data[i].role+'</td>'+
          '<td>'+data[i].github+'</td>'+
          '<td>'+data[i].twitter+'</td>'+
          '<td>'+data[i].linkedin+'</td>'+
        '</tr>'
      );
    }
  });
}
