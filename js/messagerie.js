let pseudos = ['Momo', 'Robin', 'Jesus'];
let display_message = $('#messages');
let input = $('#message');
let id = 0;
let class_nb = 0;
let smileys_shown = false;
let smileys = ['😃', '👽', '🖕'];

$('#smileys').hide();
for (let i = 0; i < smileys.length; i++) {
  $('#smileys').append(`
    <div class='smiley' id='smiley${i}'>${smileys[i]}</div>
  `);
}

$('#btn_smileys').click(() => {
  if (!smileys_shown) {
    smileys_shown = true;
    $('#smileys').show();
  } else {
    $('#smileys').hide();
    smileys_shown = false;
  }
});

$('#send').click(() => {
  let pseudo = pseudos[Math.floor(Math.random() * pseudos.length)];
  let message = $('#message').val();

  if (message == '') {
    alert("C'est un chat, c'est fait pour discuter. Tu vas pas dans un bar pour boire de l'eau !");
  } else {
    display_message.append(`
    <div class='message_container' id="${id}">
      <div class='pseudo ${class_nb}'><img class="imagePseudo" src="https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png">${pseudo}:</div>
      <div class='message'>${message}</div>
    </div>
    `);
    display_message.animate(
      {
        scrollTop: display_message[0].scrollHeight
      },
      500
    );

    input.val('');

    /*     for (let i = 0; i < display_message[0].children.length; i++) {
      pseudo = display_message[0].children[i].firstChild.nextSibling.innerText;
      color = display_message[0].children[i].firstChild.nextSibling.style.backgroundColor;

      if (
        $('.' + class_nb)[0].className !=
        display_message[0].children[i].firstChild.nextSibling.className
      ) {
        $('.' + class_nb).css('background-color', getRandomColor());
        class_nb++;
      } else {
        $('.' + class_nb).css('background-color', $('.' + class_nb).css('background-color'));
      }
    } */

    $('#' + id).css('background-color', getRandomColor());

    id++;
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

      for (let i = 0; i < json.length; i++) {
        display_message.append(`
          <div class='message_container' id="${id}">
            <div class='pseudo'>${json[i].pseudo}:</div>
            <div class='message'>${json[i].message}</div>
          </div>`);

        $('#' + id).css('background-color', getRandomColor());

        id++;
      }
    }
  });
});

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
