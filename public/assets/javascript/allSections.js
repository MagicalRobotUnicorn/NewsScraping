$('.sectionSelection').on("click", function() {
    let route = $(this).attr('id');
    window.location.href = '/section/' + route;
});