$(document).ready(function() {
    //$("#wizard").steps();


    // $('#myWizard').wizard()
    //
    var converter = new Markdown.Converter();
    $( "#review" ).load( "agreement-template.md" ).trigger('create');
    // var text = converter.makeHtml( $( "#review" ).html() );
    var textz = $( "#review" ).html();
    console.log("text: " + textz);
});
