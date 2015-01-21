
var $neighborhoods,
    lastUsedIndex = 0,
    maxExtraLoad = 3;

var createTemplate = function(title, imageSRC, description, pageURL) {
  var newArticle,
      imgTag,
      h2Tag,
      pTag;

      imgTag = '<img src="'+imageSRC+'">';
      h2Tag = '<h2>'+title.toUpperCase()+'</h2>';
      pTag = '<p>'+description+'</p>';
      newArticle = '<article class="content-item"><a href="'+pageURL+'">'+imgTag+h2Tag+"</a>"+pTag+'</article>'

  $('.content-grid').append(newArticle);
};

var loadMoreTemplate = function($el) {
  var i = lastUsedIndex+1,
      stopAtIndex = lastUsedIndex+1+maxExtraLoad;
  for (i; i<stopAtIndex; i++) {

    if (i < $neighborhoods.length) {

      var item = $neighborhoods[i];

      var title = $(item).children('title').html(),
          image = $(item).children('image').html(),
          description = $(item).children('description').html(),
          pageURL = $(item).children('page').html();

      createTemplate(title, image, description, pageURL);
    } else {

      $el.hide();
      break;
    }
  }
  lastUsedIndex = i;
}

$(document).ready(function() {

  //add listener to neighborhoods
  $('#load-more').on('click', function() {
    loadMoreTemplate($(this));
  });

  //add listener to hammie
  $('.hammie').on('click', function() {
    $(this).toggleClass("is-close-menu-btn");
    $('#main-nav').toggleClass('is-open');
  });

  //load neighborhoods
  $.ajax({
    url: '/dist/xml/neighborhoods.xml',
    dataType: 'xml',
    success: function(data, status, jqXHR) {
      if (jqXHR.status === 200) {
        $neighborhoods = $(data).find('neighborhood');

        $neighborhoods.each(function(index,item) { //index starts at 0
          if (index > 5) {
            return;
          }

          var title = $(item).children('title').html(),
              image = $(item).children('image').html(),
              description = $(item).children('description').html(),
              pageURL = $(item).children('page').html();

          createTemplate(title, image, description, pageURL);

          lastUsedIndex = index;
        });
      }
    },
    error: function(jqXHR, status, err) {
      console.log(status +" " +jqXHR.status);
    }
  });

});




