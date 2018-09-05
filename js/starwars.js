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
      let html = 'Episode ' + romanos[filmes[i].episode_id - 1];
      let titulo = resposta.title.toUpperCase();
      html += '\n' + titulo;
      html += '\n\n'  + resposta.opening_crawl;
      $('#intro').html(html);
    }
  });
});

$(document).ready(function() {
  let audio = new Audio('audio/star-wars-theme.mp3');
  audio.play();
});
