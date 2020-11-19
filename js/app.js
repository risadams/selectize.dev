$(function () {
  //switch themes
  var $theme_links = $("#theme-selector button");
  $theme_links.on("click", function () {
    var theme = $(this).attr("data-theme");
    $theme_links.removeClass("active btn-primary");
    $theme_links.addClass("btn-secondary");
    $(this).addClass("active btn-primary");
    $("link[data-theme]").prop("disabled", true);
    $("link[data-theme=" + theme + "]").prop("disabled", false);
  });

  //toggle source code display
  $("script.show").each(function () {
    var $a, $pre;
    var self = this;
    var code, lines, indent, lineindent, i, n;

    // re-indent code and add to <pre>
    code = this.text;
    if (code && code.length) {
      lines = code.split("\n");
      indent = null;

      for (i = 0, n = lines.length; i < n; i++) {
        if (/^[\t ]*$/.test(lines[i])) continue;
        if (!indent) {
          lineindent = lines[i].match(/^([\t ]+)/);
          if (!lineindent) break;
          indent = lineindent[1];
        }
        lines[i] = lines[i].replace(new RegExp("^" + indent), "");
      }

      var code = hljs.highlight("javascript", $.trim(lines.join("\n")).replace(/	/g, "    ")).value;
      $a = $('<a href="javascript:void(0)" class="toggle-code closed">Show Code</a>');
      $pre = $("<pre>")
        .hide()
        .html('<code class="javascript hljs">' + code + "</code>");

      $a.on("click", function () {
        var state = !$pre.is(":visible");
        $pre.toggle(state);
        $a.toggleClass("open", state);
        $a.toggleClass("closed", !state);
        $a.html(state ? "Hide Code" : "Show Code");
      });

      $pre.insertAfter(self);
      $a.insertAfter(self);
    }
  });
});
