// Seu código javascript aqui :)
// Use a Star Wars API ( https://swapi.co/) para carregar:
//  - A lista de filmes
//  - A introdução de cada filme, quando ele for clicado

$.ajax('https://swapi.co/api/films/', {
  dataType: 'json',
  success: function(resposta) {
    let $listaFilmes = $('#filmes ul');
    $listaFilmes.empty();

    resposta.results.forEach(function(filme) {
      $('<li></li>')
        .html('Episode ' + filme.episode_id + ': ' + filme.title)
        .appendTo($listaFilmes);
    });
  }
});
