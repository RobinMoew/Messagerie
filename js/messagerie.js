let pseudos = ['Momo', 'Robin', 'Jesus', 'Ricardo'];
let display_message = $('#messages');
let input = $('#message');

$('#send').click(() => {
  let pseudo = pseudos[Math.floor(Math.random() * pseudos.length)];
  let message = $('#message').val();

  if (message == '') {
    alert("C'est un chat, c'est fait pour discuter. Tu vas pas dans un bar pour boire de l'eau !");
  } else {
    display_message.append(`
      <div class='pseudo'>${pseudo}:</div>
      <div class='message'>${message}</div>
    `);
    display_message.animate(
      {
        scrollTop: display_message[0].scrollHeight
      },
      500
    );
    input.val('');
  }

  $.ajax({
    url: 'php/addMessage.php',
    type: 'POST',
    data: {
      pseudo: pseudo,
      message: message
    }
  });
});

$('#reset').click(() => {
  display_message.html('');
  input.val('');

  $.ajax({
    url: 'php/getMessage.php',
    type: 'GET',
    success: (result) => {
      let json = JSON.parse(result);
      console.log(json);

      for (let i = 0; i < json.length; i++) {
        display_message.append(`
          <div class='pseudo'>${json[i].pseudo}:</div>
          <div class='message'>${json[i].message}</div>
        `);
      }
    }
  });
});
