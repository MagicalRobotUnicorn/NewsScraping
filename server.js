const express = require("express");
const exphbs = require("express-handlebars");
const axios = require("axios");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({}));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));



var hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: {
        formatSections: function(sections, options) {
            let counterVariable = 0;
            let totalHtml = '<div class="row">';

        
            for (let i = 0; i < sections.length; i++){
                let html = '<div class="col-2.5 sectionDiv">';
                html += sections[i].icon;
                html += '<h4 class="sectionHeading">' + sections[i].display + '</h4>';
                html += '<button type="button" class="btn btn-outline-dark sectionSelection" data-route= "' + sections[i].route + '">Read Section</button>';
        
                html += '</div>';
                ++counterVariable;
        
                if (counterVariable === 4){
                    html += '</div><div class="row">';
                    counterVariable = 0;
                }
                totalHtml += html;
            }
            totalHtml += '</div>';
            
            return options.fn({totalHtml : totalHtml});
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

// app.set("view engine", "handlebars");

// exphbs.registerHelper("formatSections", function(sections) {
//     let counterVariable = 0;
//     let totalHtml = "";

//     for (let i = 0; i < sections.length; i++){
//         let html = '<div class="sectionDiv>';
//         html += sections[i].icon;
//         html += '<h4 class="sectionHeading>' + sections[i].display + '</h4>';
//         html += '<button type="button" class="btn btn-outline-dark sectionSelection ' + 'data-route= "' + sections[i].route + ">Read Section</button>";

//         ++counterVariable;

//         if (counterVariable === 3){
//             html += '<div class="lineBreak"></div>';
//             counterVariable = 0;
//         }
//         totalHtml += html;
//     }
//     return totalHtml;
// });

// const routes = require("./controllers/application_controller");
app.use(require("./controllers/application_controller"));

app.listen(PORT, function(){
    console.log("Application is listening on PORT:", PORT);
})