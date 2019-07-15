const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const bootlint = require("gulp-bootlint");

// Task to minify images
gulp.task("default", () =>
  gulp
    .src("static/**/*.+(png|jpg)")
    .pipe(imagemin())
    .pipe(gulp.dest("static"))
);

// Lint Bootstrap v4 HTML
// Bootlint is intended for Bootstrap 3 so many rules are disabled
// visit: https://github.com/twbs/bootlint/wiki for rules
gulp.task("bootlint", function() {
  var fileIssues = [];
  return gulp.src("public/**/index.html").pipe(
    bootlint({
      stoponerror: true,
      stoponwarning: true,
      loglevel: "debug",
      disabledIds: [
        "W001",
        "W002",
        "W003",
        "W005",
        "W009",
        "W010",
        "W012",
        "W014",
        "W015",
        "W017",
        "E004",
        "E007",
        "E013",
        "E014",
        "E015",
        "E027",
        "E029",
        "E033",
        "E040",
        "E041",
        "E043"
      ],
      issues: fileIssues,
      reportFn: function(file, lint, isError, isWarning, errorLocation) {
        var message = isError ? "ERROR! - " : "WARN! - ";
        if (errorLocation) {
          message +=
            file.path +
            " (line:" +
            (errorLocation.line + 1) +
            ", col:" +
            (errorLocation.column + 1) +
            ") [" +
            lint.id +
            "] " +
            lint.message;
        } else {
          message += file.path + ": " + lint.id + " " + lint.message;
        }
        console.log(message);
      },
      summaryReportFn: function(file, errorCount, warningCount) {
        if (errorCount > 0 || warningCount > 0) {
          console.log(
            "please fix the " +
              errorCount +
              " errors and " +
              warningCount +
              " warnings in " +
              file.path
          );
        } else {
          //    console.log("No problems found in " + file.path);
        }
      }
    })
  );
});
