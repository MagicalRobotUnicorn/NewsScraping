const express = require("express");
const exphbs = require("express-handlebars");
const axios = require("axios");
const mongoose = require("mongoose");
const path = require("path");

const nytimes = require("./config/keys");

const app = express();

const PORT = process.env.PORT || 8080;

mongoose.connect("mongodb://127.0.0.1:27017", { useNewUrlParser: true });

app.use(express.urlencoded({}));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));

var hbs = exphbs.create({
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/partials"),
  helpers: {
    formatSections: function(sections, options) {
      let counterVariable = 0;
      let totalHtml = '<div class="row">';

      for (let i = 0; i < sections.length; i++) {
        let html = '<div class="col-2.5 sectionDiv">';
        html += sections[i].icon;
        html += '<h4 class="sectionHeading">' + sections[i].display + "</h4>";
        html +=
          '<button type="button" class="btn btn-outline-dark sectionSelection" id="' +
          sections[i].route +
          '">Read Section</button>';

        html += "</div>";
        ++counterVariable;

        if (counterVariable === 4) {
          html += '</div><div class="row">';
          counterVariable = 0;
        }
        totalHtml += html;
      }
      totalHtml += "</div>";

      return options.fn({ totalHtml: totalHtml });
    },
    displayArticle: function(articleObject, options){

      // <div class="row individualArticle" id="{{this.id}}">
      //       <div class="col-4 photoCol">
      //           <img src="{{this.thumb}}" class="articleImage" />
      //       </div>
      //       <div class="col-8 contentCol">
      //           <h5 class="headline">{{this.headline}}</h5>
      //           <p class="byline">{{this.author}}</p>
      //           <p class="summary">{{this.summary}}</p>
      //           <p class="url">{{this.url}}</p>
      //           <button type="button" class="btn btn-outline-dark articleSelection" data-route="{{this.id}}" data-url="{{this.url}}">Explore Article</button>
      //       </div>
      //   </div>

        // let html = '<div class="row singleArticle">';
        // html += '<div class="col-4 photoCol">';
        // html += '<img src="' + imageAddress + '" class="articleImage">';
        // html += '</div>';
        // html += '<div class="col-4 photoCol">';
        // html += '<div class="col-8 contentCol">'
        // html += '<h5 class="headline">' + headline + '</h5>';
        // html += '<p class="byline">' + byline + '</p>';
        // html += '<p class="summary">' + summary + '</p>';
        // html += '<button type="button" class="btn btn-outline-dark visitArticle" data-url="' + url + '">Read Article</button>';
        // html += '</div>';
        // html += '</div>';

        return options.fn({ totalHtml: html });
        
        // let individualResponse = {
        //     headline : response.data.results[i].title,
        //     author : response.data.results[i].byline,
        //     summary : response.data.results[i].abstract,
        //     url : response.data.results[i].url,
        //     thumb : response.data.results[i].multimedia[1].url
        //     }
        //     individualResponse.id = individualResponse.url.replace(/([:./])/g, '');
        //     responseArray.push(individualResponse);
    },
    formatComments: function(comments) {
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
          '<div class="noComments">No Comments Exist On This Article</div>';
        totalHtml += html;
      }
      return options.fn({ totalHtml: totalHtml });
    }
  }
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.set("views", path.join(__dirname, "views"));

app.use(require("./controllers/application_controller"));

app.listen(PORT, function() {
  console.log("Application is listening on PORT:", PORT);
});
