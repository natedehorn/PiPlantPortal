var socket = io.connect();
socket.on('post', (data) => {
  $('#temperature td').html(data.temperature);
  $('#humidity td').html(data.humidity);
  $('#light td').html(data.light);
  $('#moisture td').html(data.moisture);
  console.log(data)
})
