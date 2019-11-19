Handlebars.registerHelper("formatSections", function(sections) {
    let counterVariable = 0;
    let totalHtml = "";

    for (let i = 0; i < sections.length; i++){
        let html = '<div class="sectionDiv>';
        html += sections[i].icon;
        html += '<h4 class="sectionHeading>' + sections[i].display + '</h4>';
        html += '<button type="button" class="btn btn-outline-dark sectionSelection ' + 'data-route= "' + sections[i].route + ">Read Section</button>";

        ++counterVariable;

        if (counterVariable === 3){
            html += '<div class="lineBreak"></div>';
            counterVariable = 0;
        }
        totalHtml += html;
    }
    return totalHtml;
});