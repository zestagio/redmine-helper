(function ($) {
  'use strict';

  $(document).ready(function() {
    var $title = $('div.issue div.subject h3');
    if ($title.length) {
      gitBranchAndCommit($title);
    }

    function gitBranchAndCommit($el) {
      var issueKey = $el.parents('div.issue').prev().text();
      var issueTitle = $el.text();
      var issueBranch = issueKey.match(/\d+/) + '-' + issueTitle.trim()
        .replace(/\[.*?\][\s\"\']*/g, '')
        .replace(/\W/g, '-')
        .replace(/-{2,}/g, '-')
        .replace(/[-]+$/, '')
        .toLowerCase();
      var issueCommit = issueKey + ': ' + issueTitle;

      var content = '';
      content += '<strong>Branch: <span class="copy-me" style="color:#d22;cursor:pointer;">' + issueBranch + '</span></strong><br />';
      content += '<strong>Commit: <span class="copy-me" style="color:#d22;cursor:pointer;">' + issueCommit + '</span></strong><br />';
      content += '<strong>Short commit: <span class="copy-me" style="color:#d22;cursor:pointer;">' + issueKey + ': </span></strong>';

      $el.after(content);

      $('span.copy-me').off('click').on('click', function () {
        var $this = $(this);
        navigator.clipboard.writeText($this.text()).then(function () {
          $this.fadeOut('slow', function () {
            $this.fadeIn('slow');
          });

          $.notify($this.text() + ' copied to clipboard', 'success');
        });
      });
    }
  });
})(window.jQuery);
