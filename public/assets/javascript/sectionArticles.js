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
        summary
    }

    console.log(articleObject);
    
    $.ajax({
        url: '/individualArticle/' + articleId,
        data: { articleObject },
        type: "GET"
    });
});