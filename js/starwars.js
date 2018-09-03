// Seu código javascript aqui :)
// Use a Star Wars API ( https://swapi.co/) para carregar:
//  - A lista de filmes
//  - A introdução de cada filme, quando ele for clicado

$.ajax({
  url: 'https://swapi.co/api/films/',
  dataType: 'json',
  success: function(resposta) {
    var filmes = resposta.results;
    for(let i = 0; i < filmes.length; i++){
        let novoEl = document.createElement('li');
        let html = `<li></li>`;
        $(novoEl).html('Episode ' + filmes[i].episode_id + ': ' + filmes[i].title);
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
      let html = 'Episode ' + resposta.episode_id;
      let titulo = resposta.title.toUpperCase();
      html += '\n' + titulo;
      html += '\n\n'  + resposta.opening_crawl;
      $('#intro').html(html);
    }
  });
});
