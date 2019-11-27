$('.articleSelection').on("click", function(){
    let articleId = $(this).attr('data-route');

    const url = $(this).attr('data-url');

    const $totalDiv = $('div.individualArticle#' + articleId);

    const imageAddress = $totalDiv.find('.photoCol img.articleImage').attr('src');
    const headline = $totalDiv.find('.contentCol h5.headline').html();
    const byline = $totalDiv.find('.contentCol p.byline').html();
    const summary = $totalDiv.find('.contentCol p.summary').html();

    const articleObject = {
        url,
        imageAddress,
        headline,
        byline,
        summary,
        articleId
    }

    // window.location.href = '/individualArticle/' + articleId;

    $.ajax({
        url: '/api/article/' + articleId,
        data: articleObject,
        type: "GET",
        success: (response) => {
            if (response.length === 0){
                $.ajax({
                    url: '/api/article/' + articleId,
                    data: articleObject,
                    type: "POST",
                    success: function(response){
                        console.log(response);
                        window.location.href = '/individualArticle/' + articleId;
                    }
                });
            }
            else {
                window.location.href = '/individualArticle/' + articleId;
            }
        }
    });
});