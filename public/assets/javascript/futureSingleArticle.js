$(document).ready(function(){
  $.ajax({
  type: "GET",
  url: "/api/" + $('.singleArticle').attr('id'),
  dataType: "json",
  success: function(result){
    let totalHtml = "";

      if (comments.length !== 0) {
        for (let i = 0; i < comments.length; i++) {
          let html = '<div class="row"><div class="col-8">';
          html += '<h5 class="author">' + comment.author + "</h5>";
          html += '<p class="content">' + comment.content + "</p>";
          html += "</div></div>";

          totalHtml += html;
        }
      } else {
        html =
          '<div class="row noComments">No Comments Exist On This Article</div>';
        totalHtml += html;
      }
      $('#commentSection').html(totalHtml);
  }
})
});

