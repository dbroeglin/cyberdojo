/*jsl:option explicit*/

var cyberDojo = (function($cd, $j) {

  // Builds the diff filenames click handlers for a given kata-id,
  // given animal-name, and given traffic-light number. Clicking
  // on the filename brings its diff into view by loading it into
  // the diffSheet.
  
  $cd.buildDiffFilenameHandlers = function(diffs) {
    var diffSheet = $j('#diff_sheet');
    var diffPanel = $j('#diff_panel');
  
    var previousFilename;
    
    var loadFrom = function(filename, diff) {
      var sectionIndex = 0;
      var sectionCount = diff.section_count;
      return function() {
        diffSheet.html(diff.content);
        $cd.radioEntrySwitch(previousFilename, filename);
        previousFilename = filename;
        if (sectionCount > 0) {
          var id = diff.name.replace(/\./g, '_');
          var pos = $j('#' + id + '_section_' + sectionIndex).offset();
          sectionIndex += 1;
          sectionIndex %= sectionCount;
          diffPanel.animate({ scrollTop:  pos.top - 80 }, 500 );
        }        
      };
    };
    
    $j.each(diffs, function(n, diff) {
      // _filenames.html.erb contains an
      // <input type="radio" id="radio_<%= diff[:id] %>" />
      // for each file in the current diff.
      var filename = $j('#radio_' + diff.id);
      filename.parent().click( loadFrom(filename, diff));
      if (diff.section_count > 0) {
        filename.parent().attr('title', 'reclick to cycle through diffs');
      }
    });
  };

  return $cd;
})(cyberDojo || {}, $);
