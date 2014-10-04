/** cla chooser main javascript by Fabricatorz **/

/**
 * @TODO Need to make compact the config setting code and the review/apply
 * because lots of duplicated code.
 * @TODO the final configs are currently not set from user interface changes
 * @TODO test the default configs, make sure set here in the code
 * @TODO possibly reset some variable names if not consistent
 * @TODO reduce some code complexity
 *
 * @TODO need to finish the query2form and query2email to interface changes
 * @TODO replace the github and google options with this custom option
 * @TODO make simple flatfile backed query2updatelist (list of updates
 */


var doDebug             = false;
var debugNeedle          = 1337;

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


var naField             = 'Not Applicable';
var emptyField          = '____________________';

/** could even set defaults here
 * 
 * Query String Possible Parameters:
 *
 * beneficiary-name=STRING
 * project-name=STRING
 * project-website=URL
 * project-email=EMAIL
 * contributor-process-url=URL
 * project-jurisdiction=STRING
 *
 * contributor-option-entity=entity|individual
 * agreement-exclusivity=exclusive|nonexclusive
 * outbound-option=same|same-licenses|fsf|no-commitment
 * outboundlist=Artistic-1.0,Apache-2.0,LIST
 * outboundlist-custom=STRING
 * medialist=None|GFDL-1.1|CC-BY-1.0,GFDL-1.3,LIST
 * patent-option=Traditional|Patent-Pledge
 *
 * pos=general|copyright|patents|review|apply
 */
var configs = {
    'beneficiary-name':           '',
    'project-name':               '',
    'project-website':            '',
    'project-email':              '',
    'contributor-process-url':    '',
    'project-jurisdiction':       '',
    'contributor-option-entity':  '',
    'agreement-exclusivity':      '',
    'outbound-option':            '',
    'outboundlist':               '',
    'outboundlist-custom':        '',
    'medialist':                  '',
    'patent-option':              '',
    'post':                       ''
};


function printConfigs ()
{
    // make query string url
    $.each( configs, function(p,v){
        console.log("configs(p,v): " + p + ": \t\t\t\t\t\t\t " + v);
    });
}

// gives us $.QueryString["parameter-name"] function
(function ($) {
    $.QueryString = (function (a) {
    if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);

/**
 * Cleanup of the query string data and setting it.
 * @usage: http://cla.localhost/?beneficiary-name=Fabricatorz&project-name=Archive%20Software&project-website=http://archive.fabricatorz.com&project-email=jon@fabricatorz.com&contributor-process-url=http://archive.fabricatorz.com/signing&project-jurisdiction=United%20States,%20Hong%20Kong,%20and%20China%20Mainland
 *
 */
function queryStringToConfigs ()
{
    $.each( $.QueryString, function(p,v) {
        configs[p] = v;
        // console.log("configs[p]=v: " + configs[p] + ": " + p + ": " + v);
    });

}

/**
 * @todo can combine this with review code and save code, but will need
 * to abstract the following more thanlikely into functions.
 * Then, that will allow creating a querystring easier
 */
function updateConfigs ()
{

    /* general */

    if ( configs["contributor-option-entity"] == 'individual' )
    {
        $("#contributor-option-individual").prop('checked', true );
    } else {
        $("#contributor-option-entity").prop('checked', true );
    }

    if ( doDebug)
        console.log("contributor-option-entity: " + 
            configs["contributor-option-entity"]);

    if ( doDebug)
        console.log("#contributor-option-entity: " + 
            $('#contributor-option-entity').val() );


    if ( configs["beneficiary-name"] )
        $('#beneficiary-name').val( configs["beneficiary-name"] );
    if ( doDebug)
        console.log("beneficiary-name: " + configs["beneficiary-name"]);

    if ( configs["project-name"] )
        $('#project-name').val( configs["project-name"] );
    if ( doDebug)
        console.log("project-name: " + configs["project-name"]);

    if ( configs["project-website"] )
        $('#project-website').val( configs["project-website"] );
    if ( doDebug)
        console.log("project-website: " + configs["project-website"]);

    if ( configs["project-email"] )
        $('#project-email').val( configs["project-email"] );
    if ( doDebug)
        console.log("project-email: " + configs["project-email"]);

    if ( configs["contributor-process-url"] )
        $('#contributor-process-url').val( 
            configs["contributor-process-url"] );
    if ( doDebug)
        console.log("contributor-process-url: " + 
            configs["contributor-process-url"]);

    if ( configs["project-jurisdiction"] )
        $('#project-jurisdiction').val( configs["project-jurisdiction"] );
    if ( doDebug)
        console.log("project-jurisdiction: " + 
            configs["project-jurisdiction"]);


    /* copyright */
    if ( configs["agreement-exclusivity"] == 'exclusive' )
        $("#agreement-exclusivity").val( 'exclusive' );
    else
        $("#agreement-exclusivity").val( 'nonexclusive' );
    if ( doDebug)
        console.log("agreement-exclusivity: " + 
            configs["agreement-exclusivity"]);


    if ( configs["outbound-option"] == 'same' )
        $("#contributor-option-individual").prop('checked', true );

    // hide by default
    $("#outboundlist").hide();
    $("#outboundlist-custom").hide();

    switch ( configs["outbound-option"] ) {
        case 'same-licenses':
            $("#outbound-option-same-licenses").prop('checked', true );
            $("#outbound-option-same-licenses" ).change();
            // @todo delete later if no need
            // setOutboundOptionSameLicenses();
            $("#outboundlist").show();
            $("#outboundlist-custom").show();
            break;
        case 'fsf':
            $("#outbound-option-fsf").prop('checked', true );
            $("#outbound-option-fsf" ).trigger( 'change' );
            // @todo delete later if no need
            // setOutboundOptionFsf();
            break;
        case 'no-commitment':
            $("#outbound-option-no-commitment").prop('checked', true );
            $("#outbound-option-no-commitment" ).trigger( 'change' );
            // @todo delete later if no need
            // setOutboundOptionNoCommitment();
            break;
        case 'same':
        default:
            $("#outbound-option-same").prop('checked', true );
            $("#outbound-option-same" ).trigger( 'change' );
            // @todo delete later if no need
            // setOutboundOptionSame();
    }

    if ( doDebug)
        console.log("outbound-option: " + configs["outbound-option"]);


    if ( configs["outboundlist"] )
    {
        $.each( configs["outboundlist"].split(","), function(i,e) {
            $("#outboundlist option[value='" + e + "']").prop("selected", true);
        });
    }
    if ( doDebug)
        console.log("outboundlist: " + 
            configs["outboundlist"]);

    if ( configs["outboundlist-custom"] )
        $("#outboundlist-custom" ).val( configs["outboundlist-custom"] );
    if ( doDebug)
        console.log("outboundlist-custom: " + 
            configs["outboundlist-custom"]);

    $("#medialist option[value='None']").prop("selected", false);
    if ( configs["medialist"] )
    {
        $.each( configs["medialist"].split(","), function(i,e){
            $("#medialist option[value='" + e + "']").prop("selected", true);
        });
    } 
    if ( doDebug)
        console.log("medialist: " + configs["medialist"]);

    /* patent page */
    if ( configs["patent-option"] == 'Traditional' )
        $("#patent-type").val( 'Traditional' );
    else
        $("#patent-type").val( 'Patent-Pledge' );
    if ( doDebug)
        console.log("patent-option: " + configs["patent-option"] );


    printConfigs();

}

/**
 * A better test now:
 * http://cla.localhost/?beneficiary-name=Fabricatorz&project-name=Archive+Software&project-website=http%3A%2F%2Farchive.fabricatorz.com&project-email=jon%40fabricatorz.com&contributor-process-url=http%3A%2F%2Farchive.fabricatorz.com%2Fsigning&project-jurisdiction=United+States%2C+Hong+Kong%2C+and+China+Mainland.&contributor-option-entity=&agreement-exclusivity=&outbound-option=&outboundlist=&outboundlist-custom=&medialist=&patent-option=&post=
 */
function setFakeData ()
{
    configs['beneficiary-name']         = 'Fabricatorz';
    configs['project-name']             = 'Archive Software';
    configs['project-website']           = 'http://archive.fabricatorz.com';
    configs['project-email']             = 'jon@fabricatorz.com';
    configs['contributor-process-url']   = 
        'http://archive.fabricatorz.com/signing';
    configs['project-jurisdiction']      = 
        'United States, Hong Kong, and China Mainland.';
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

function setOutboundOptionSame () 
{

                /* remove the outbound-option in review */
                $("#review-outbound-licenses").html( naField );

                $("#review-outbound-license-options").html(
                    $("#outbound-option-same").val() );

                $("#outbound-section-all").show();
                $("#outbound-section-all").removeClass("nuke");

                /* put back order of sections after section 4 */
                $("#tmp-digit-disclaimer").html( '5' );
                $("#tmp-digit-waiver").html( '6' );
                $("#tmp-digit-approx-waiver").html( '7' );
                $("#tmp-digit-waiver-2").html( '6' );
                $("#tmp-digit-approx-waiver-2").html( '7' );
                $("#tmp-digit-term").html( '8' );
                $("#tmp-digit-term-1").html( '8.1' );
                $("#tmp-digit-term-2").html( '8.2' );
                $("#tmp-digit-term-3").html( '8.3' );
                $("#tmp-digit-term-special").html( '5, 6, 7, 8 and 9' );
                $("#tmp-digit-misc").html( '9' );
                $("#tmp-digit-misc-1").html( '9.1' );
                $("#tmp-digit-misc-2").html( '9.2' );
                $("#tmp-digit-misc-3").html( '9.3' );
                $("#tmp-digit-misc-4").html( '9.4' );

                $("#tmp-term-special").show();
                $("#tmp-term-special").removeClass("nuke");

                $("#tmp-licenses-2").hide();
                $("#tmp-licenses-2").addClass("nuke");


                $("#outbound-option-1").show();
                $("#outbound-option-1").removeClass("nuke");
                $("#outbound-option-2").hide();
                $("#outbound-option-2").addClass("nuke");
                $("#outbound-option-3").hide();
                $("#outbound-option-3").addClass("nuke");
}

function setOutboundOptionSameLicenses ()
{
                $("#review-outbound-license-options").html(
                    $("#outbound-option-same-licenses").val() );

                $("#outbound-section-all").show();
                $("#outbound-section-all").removeClass("nuke");

                /* put back order of sections after section 4 */
                $("#tmp-digit-disclaimer").html( '5' );
                $("#tmp-digit-waiver").html( '6' );
                $("#tmp-digit-approx-waiver").html( '7' );
                $("#tmp-digit-waiver-2").html( '6' );
                $("#tmp-digit-approx-waiver-2").html( '7' );
                $("#tmp-digit-term").html( '8' );
                $("#tmp-digit-term-1").html( '8.1' );
                $("#tmp-digit-term-2").html( '8.2' );
                $("#tmp-digit-term-3").html( '8.3' );
                $("#tmp-digit-term-special").html( '5, 6, 7, 8 and 9' );
                $("#tmp-digit-misc").html( '9' );
                $("#tmp-digit-misc-1").html( '9.1' );
                $("#tmp-digit-misc-2").html( '9.2' );
                $("#tmp-digit-misc-3").html( '9.3' );
                $("#tmp-digit-misc-4").html( '9.4' );

                $("#tmp-term-special").show();
                $("#tmp-term-special").removeClass("nuke");

                $("#tmp-licenses-2").show();
                $("#tmp-licenses-2").removeClass("nuke");


                $("#outbound-option-1").hide();
                $("#outbound-option-1").addClass("nuke");
                $("#outbound-option-2").show();
                $("#outbound-option-2").removeClass("nuke");
                $("#outbound-option-3").hide();
                $("#outbound-option-3").addClass("nuke");
}

function setOutboundOptionFsf ()
{
                /* remove the outbound-option in review */
                $("#review-outbound-licenses").html( naField );

                $("#review-outbound-license-options").html(
                    $("#outbound-option-fsf").val() );

                $("#outbound-section-all").show();
                $("#outbound-section-all").removeClass("nuke");

                /* put back order of sections after section 4 */
                $("#tmp-digit-disclaimer").html( '5' );
                $("#tmp-digit-waiver").html( '6' );
                $("#tmp-digit-approx-waiver").html( '7' );
                $("#tmp-digit-waiver-2").html( '6' );
                $("#tmp-digit-approx-waiver-2").html( '7' );
                $("#tmp-digit-term").html( '8' );
                $("#tmp-digit-term-1").html( '8.1' );
                $("#tmp-digit-term-2").html( '8.2' );
                $("#tmp-digit-term-3").html( '8.3' );
                $("#tmp-digit-term-special").html( '5, 6, 7, 8 and 9' );
                $("#tmp-digit-misc").html( '9' );
                $("#tmp-digit-misc-1").html( '9.1' );
                $("#tmp-digit-misc-2").html( '9.2' );
                $("#tmp-digit-misc-3").html( '9.3' );
                $("#tmp-digit-misc-4").html( '9.4' );


                $("#tmp-term-special").show();
                $("#tmp-term-special").removeClass("nuke");

                $("#tmp-licenses-2").hide();
                $("#tmp-licenses-2").addClass("nuke");


                $("#outbound-option-1").hide();
                $("#outbound-option-1").addClass("nuke");
                $("#outbound-option-2").hide();
                $("#outbound-option-2").addClass("nuke");
                $("#outbound-option-3").show();
                $("#outbound-option-3").removeClass("nuke");
}

function setOutboundOptionNoCommitment ()
{
                /* remove the outbound-option in review */
                $("#review-outbound-licenses").html( naField );

                $("#review-outbound-license-options").html(
                    $("#outbound-option-no-commitment").val() );

                $("#outbound-option-1").hide();
                $("#outbound-option-1").addClass("nuke");
                $("#outbound-option-2").hide();
                $("#outbound-option-2").addClass("nuke");
                $("#outbound-option-3").hide();
                $("#outbound-option-3").addClass("nuke");
                
                /* remove entire section 4 */
                $("#outbound-section-all").hide();
                $("#outbound-section-all").addClass("nuke");

                /* reorder sections now that section 4 gone */
                $("#tmp-digit-disclaimer").html( '4' );
                $("#tmp-digit-waiver").html( '5' );
                $("#tmp-digit-approx-waiver").html( '6' );
                $("#tmp-digit-waiver-2").html( '5' );
                $("#tmp-digit-approx-waiver-2").html( '6' );
                $("#tmp-digit-term").html( '7' );
                $("#tmp-digit-term-1").html( '7.1' );
                /** undisplayed  $("#tmp-digit-term-2").html( '7.2' ); */
                $("#tmp-digit-term-3").html( '7.2' );
                $("#tmp-digit-term-special").html( '4, 5, 6, 7 and 8' );
                $("#tmp-digit-misc").html( '8' );
                $("#tmp-digit-misc-1").html( '8.1' );
                $("#tmp-digit-misc-2").html( '8.2' );
                $("#tmp-digit-misc-3").html( '8.3' );
                $("#tmp-digit-misc-4").html( '8.4' );


                $("#tmp-term-special").hide();
                $("#tmp-term-special").addClass("nuke");
}


function updatePosition ()
{
    switch ( $.QueryString["pos"] ) {
        case 'general':
            $('#rootwizard').bootstrapWizard('show','general');
            break;
        case 'copyright':
            $('#rootwizard').bootstrapWizard('show',1);
            break;
        case 'patents':
            $('#rootwizard').bootstrapWizard('show',2);
            break;
        case 'review':
            $('#rootwizard').bootstrapWizard('show',3);
            break;
        case 'apply':
            $('#rootwizard').bootstrapWizard('last');
            break;
    } 
    testAllPages();
    if ( doDebug)
        console.log("pos: " + $.QueryString["pos"] );
}



function testGeneralPage ()
{
            isGeneralPageOk = true;

            if ( !$('#beneficiary-name').val() ) {
                $('#beneficiary-name').addClass("cla-alert");
                isGeneralPageOk = false;
            } else {
                $('#beneficiary-name').removeClass("cla-alert");
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
                outboundCopyrightLicenses = "";
                // $('#outboundlist').addClass("cla-alert");
                // isCopyrightPageOk = false;
            } else {
                outboundCopyrightLicenses = outboundChoices.join(", ");
                if ( doDebug)
                    console.log("outboundCopyrightLicenses: " +
                            outboundCopyrightLicenses);

                // $('#outboundlist').removeClass("cla-alert");
            }

            if ( $('#outboundlist-custom').val() ) {
                
                if ( !$('#outboundlist').val() ) {
                    outboundCopyrightLicenses = 
                        $('#outboundlist-custom').val();
                } else {
                    outboundCopyrightLicenses += 
                        ", " + $('#outboundlist-custom').val();
                }
                if ( doDebug)
                    console.log("outboundCopyrightLicenses: " +
                        outboundCopyrightLicenses);
            }


            /*
            if ( !$('#medialist').val() ) {
                $('#medialist').addClass("cla-alert");
                isCopyrightPageOk = false;
            } else {
                */
                mediaLicenses = mediaChoices.join(", ");
                if ( doDebug)
                    console.log("mediaLicenses: " +
                            mediaLicenses);

                // $('#medialist').removeClass("cla-alert");
            // }

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

            if ( doDebug)
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

            if ( !$("#beneficiary-name").val() )
                $("#review-beneficiary-name").html( emptyField );
            else
                $("#review-beneficiary-name").html(
                    $("#beneficiary-name").val() );

            if ( !$("#project-name").val() ) {
                $("#review-project-name").html( emptyField );
                $("#tmp-project-name").html( emptyField );
                $("#tmp-project-name-2").html( emptyField );
            } else {
                $("#review-project-name").html(
                    $("#project-name").val() );
                $("#tmp-project-name").html(
                    $("#project-name").val() );
                $("#tmp-project-name-2").html(
                    $("#project-name").val() );
            }

            if ( !$("#project-website").val() ) {
                $("#review-project-website").html( emptyField );
            } else {
                $("#review-project-website").html(
                    $("#project-website").val() );
            }

            if ( !$("#project-email").val() ) {
                $("#review-project-email").html( emptyField );
            } else {
                $("#review-project-email").html(
                    $("#project-email").val() );
                $("#tmp-project-email-1").html(
                    $("#project-email").val() );
                $("#tmp-project-email-2").html(
                    $("#project-email").val() );
            }

            if ( !$("#contributor-process-url").val() ) {
                $("#review-contributor-process-url").html( emptyField );
                $("#tmp-submission-instructions").html( emptyField );
            } else {
                $("#review-contributor-process-url").html(
                    $("#contributor-process-url").val() );
                $("#tmp-submission-instructions").html(
                    $("#contributor-process-url").val() );
            }

            if ( !$("#project-jurisdiction").val() ) {
                $("#review-project-jurisdiction").html( emptyField );
                $("#tmp-project-jurisdiction").html( emptyField );
            } else{
                $("#review-project-jurisdiction").html(
                    $("#project-jurisdiction").val() );
                $("#tmp-project-jurisdiction").html(
                    $("#project-jurisdiction").val() );

            }

            if ( !$("#agreement-exclusivity").val() ) {
                $("#review-agreement-exclusivity").html( emptyField );
                $("#tmp-contributor-exclusivity").html( emptyField );
            } else{
                $("#review-agreement-exclusivity").html(
                    ucFirst( $("#agreement-exclusivity").val() ) );

                $("#tmp-contributor-exclusivity").html(
                    ucFirst( $("#agreement-exclusivity").val() ) );
            }


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


            if ( !outboundCopyrightLicenses ) {
                $("#review-outbound-licenses").html( emptyField );
                $("#tmp-licenses").html( emptyField );
                $("#tmp-licenses-2").html( emptyField );

            } else {
                $("#review-outbound-licenses").html(
                    outboundCopyrightLicenses );
                $("#tmp-licenses").html(
                    outboundCopyrightLicenses );
                $("#tmp-licenses-2").html(
                    outboundCopyrightLicenses );
            }

            if ( $("#outbound-option-same").prop("checked") )
                setOutboundOptionSame();

            if ( $("#outbound-option-same-licenses").prop("checked") )
                setOutboundOptionSameLicenses();

            if ( $("#outbound-option-fsf").prop("checked") )
                setOutboundOptionFsf();


            $("#review-outbound-license-other").html(
                $("#outboundlist-custom").val() );

            $("#review-media-licenses").html(
                mediaLicenses );

            if ( mediaLicenses == "" || mediaLicenses == "None" ) {
                $("#outbound-media-license").hide();
                $("#outbound-media-license").addClass("nuke");
            } else {
                $("#tmp-media-licenses").html(
                    mediaLicenses );
                $("#outbound-media-license").show();
                $("#outbound-media-license").removeClass("nuke");
            }

            // outbound-option-no-commitment
            if ( $("#outbound-option-no-commitment").prop("checked") )
                setOutboundOptionNoCommitment();




            $("#review-patent-type").html(
                $("#patent-type").val() );

            $("#tmp-patent-option").html(
                $("#patent-type").val() );

            if ( $("#patent-type").val() == 'Traditional' )
            {
                $("#patent-option-1").show();
                $("#patent-option-1").removeClass("nuke");
                $("#patent-option-2").hide();
                $("#patent-option-2").addClass("nuke");

                $("#outbound-special").show();
                $("#outbound-special").removeClass("nuke");
            } else {
                $("#patent-option-1").hide();
                $("#patent-option-1").addClass("nuke");
                $("#patent-option-2").show();
                $("#patent-option-2").removeClass("nuke");

                $("#outbound-special").hide();
                $("#outbound-special").addClass("nuke");

                // $("#tmp-patent-more-url").html(
                //    $("#patent-more-url").val() );

            }

            // $("#review-patent-more-url").html(
            //    $("#patent-more-url").val() );

            testApplyPage();

            return isReviewPageOk;
}

function testApplyPage ()
{
    if ( doDebug)
        console.log("at testApplyPage");

    isApplyPageOk = true;

    /* NEED TO REVIEW AFTER DECISIONS */
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

    // creates the querystring to recreate current wizard state
    finalQueryString = $.param(configs);
    console.log("finalQueryString: " + finalQueryString);
    // set final linkto be used in the interface
    $(".final-link").attr("href", "?" + finalQueryString);


    $("#embed-offscreen").html( $( "#review-text" ).html() );
    $(".htmlstore").val( $( "#review-text-style" ).html() + 
                         $( "#review-text" ).html() );
    $("#embed-offscreen .nuke").remove();

    // if ( doDebug)
    /* console.log("EMBEDDING: " + $("#embed-offscreen").html() ); */

    $("#embed-agreement").html( $("#embed-offscreen").html() );

    return isApplyPageOk;
}

function testAllPages()
{
    testGeneralPage();
    testCopyrightPage();
    testPatentPage();
    testReviewPage();
    testApplyPage();
}


$(document).ready(function() {

    
    queryStringToConfigs();
    //  if ( doDebug )
    //    setFakeData();
    updateConfigs();

    $("#patent-option-2-options").hide();


    $("#html2pdf-individual").click(function() {
        $('#html2pdf-form-individual').submit();
    });

    $("#html2pdf-entity").click(function() {
        $('#html2pdf-form-entity').submit();
    });


    var converter = new Showdown.converter();
    $( "#review-text" ).load( "agreement-template.html", function() { });

    $( "#review-text-style" ).load( "agreement-style.html", function() { });


    $( "#beneficiary-name" ).change(function() {
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

    $( "#outboundlist-custom" ).change(function() {
        return testCopyrightPage();
    });

    $( "#medialist" ).change(function() {
        return testCopyrightPage();
    });


    $( "#outbound-option-same" ).change(function() {
        $("#outboundlist").hide();
        $("#outboundlist-custom").hide();
        // return testGeneralPage();
    });

    $( "#outbound-option-same-licenses" ).change(function() {
        if ( $("#outbound-option-same-licenses").prop( "checked" ) ) {
            $("#outboundlist").show();
            $("#outboundlist-custom").show();
        }
        // return testGeneralPage();
    });

    $( "#outbound-option-fsf" ).change(function() {
        $("#outboundlist").hide();
        $("#outboundlist-custom").hide();
        // return testGeneralPage();
    });

    $( "#outbound-option-no-commitment" ).change(function() {
        $("#outboundlist").hide();
        $("#outboundlist-custom").hide();
        // return testGeneralPage();
    });


    $( "#patent-type" ).change(function() {
        if ( $( "#patent-type" ).val() == 'Patent-Pledge' )
            $("#patent-option-2-options").show();
        else
            $("#patent-option-2-options").hide();

    });

	$('#rootwizard').bootstrapWizard({onNext: function(tab, navigation, index)
    {
        if ( doDebug)
        {
            console.log("tab: " + tab);
            console.log("navigation: " + navigation);
            console.log("index: " + index);
        }

        switch( index )
        {
            case generalPageIndex + 1:
                if ( doDebug)
                    console.log("At SWITCH general: " + (generalPageIndex+1) );
                testGeneralPage();
                return true;
                break;
            case copyrightPageIndex + 1:
                if ( doDebug)
                    console.log("At SWITCH copyright: " + 
                        (copyrightPageIndex+1) );
                testCopyrightPage();
                return true;
                break;
            case patentPageIndex + 1:
                if ( doDebug)
                    console.log("At SWITCH patent: " + (patentPageIndex+1) );
                testPatentPage();
                return true;
                break;
            case reviewPageIndex + 1:
                if ( doDebug)
                    console.log("At SWITCH review: " + (reviewPageIndex+1) );
                testReviewPage();
                return true;
                break;
            case applyPageIndex + 1:
                if ( doDebug)
                    console.log("At SWITCH apply: " + (applyPageIndex+1) );
                testApplyPage();
                return true;
                break;
        }

    }, onTabShow: function(tab, navigation, index) {
        var $total = navigation.find('li').length;
        var $current = index+1;
        var $percent = ($current/$total) * 100;
        $('#rootwizard').find('.bar').css({width:$percent+'%'});
	},
    onTabClick: function(tab, navigation, index) {
        if ( doDebug)
            console.log("tab: " + tab);
        // oinspect(tab);

        if ( doDebug)
            console.log("navigation: " + navigation);
        // oinspect(navigation);

        if ( doDebug)
            console.log("index: " + index);
        // alert('on tab click disabled');
        //

        testAllPages();

        return true;
    } }

    );
    updatePosition();

    window.prettyPrint && prettyPrint()

});
