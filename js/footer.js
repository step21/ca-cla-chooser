$(document).ready(function() {
    //$("#wizard").steps();


    // $('#myWizard').wizard()
    //
    // var Showdown = require('showdown');
    var converter = new Showdown.converter();
    $( "#review" ).load( "agreement-template.html", function() {
          // $( "#review" ).html( converter.makeHtml( $( "#review" ).html() ));
        // replace variables here
        //
        $("#embed-agreement").html( $( "#review" ).html() );
    });


    // console.log("myTest: " + myTest);

    // $( "#review" ).html( converter.makeHtml( $( "#review" ).html() ) );
    //var textz = $( "#review" ).html();
    // console.log("text: " + textz);
});
