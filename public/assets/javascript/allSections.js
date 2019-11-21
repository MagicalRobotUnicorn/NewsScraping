$('.sectionSelection').on("click", () => {
    let route = $(this).attr('id');
    window.location.href = '/section/' + route;
});