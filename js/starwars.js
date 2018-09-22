let romanos = ['I', 'II','III', 'IV','V', 'VI','VII', 'VIII', 'IX'];

$.ajax({
  url: 'https://swapi.co/api/films/',
  dataType: 'json',
  success: function(resposta) {
    var filmes = resposta.results;

    //Ordenar array de filmes
    filmes.sort(function(a, b) {
      return a.episode_id - b.episode_id;
    });

    for(let i = 0; i < filmes.length; i++){
        let novoEl = document.createElement('li');
        let html = `<li></li>`;
        $(novoEl).html('Episode ' + romanos[filmes[i].episode_id - 1] + ': ' + filmes[i].title);
        $(novoEl).data('data-url-episodio', filmes[i].url);
        $(novoEl).appendTo("#lista-filmes");
    }
  }
});

$('#filmes').on('click', 'li', function(e) {
  let elemento = e.currentTarget;

  $.ajax({
    url: $(elemento).data('data-url-episodio'),
    dataType: 'json',
    success: function(resposta) {
      let html = 'Episode ' + romanos[resposta  .episode_id - 1];
      let titulo = resposta.title.toUpperCase();
      html += '\n' + titulo;
      html += '\n\n'  + resposta.opening_crawl;
      $('#intro').html(html);

      let audio = new Audio('audio/star-wars-theme.mp3');
      let promise = audio.play();
      if (promise !== undefined) {
        promise.then(_ => {
                  console.log(`%c
                               .-.
                              |_:_|
                             /(_Y_)\\
        .                   ( \\/M\\/ )
         '.               _.'-/'-'\\-'._
           ':           _/.--'[[[[]'--.\\_
             ':        /_'  : |::"| :  '.\\
               ':     //   ./ |oUU| \\.'  :\\
                 ':  _:'..' \\_|___|_/ :   :|
                   ':.  .'  |_[___]_|  :.':\\
                    [::\\ |  :  | |  :   ; : \\
                     '-'   \\/'.| |.' \\  .;.' |
                     |\\_    \\  '-'   :       |
                     |  \\    \\ .:    :   |   |
                     |   \\    | '.   :    \  |
                     /       \\   :. .;       |
                    /     |   |  :__/     :  \\\\
                   |  |   |    \\:   | \\   |   ||
                  /    \\  : :  |:   /  |__|   /|
                  |     : : :_/_|  /'._\\  '--|_\\
                  /___.-/_|-'   \\  \\
                                 '-'`, "font-family:monospace" );
          }).catch(error => {
            console.log("DEU ERRO!!");
          });
      }
    }
  });
});

$(document).ready(function() {
  let audio = new Audio('audio/star-wars-theme.mp3');
  let promise = audio.play();
  if (promise !== undefined) {
    promise.then(_ => {
      console.log("Tocou!!")
    }).catch(error => {
      console.log("O Chrome passou a barrar Autoplay, então só vai tocar a música quando escolher um filme.");
    });
  }
});
