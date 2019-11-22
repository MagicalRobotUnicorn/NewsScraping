$('.articleSelection').on("click", function(){
    let articleId = $('this').attr('data-route');
    const url = $('this').attr('data-url');

    const $totalDiv = $('div#' + articleId);

    const imageAddress = $totalDiv.find('.contentCol.articleImage').attr('src');
    const byline = $totalDiv.find('.contentCol.byline').innerHtml();
    const summary = $totalDiv.find('.contentCol.summary').innerHtml();

    const articleObject = {
        url,
        imageAddress,
        byline,
        summary
    }
    
    $.get('/individualArticle/' + articleId, articleObject);
});