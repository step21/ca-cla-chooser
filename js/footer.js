
var doDebug = true;

    var generalPageIndex    = 0;
    var isGeneralPageOk     = false;
    
    var copyrightPageIndex  = 1;
    var isCopyrightPageOk   = false;
    
    var patentPageIndex     = 2;
    var isPatentPageOk      = false;
    
    var reviewPageIndex     = 3;
    var isReviewPageOk      = false;

    var applyPageIndex      = 4;
    var isApplyPageOk       = false;

    var outboundCopyrightLicenses = '';
    var mediaLicenses       = '';


function setFakeData ()
{
    $('#project-family-name').val('Fabricatorz');
    $('#project-name').val('Archive Software');
    $('#project-website').val('http://archive.fabricatorz.com');
    $('#project-email').val('jon@fabricatorz.com');
    $('#contributor-process-url').val('http://archive.fabricatorz.com/signing');
    $('#project-jurisdiction').val('United States, Hong Kong, and China Mainland.');
}

function ucFirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function validateEmail(email) 
{
        var re = /\S+@\S+\.\S+/;
            return re.test(email);
}

function validateURL(textval) {
          var urlregex = new RegExp(
                      "^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
                return urlregex.test(textval);
}


function oinspect (obj)
{
    var str = "";
    for(var k in obj)
        if (obj.hasOwnProperty(k)) 
            str += k + " = " + obj[k] + "\n";
    
    alert(str);
}


function testGeneralPage ()
{
            isGeneralPageOk = true;

            if ( !$('#project-family-name').val() ) {
                $('#project-family-name').addClass("cla-alert");
                isGeneralPageOk = false;
            } else {
                $('#project-family-name').removeClass("cla-alert");
            }

            if ( !$('#project-name').val() ) {
                $('#project-name').addClass("cla-alert");
                isGeneralPageOk = false;
            } else {
                $('#project-name').removeClass("cla-alert");
		    }

            if ( !$('#project-website').val() || 
                 !validateURL( $('#project-website').val() ) ) {
                $('#project-website').addClass("cla-alert");
                isGeneralPageOk = false;
            } else {
                $('#project-website').removeClass("cla-alert");
            }

            if ( !$('#project-email').val() ||
                 !validateEmail($('#project-email').val()) ) 
            {
                $('#project-email').addClass("cla-alert");
                isGeneralPageOk = false;
            } else {
                $('#project-email').removeClass("cla-alert");
            }

            if ( !$('#contributor-process-url').val() ||
                 !validateURL( $('#contributor-process-url').val()  ) ) {
                $('#contributor-process-url').addClass("cla-alert");
                isGeneralPageOk = false;
            } else {
                $('#contributor-process-url').removeClass("cla-alert");
            }

            if ( !$('#project-jurisdiction').val() ) {
                $('#project-jurisdiction').addClass("cla-alert");
                isGeneralPageOk = false;
            } else {
                $('#project-jurisdiction').removeClass("cla-alert");
            }

    testReviewPage();

    return isGeneralPageOk;
}

function testCopyrightPage ()
{
            isCopyrightPageOk = true;

            var outboundChoices = $( "#outboundlist" ).val() || [];
            var mediaChoices    = $( "#medialist" ).val() || [];

            if ( !$('#outboundlist').val() ) {
                $('#outboundlist').addClass("cla-alert");
                isCopyrightPageOk = false;
            } else {
                outboundCopyrightLicenses = outboundChoices.join(", ");
                console.log("outboundCopyrightLicenses: " +
                            outboundCopyrightLicenses);

                $('#outboundlist').removeClass("cla-alert");
            }

            if ( !$('#medialist').val() ) {
                $('#medialist').addClass("cla-alert");
                isCopyrightPageOk = false;
            } else {
                mediaLicenses = mediaChoices.join(", ");
                console.log("mediaLicenses: " +
                            mediaLicenses);

                $('#medialist').removeClass("cla-alert");
            }

    testReviewPage();

    return isCopyrightPageOk;
}

function testPatentPage ()
{
            isPatentPageOk = true;

            testReviewPage();

            return isPatentPageOk;
}

function testReviewPage ()
{
            isReviewPageOk = true;

            console.log("At testReviewPage");

            if ( $("#contributor-option-entity").prop("checked") )
            {
                $("#review-agreement-type").text(
                    ucFirst( $("#contributor-option-entity").val() ) )  ; 
                $("#modal-agreement-type").html( 
                    ucFirst( $("#contributor-option-entity").val() ) );
                $("#tmp-contributor-type").html( 
                    ucFirst( $("#contributor-option-entity").val() ) );

                $("#definition-option-1").show();
                $("#definition-option-1").removeClass("nuke");
                $("#definition-option-2").hide();
                $("#definition-option-2").addClass("nuke");
            } else {
                $("#review-agreement-type").text(
                    ucFirst( $("#contributor-option-individual").val()))  ; 

                $("#modal-agreement-type").html( 
                    ucFirst( $("#contributor-option-individual").val() ) );

                $("#tmp-contributor-type").html( 
                    ucFirst( $("#contributor-option-individual").val() ) );

                $("#definition-option-1").hide();
                $("#definition-option-1").addClass("nuke");
                $("#definition-option-2").show();
                $("#definition-option-1").removeClass("nuke");
            }

            $("#review-project-family-name").html(
                $("#project-family-name").val() );

            $("#review-project-name").html(
                $("#project-name").val() );

            $("#tmp-project-name").html(
                $("#project-name").val() );

            $("#review-project-website").html(
                $("#project-website").val() );

            $("#review-project-email").html(
                $("#project-email").val() );

            $("#review-contributor-process-url").html(
                $("#contributor-process-url").val() );

            $("#tmp-submission-instructions").html(
                $("#contributor-process-url").val() );

            $("#review-project-jurisdiction").html(
                $("#project-jurisdiction").val() );

            $("#review-agreement-exclusivity").html(
                ucFirst( $("#agreement-exclusivity").val() ) );

            $("#tmp-contributor-exclusivity").html(
                ucFirst( $("#agreement-exclusivity").val() ) );

            if ( $("#agreement-exclusivity").val() == 'exclusive' )
            {
                $("#license-option-1").show();
                $("#license-option-1").removeClass("nuke");
                $("#license-option-2").hide();
                $("#license-option-2").addClass("nuke");
            } else {
                $("#license-option-1").hide();
                $("#license-option-1").addClass("nuke");
                $("#license-option-2").show();
                $("#license-option-2").removeClass("nuke");
            }
            

            $("#review-outbound-licenses").html(
                outboundCopyrightLicenses );

            $("#tmp-licenses").html(
                outboundCopyrightLicenses );

            if ( $("#outbound-option-same").prop("checked") )
            {
                $("#review-outbound-license-options").html(
                    $("#outbound-option-same").val() );

                $("#outbound-option-1").show();
                $("#outbound-option-1").removeClass("nuke");
                $("#outbound-option-2").hide();
                $("#outbound-option-2").addClass("nuke");
                $("#outbound-option-3").hide();
                $("#outbound-option-3").addClass("nuke");
            }

            if ( $("#outbound-option-same-licenses").prop("checked") )
            {
                $("#review-outbound-license-options").html(
                    $("#outbound-option-same-licenses").val() );

                $("#outbound-option-1").hide();
                $("#outbound-option-1").addClass("nuke");
                $("#outbound-option-2").show();
                $("#outbound-option-2").removeClass("nuke");
                $("#outbound-option-3").hide();
                $("#outbound-option-3").addClass("nuke");
            }

            if ( $("#outbound-option-fsf").prop("checked") )
            {
                $("#review-outbound-license-options").html(
                    $("#outbound-option-fsf").val() );

                $("#outbound-option-1").hide();
                $("#outbound-option-1").addClass("nuke");
                $("#outbound-option-2").hide();
                $("#outbound-option-2").addClass("nuke");
                $("#outbound-option-3").show();
                $("#outbound-option-3").removeClass("nuke");
            }

            $("#review-outbound-license-other").html(
                $("#outboundlist-custom").val() );

            $("#review-media-licenses").html(
                mediaLicenses );

            if ( mediaLicenses == "" )
                $("#tmp-media-licenses").html(
                    "NONE");
            else
                $("#tmp-media-licenses").html(
                    mediaLicenses );

            $("#review-patent-type").html(
                $("#patent-type").val() );

            if ( $("#patent-type").val() == 'traditional' )
            {
                $("#patent-option-1").show();
                $("#patent-option-1").removeClass("nuke");
                $("#patent-option-2").hide();
                $("#patent-option-2").addClass("nuke");
            } else {
                $("#patent-option-1").hide();
                $("#patent-option-1").addClass("nuke");
                $("#patent-option-2").show();
                $("#patent-option-2").removeClass("nuke");

                $("#tmp-patent-more-url").html(
                    $("#patent-more-url").val() );

            }

            $("#review-patent-more-url").html(
                $("#patent-more-url").val() );

            testApplyPage();

            return isReviewPageOk;
}

function testApplyPage ()
{
            console.log("at testApplyPage");

            isApplyPageOk = true;

            
            if ( $("#contributor-option-entity").prop("checked") )
            {
                $("#apply-individual").hide();
                $("#apply-entity").show();
            }
            else
            {
                $("#apply-individual").show();
                $("#apply-entity").hide();
            }
       
            $("#embed-offscreen").html( $( "#review-text" ).html() );
            $("#embed-offscreen .nuke").remove();
            /*
            $("#embed-offscreen .nuke").each(function() {
                console.log("this remove: " + $(this).html());
                $(this).remove();
            }); */

            $("#embed-agreement").html( $("#embed-offscreen").html() );

            return isApplyPageOk;
}


$(document).ready(function() {

    if ( doDebug )
        setFakeData();

    $("#outboundlist-custom").hide();
    $("#patent-option-2-options").hide();
    //$("#wizard").steps();


    // $('#myWizard').wizard()
    //
    // var Showdown = require('showdown');
    var converter = new Showdown.converter();
    $( "#review-text" ).load( "agreement-template.html", function() {
          // $( "#review" ).html( converter.makeHtml( $( "#review" ).html() ));
        // replace variables here
        //
        // $("#embed-agreement").html( $( "#review-text" ).html() );
    });


    $( "#project-family-name" ).change(function() {
        return testGeneralPage();
    });

    $( "#project-name" ).change(function() {
        return testGeneralPage();
    });

    $( "#project-website" ).change(function() {
        return testGeneralPage();
    });

    $( "#project-email" ).change(function() {
        return testGeneralPage();
    });

    $( "#contributor-process-url" ).change(function() {
        return testGeneralPage();
    });

    $( "#project-jurisdiction" ).change(function() {
        return testGeneralPage();
    });


    $( "#outboundlist" ).change(function() {
        return testCopyrightPage();
    });

    $( "#medialist" ).change(function() {
        return testCopyrightPage();
    });

    $( "#outbound-option-same-licenses" ).change(function() {
        if ( $("#outbound-option-same-licenses").prop( "checked" ) )
            $("#outboundlist-custom").show();
        // return testGeneralPage();
    });

    $( "#outbound-option-same" ).change(function() {
        $("#outboundlist-custom").hide();
        // return testGeneralPage();
    });

    $( "#outbound-option-fsf" ).change(function() {
        $("#outboundlist-custom").hide();
        // return testGeneralPage();
    });


    $( "#patent-type" ).change(function() {
        if ( $( "#patent-type" ).val() == 'patent-pledge' )
            $("#patent-option-2-options").show();
        else
            $("#patent-option-2-options").hide();

    });

	$('#rootwizard').bootstrapWizard({onNext: function(tab, navigation, index)
    {
        console.log("tab: " + tab);
        console.log("navigation: " + navigation);
        console.log("index: " + index);

        switch( index )
        {
            case generalPageIndex + 1:
                console.log("At SWITCH general: " + (generalPageIndex+1) );
                return testGeneralPage();
                break;
            case copyrightPageIndex + 1:
                console.log("At SWITCH copyright: " + (copyrightPageIndex+1) );
                return testCopyrightPage();
                break;
            case patentPageIndex + 1:
                console.log("At SWITCH patent: " + (patentPageIndex+1) );
                return testPatentPage();
                break;
            case reviewPageIndex + 1:
                console.log("At SWITCH review: " + (reviewPageIndex+1) );
                return testReviewPage();
                break;
            case applyPageIndex + 1:
                console.log("At SWITCH apply: " + (applyPageIndex+1) );
                return testApplyPage();
                break;
        }


				
				
    }, onTabShow: function(tab, navigation, index) {
        var $total = navigation.find('li').length;
        var $current = index+1;
        var $percent = ($current/$total) * 100;
        $('#rootwizard').find('.bar').css({width:$percent+'%'});
	},
    onTabClick: function(tab, navigation, index) {
        console.log("tab: " + tab);
        // oinspect(tab);

        console.log("navigation: " + navigation);
        // oinspect(navigation);

        console.log("index: " + index);
        // alert('on tab click disabled');
        //

        /*
        if ( index == ( generalPageIndex + 1 ) && isGeneralPageOk ) 
            return true;

        if ( index == ( copyrightPageIndex + 1 ) && isCopyrightPageOk ) 
            return true;
        
        if ( index == ( patentPageIndex + 1 ) && isPatentPageOk ) 
            return true;

        if ( index == ( reviewPageIndex + 1 ) && isReviewPageOk ) 
            return true;

        if ( index == ( applyPageIndex + 1 ) && isApplyPageOk ) 
            return true;
        */
        return false;
    } }
    
    );	
    
    window.prettyPrint && prettyPrint()

    // console.log("myTest: " + myTest);



});
