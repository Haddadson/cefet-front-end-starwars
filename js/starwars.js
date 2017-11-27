// Seu código javascript aqui :)
// Use a Star Wars API ( https://swapi.co/) para carregar:
//  - A lista de filmes
//  - A introdução de cada filme, quando ele for clicado

let romanos = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

$.ajax('https://swapi.co/api/films/', {
  dataType: 'json',
  success: function(resposta) {
    let $listaFilmes = $('#filmes ul');
    $listaFilmes.empty();

    resposta.results.sort(function(a, b) {
      return a.episode_id - b.episode_id;
    });

    resposta.results.forEach(function(filme) {
      $('<li></li>')
        .html('Episode ' + romanos[filme.episode_id] + ': ' + filme.title)
        .appendTo($listaFilmes)
        .data('url-episodio', filme.url)
        .click(function(e) {
          let $filme = $(e.currentTarget);
          $.ajax({
            url: $filme.data('url-episodio'),
            dataType: 'json',
            success: function(resposta) {
              let texto = 'Episode ' + romanos[resposta.episode_id] + '\n';
              texto += resposta.title.toUpperCase() + '\n\n';
              texto += resposta.opening_crawl;
              $('#intro').html(texto);
            }
          });
        });
    });
  }
});
