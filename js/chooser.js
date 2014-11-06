/** cla chooser main javascript by Fabricatorz **/

/**
 * @TODO Need to make compact the config setting code and the review/apply
 * because lots of duplicated code.
 * @TODO fix that visual jump on patents tab
 * @TODO add cdn jquery and bootstrap and then have the local fallbacks
 * @TODO add other scaffolding for html5, standard sites, async
 * @TODO fix testGeneralPage() to be functionized so that each input tested
 * @TODO need to have some kind of timeout on the shorturl service, its blocking when service down
 *
 * @TODO finish making u2s work on catharina's server, with apache (server down right now)
 */


var doDebug             = false;
var debugNeedle         = 1337;

var services;

// @TODO really should make this configs and convert code below
$.ajax({
    timeout: 1000,
    async: false,
    url: 'js/config.json',
    dataType: "text",
    success: function(data) {
        services = $.parseJSON(data);
    }
});

var serviceUrl, urlShortener;

if ( ! services || typeof services.serviceUrl === 'undefined' )
    serviceUrl          = 'http://service.fabricatorz.com';
else
    serviceUrl          = services["serviceUrl"];

if ( ! services || typeof services.urlShortener === 'undefined' )
    urlShortener        = 'http://service.fabricatorz.com/u2s';
else
    urlShortener        = services["urlShortener"];


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
var noneField           = 'None.'

var outBeforeField      = 'the following';
var outAfterField       = 'license(s)';
var fsfField            = 'any licenses on the Free Software ' + 
                          'Foundation\'s list of "Recommended copyleft ' + 
                          'licenses" or approved by the Open Source ' + 
                          'Initiative.';

var shortUrl            = '';
var query4form          = '';
var query4form_short    = '';

var dictionary = {
    'traditional':              'Traditional Patent License',
    'Traditional':              'Traditional Patent License',
    'patent-pledge':            'Patent Pledge',
    'Patent-Pledge':            'Patent Pledge',
    'non-exclusive':            'Non-Exclusive'
};

/** could even set defaults here
 * 
 * Query String Possible Parameters:
 *
 * beneficiary-name=STRING
 * project-name=STRING
 * project-website=URL
 * project-email=EMAIL
 * process-url=URL
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
 * your-name=STRING
 * your-date=STRING
 * your-title=STRING
 * your-address=STRING
 *
 * pos=general|copyright|patents|review|apply
 */
var configs = {
    'beneficiary-name':           '',
    'project-name':               '',
    'project-website':            '',
    'project-email':              '',
    'process-url':                '',
    'project-jurisdiction':       '',
    'agreement-exclusivity':      '',
    'outbound-option':            '',
    'outboundlist':               '',
    'outboundlist-custom':        '',
    'medialist':                  '',
    'patent-option':              '',
    'your-date':                  '',
    'your-name':                  '',
    'your-title':                 '',
    'your-address':               '',
    'your-patents':               '',
    'pos':                        'apply',
    'action':                     ''
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


function htmlEscape(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}


/**
 * Cleanup of the query string data and setting it.
 * @usage: http://cla.fabricatorz.com/?beneficiary-name=Fabricatorz&project-name=Archive%20Software&project-website=http://archive.fabricatorz.com&project-email=jon@fabricatorz.com&process-url=http://archive.fabricatorz.com/signing&project-jurisdiction=United%20States,%20Hong%20Kong,%20and%20China%20Mainland
 *
 */
function queryStringToConfigs ()
{
    $.each( $.QueryString, function(p,v) {
        configs[p] = v;
        if ( doDebug )
            console.log("configs[p]=v: " + configs[p] + ": " + p + ": " + v);
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

    if ( configs["project-jurisdiction"] )
        $('#project-jurisdiction').val( configs["project-jurisdiction"] );
    if ( doDebug)
        console.log("project-jurisdiction: " + 
            configs["project-jurisdiction"]);


    /* copyright */
    if ( configs["agreement-exclusivity"] == 'exclusive' )
        $("#agreement-exclusivity").val( 'exclusive' );
    else
        $("#agreement-exclusivity").val( 'non-exclusive' );
    if ( doDebug)
        console.log("agreement-exclusivity: " + 
            configs["agreement-exclusivity"]);


    if ( configs["outbound-option"] == 'same' )
        $("#contributor-option-individual").prop('checked', true );

    // hide by default
    $("#outboundlist").hide();
    $("#outboundlist-custom").hide();

    switch ( configs["outbound-option"] ) {
        // option-2
        case 'same-licenses':
            $("#outbound-option-same-licenses").prop('checked', true );
            $("#outbound-option-same-licenses" ).change();
            // @todo delete later if no need
            // setOutboundOptionSameLicenses();
            $("#outboundlist").show();
            $("#outboundlist-custom").show();
            break;
        // option-3
        case 'fsf':
            $("#outbound-option-fsf").prop('checked', true );
            $("#outbound-option-fsf" ).trigger( 'change' );
            // @todo delete later if no need
            // setOutboundOptionFsf();
            break;
        // option-4
        case 'no-commitment':
            $("#outbound-option-no-commitment").prop('checked', true );
            $("#outbound-option-no-commitment" ).trigger( 'change' );
            // @todo delete later if no need
            // setOutboundOptionNoCommitment();
            break;
        // option-1
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

    /* signer assignment */
    if ( configs["your-date"] )
    {
       var ourDate = new Date(configs["your-date"]*1000 );

       $("#i-tmp-signing-you-date").html( ourDate );  
       $("#e-tmp-signing-you-date").html( ourDate );  
    }
    if ( configs["your-name"] )
    {
       $("#i-tmp-signing-you-name").html( configs["your-name"] );  
       $("#e-tmp-signing-you-name").html( configs["your-name"] );  
    }
    if ( configs["your-title"] )
    {
       $("#i-tmp-signing-you-title").html( configs["your-title"] );  
       $("#e-tmp-signing-you-title").html( configs["your-title"] );  
    }
    if ( configs["your-address"] )
    {
       $("#i-tmp-signing-you-address").html( configs["your-address"] );  
       $("#e-tmp-signing-you-address").html( configs["your-address"] );  
    }
    if ( configs["your-patents"] )
    {
       $("#i-tmp-patent-more").html( nl2br( configs["your-patents"],true) );  
       $("#e-tmp-patent-more").html( nl2br( configs["your-patents"],true) );  
    }
    // let's assume one signed this, but didn't input any patents
    if ( configs["your-name"] && ! configs["your-patents"] )
    {
       $("#i-tmp-patent-more").html( noneField );  
       $("#e-tmp-patent-more").html( noneField );  
    }

    // e-tmp-submission-instructions
    if ( configs["process-url"] )
    {
       console.log( configs["process-url"] );
       $("#contributor-process-url").val( configs["process-url"] );
       $("#i-tmp-submission-instructions").html( configs["process-url"] );  
       $("#e-tmp-submission-instructions").html( configs["process-url"] );  
    }


    if ( doDebug)
        printConfigs();

}

function loadTemplates ()
{
    // var converter = new Showdown.converter();
    /*
    $( "#review-text" ).load( 
        "agreement-template-individual.html", function() { 
            console.log("f-sign-indy: " +  $("#review-text").html() );
        });
    $( "#review-text-entity" ).load( 
        "agreement-template-entity.html", function() { 
            console.log("f-sign-entity: " +  $("#review-text-entity").html() );
        });

    $( "#review-text-style" ).load( "agreement-style.html", function() { });
    */
    
    $.ajax('agreement-template-individual.html', {
        timeout: 1000,
        async: false,
        success: function(resp) {
            $('#review-text').html(resp);
            if ( doDebug )
                console.log("f-sign-indy: " +  $("#review-text").html() );
        }
    });
    $.ajax('agreement-template-entity.html', {
        timeout: 1000,
        async: false,
        success: function(resp) {
            $('#review-text-entity').html(resp);
            if ( doDebug )
                console.log("f-sign-entity: " +  $("#review-text-entity").html() );
        }
    });
    $.ajax('agreement-style.html', {
        timeout: 1000,
        async: false,
        success: function(resp) {
            $('#review-text-style').html(resp);
            if ( doDebug )
                console.log("f-review-text-style: " +  
                    $("#review-text-style").html() );
        }
    });

}

/**
 * A better test now:
 * http://cla.fabricatorz.com/?beneficiary-name=Fabricatorz&project-name=Archive+Software&project-website=http%3A%2F%2Farchive.fabricatorz.com&project-email=jon%40fabricatorz.com&process-url=http%3A%2F%2Farchive.fabricatorz.com%2Fsigning&project-jurisdiction=United+States%2C+Hong+Kong%2C+and+China+Mainland.&agreement-exclusivity=&outbound-option=&outboundlist=&outboundlist-custom=&medialist=&patent-option=&pos=
 */
function setFakeData ()
{
    configs['beneficiary-name']         = 'Fabricatorz';
    configs['project-name']             = 'Archive Software';
    configs['project-website']           = 'http://archive.fabricatorz.com';
    configs['project-email']             = 'jon@fabricatorz.com';
    configs['process-url']   = 
        'http://archive.fabricatorz.com/signing';
    configs['project-jurisdiction']      = 
        'United States, Hong Kong, and China Mainland.';
}

function nl2br (str, is_xhtml) 
{
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? 
    '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + 
        breakTag + '$2');
}


function getShortUrl(uri)
{
    var result = '';
    $.ajax({ 
        url: urlShortener + '/set/?l=' + uri,
        async: false,
        success: function(data) { result = data; }
    });
    return result;
}

function updateQuery4Form ()
{
    var projectemail = ( configs["project-email"] ) ? configs["project-email"] : "";
    // if need to debug, remove the '&@u2s' which converts to short url
    var signerFmt    = encodeURIComponent(shortUrl + 
        '?your-date=@_time&your-name=@fullname&your-title=@title&' + 
        'your-address=@email-address&your-patents=@Patent-IDs-and-Country_t&'+
        'process-url=@_processurl&' +
        'action=sign-@agreement-type&@u2s');

    query4form = serviceUrl + '/query2form/?' + 
        '_replyto=' + projectemail + '&' +
        '_subject=Contributor License Agreement E-Signing' + '&' +
        '_body=Fill out the following form, then sign your initials to complete the Contributor License Agreement.' + '&' +
        'agreement-type[]=individual&agreement-type[]=entity&' +
        'fullname=&' +
        'title=&' +
        'company=&' +
        'email-address=&' +
        'physical-address=&' +
        ( ( $( "#patent-type" ).val() == 'Patent-Pledge' ) ? 
            'Patent-IDs-and-Country_t=&_id=patent-pledge&' : '') + 
        'your-initials=&' +
        ( ( "" != shortUrl ) ? 'original-agreement=' + shortUrl + '&' : '' ) + 
        'signed-agreement_s=' + signerFmt + '&' +
        '_processurl=@processurl&' +
        '_action[0]=' + serviceUrl + '/query2email/&' +
        '_action[1]=' + serviceUrl + '/query2update/&' +
        '_next=View%20More%20Contributor%20License%20Agreement%20Signers.&' +
        '_success=Thank you for using contributoragreements.org. The agreement has been signed and sent via E-Mail and will not be stored.&' +
        '_submit=Sign Your Contributor License Agreement.';

        var encoded_query_form_uri = encodeURIComponent(query4form);
        query4form_short = getShortUrl(encoded_query_form_uri);

}

function ucFirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function ucWords(string) {
    return (string + '').
        replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, 
            function($1) {
                return $1.toUpperCase();
            });
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

function fixPatentParagraph( message )
{
    if ( typeof message == 'undefined' )
        message = outBeforeField + " " + 
                  $("#i-tmp-licenses-2").html() + " " + 
                  outAfterField;

    $("#i-tmp-licenses-2").html( message );
    $("#e-tmp-licenses-2").html( message );
}

function getEmbedCode ( ourQuery )
{
    /*
    return htmlEscape('<script type="text/javascript">' + "\n" +
    'var iframe = document.createElement(\'iframe\');' + "\n" +
    'document.body.appendChild(iframe);' + "\n" +
    'iframe.src = \'' + ourQuery + '\';' + "\n" +
    'iframe.id = \'e-sign-process\';' + "\n" +
    'iframe.width = \'100%\';' +  "\n" +
    'iframe.height = \'100%\';' + "\n" +
    '</script>');
    */
    return htmlEscape(
    '<iframe id="e-sign-process" src="' + ourQuery + 
    '" width="100%" height="100%"></iframe>'
    );
}

function setOutboundOptionSame () 
{

    /* remove the outbound-option in review */
    $("#review-outbound-licenses").html( 
        $("#outbound-option-same").val() );
    configs['outbound-option'] = 'same';

    /*
    $("#review-outbound-license-options").html(
        $("#outbound-option-same").val() );
    */

    $("#i-tmp-outbound-section-all").show();
    $("#i-tmp-outbound-section-all").removeClass("nuke");
    $("#e-tmp-outbound-section-all").show();
    $("#e-tmp-outbound-section-all").removeClass("nuke");

    /* put back order of sections after section 4 */
    $("#i-tmp-digit-disclaimer").html( '5' );
    $("#e-tmp-digit-disclaimer").html( '5' );
    $("#i-tmp-digit-waiver").html( '6' );
    $("#e-tmp-digit-waiver").html( '6' );
    $("#i-tmp-digit-approx-waiver").html( '7' );
    $("#e-tmp-digit-approx-waiver").html( '7' );
    $("#i-tmp-digit-waiver-2").html( '5' );
    $("#e-tmp-digit-waiver-2").html( '5' );
    $("#i-tmp-digit-approx-waiver-2").html( '6' );
    $("#e-tmp-digit-approx-waiver-2").html( '6' );
    $("#i-tmp-digit-term").html( '8' );
    $("#e-tmp-digit-term").html( '8' );
    $("#i-tmp-digit-term-1").html( '8.1' );
    $("#e-tmp-digit-term-1").html( '8.1' );
    $("#i-tmp-digit-term-2").html( '8.2' );
    $("#e-tmp-digit-term-2").html( '8.2' );
    $("#i-tmp-digit-term-3").html( '8.3' );
    $("#e-tmp-digit-term-3").html( '8.3' );
    $("#i-tmp-digit-term-special").html( '5, 6, 7, 8 and 9' );
    $("#e-tmp-digit-term-special").html( '5, 6, 7, 8 and 9' );
    $("#i-tmp-digit-misc").html( '9' );
    $("#e-tmp-digit-misc").html( '9' );
    $("#i-tmp-digit-misc-1").html( '9.1' );
    $("#e-tmp-digit-misc-1").html( '9.1' );
    $("#i-tmp-digit-misc-2").html( '9.2' );
    $("#e-tmp-digit-misc-2").html( '9.2' );
    $("#i-tmp-digit-misc-3").html( '9.3' );
    $("#e-tmp-digit-misc-3").html( '9.3' );
    $("#i-tmp-digit-misc-4").html( '9.4' );
    $("#e-tmp-digit-misc-4").html( '9.4' );

    $("#i-tmp-term-special").show();
    $("#e-tmp-term-special").show();
    $("#i-tmp-term-special").removeClass("nuke");
    $("#e-tmp-term-special").removeClass("nuke");

    fixPatentParagraph( 'the license or licenses that We ' +
                        'are using on the Submission Date' );


    $("#i-tmp-outbound-option-1").show();
    $("#i-tmp-outbound-option-1").removeClass("nuke");
    $("#i-tmp-outbound-option-2").hide();
    $("#i-tmp-outbound-option-2").addClass("nuke");
    $("#i-tmp-outbound-option-3").hide();
    $("#i-tmp-outbound-option-3").addClass("nuke");
    $("#e-tmp-outbound-option-1").show();
    $("#e-tmp-outbound-option-1").removeClass("nuke");
    $("#e-tmp-outbound-option-2").hide();
    $("#e-tmp-outbound-option-2").addClass("nuke");
    $("#e-tmp-outbound-option-3").hide();
    $("#e-tmp-outbound-option-3").addClass("nuke");
}

function setOutboundOptionSameLicenses ()
{
    configs['outbound-option'] = 'same-licenses';

    $("#i-tmp-outbound-section-all").show();
    $("#i-tmp-outbound-section-all").removeClass("nuke");
    $("#e-tmp-outbound-section-all").show();
    $("#e-tmp-outbound-section-all").removeClass("nuke");

    /* put back order of sections after section 4 */
    $("#i-tmp-digit-disclaimer").html( '5' );
    $("#e-tmp-digit-disclaimer").html( '5' );
    $("#i-tmp-digit-waiver").html( '6' );
    $("#e-tmp-digit-waiver").html( '6' );
    $("#i-tmp-digit-approx-waiver").html( '7' );
    $("#e-tmp-digit-approx-waiver").html( '7' );
    $("#i-tmp-digit-waiver-2").html( '5' );
    $("#e-tmp-digit-waiver-2").html( '5' );
    $("#i-tmp-digit-approx-waiver-2").html( '6' );
    $("#e-tmp-digit-approx-waiver-2").html( '6' );
    $("#i-tmp-digit-term").html( '8' );
    $("#e-tmp-digit-term").html( '8' );
    $("#i-tmp-digit-term-1").html( '8.1' );
    $("#e-tmp-digit-term-1").html( '8.1' );
    $("#i-tmp-digit-term-2").html( '8.2' );
    $("#e-tmp-digit-term-2").html( '8.2' );
    $("#i-tmp-digit-term-3").html( '8.3' );
    $("#e-tmp-digit-term-3").html( '8.3' );
    $("#i-tmp-digit-term-special").html( '5, 6, 7, 8 and 9' );
    $("#e-tmp-digit-term-special").html( '5, 6, 7, 8 and 9' );
    $("#i-tmp-digit-misc").html( '9' );
    $("#e-tmp-digit-misc").html( '9' );
    $("#i-tmp-digit-misc-1").html( '9.1' );
    $("#e-tmp-digit-misc-1").html( '9.1' );
    $("#i-tmp-digit-misc-2").html( '9.2' );
    $("#e-tmp-digit-misc-2").html( '9.2' );
    $("#i-tmp-digit-misc-3").html( '9.3' );
    $("#e-tmp-digit-misc-3").html( '9.3' );
    $("#i-tmp-digit-misc-4").html( '9.4' );
    $("#e-tmp-digit-misc-4").html( '9.4' );

    $("#i-tmp-term-special").show();
    $("#e-tmp-term-special").show();
    $("#i-tmp-term-special").removeClass("nuke");
    $("#e-tmp-term-special").removeClass("nuke");

    /*
    $("#i-tmp-licenses-2").show();
    $("#e-tmp-licenses-2").show();
    $("#i-tmp-licenses-2").removeClass("nuke");
    $("#e-tmp-licenses-2").removeClass("nuke");
    */

    if ( !outboundCopyrightLicenses ) 
    {
        fixPatentParagraph( outBeforeField + " " + 
                            outAfterField + " " + emptyField );
    } else {
        fixPatentParagraph();
    }


    $("#i-tmp-outbound-option-1").hide();
    $("#i-tmp-outbound-option-1").addClass("nuke");
    $("#i-tmp-outbound-option-2").show();
    $("#i-tmp-outbound-option-2").removeClass("nuke");
    $("#i-tmp-outbound-option-3").hide();
    $("#i-tmp-outbound-option-3").addClass("nuke");
    $("#e-tmp-outbound-option-1").hide();
    $("#e-tmp-outbound-option-1").addClass("nuke");
    $("#e-tmp-outbound-option-2").show();
    $("#e-tmp-outbound-option-2").removeClass("nuke");
    $("#e-tmp-outbound-option-3").hide();
    $("#e-tmp-outbound-option-3").addClass("nuke");
}

function setOutboundOptionFsf ()
{
    /* remove the outbound-option in review */
    // $("#review-outbound-licenses").html( naField );
    $("#review-outbound-licenses").html( 
        $("#outbound-option-fsf").val() );

    configs['outbound-option'] = 'fsf' ;

    $("#i-tmp-outbound-section-all").show();
    $("#i-tmp-outbound-section-all").removeClass("nuke");
    $("#e-tmp-outbound-section-all").show();
    $("#e-tmp-outbound-section-all").removeClass("nuke");

    /* put back order of sections after section 4 */
    $("#i-tmp-digit-disclaimer").html( '5' );
    $("#e-tmp-digit-disclaimer").html( '5' );
    $("#i-tmp-digit-waiver").html( '6' );
    $("#e-tmp-digit-waiver").html( '6' );
    $("#i-tmp-digit-approx-waiver").html( '7' );
    $("#e-tmp-digit-approx-waiver").html( '7' );
    $("#i-tmp-digit-waiver-2").html( '5' );
    $("#e-tmp-digit-waiver-2").html( '5' );
    $("#i-tmp-digit-approx-waiver-2").html( '6' );
    $("#e-tmp-digit-approx-waiver-2").html( '6' );
    $("#i-tmp-digit-term").html( '8' );
    $("#e-tmp-digit-term").html( '8' );
    $("#i-tmp-digit-term-1").html( '8.1' );
    $("#e-tmp-digit-term-1").html( '8.1' );
    $("#i-tmp-digit-term-2").html( '8.2' );
    $("#e-tmp-digit-term-2").html( '8.2' );
    $("#i-tmp-digit-term-3").html( '8.3' );
    $("#e-tmp-digit-term-3").html( '8.3' );
    $("#i-tmp-digit-term-special").html( '5, 6, 7, 8 and 9' );
    $("#e-tmp-digit-term-special").html( '5, 6, 7, 8 and 9' );
    $("#i-tmp-digit-misc").html( '9' );
    $("#e-tmp-digit-misc").html( '9' );
    $("#i-tmp-digit-misc-1").html( '9.1' );
    $("#e-tmp-digit-misc-1").html( '9.1' );
    $("#i-tmp-digit-misc-2").html( '9.2' );
    $("#e-tmp-digit-misc-2").html( '9.2' );
    $("#i-tmp-digit-misc-3").html( '9.3' );
    $("#e-tmp-digit-misc-3").html( '9.3' );
    $("#i-tmp-digit-misc-4").html( '9.4' );
    $("#e-tmp-digit-misc-4").html( '9.4' );


    $("#i-tmp-term-special").show();
    $("#e-tmp-term-special").show();
    $("#i-tmp-term-special").removeClass("nuke");
    $("#e-tmp-term-special").removeClass("nuke");

    /*
    $("#i-tmp-licenses-2").hide();
    $("#e-tmp-licenses-2").hide();
    $("#i-tmp-licenses-2").addClass("nuke");
    $("#e-tmp-licenses-2").addClass("nuke");
    */

    $("#i-tmp-licenses-2").html( fsfField );
    $("#e-tmp-licenses-2").html( fsfField );

    $("#i-tmp-outbound-option-1").hide();
    $("#i-tmp-outbound-option-1").addClass("nuke");
    $("#i-tmp-outbound-option-2").hide();
    $("#i-tmp-outbound-option-2").addClass("nuke");
    $("#i-tmp-outbound-option-3").show();
    $("#i-tmp-outbound-option-3").removeClass("nuke");
    $("#e-tmp-outbound-option-1").hide();
    $("#e-tmp-outbound-option-1").addClass("nuke");
    $("#e-tmp-outbound-option-2").hide();
    $("#e-tmp-outbound-option-2").addClass("nuke");
    $("#e-tmp-outbound-option-3").show();
    $("#e-tmp-outbound-option-3").removeClass("nuke");


}

function setOutboundOptionNoCommitment ()
{
    /* remove the outbound-option in review */
    $("#review-outbound-licenses").html( naField );
    $("#review-media-licenses").html( naField );

    configs['outbound-option'] = 'no-commitment'; 

    /*
    $("#review-outbound-license-options").html(
        $("#outbound-option-no-commitment").val() );
    */

    $("#i-tmp-outbound-option-1").hide();
    $("#i-tmp-outbound-option-1").addClass("nuke");
    $("#i-tmp-outbound-option-2").hide();
    $("#i-tmp-outbound-option-2").addClass("nuke");
    $("#i-tmp-outbound-option-3").hide();
    $("#i-tmp-outbound-option-3").addClass("nuke");
    $("#e-tmp-outbound-option-1").hide();
    $("#e-tmp-outbound-option-1").addClass("nuke");
    $("#e-tmp-outbound-option-2").hide();
    $("#e-tmp-outbound-option-2").addClass("nuke");
    $("#e-tmp-outbound-option-3").hide();
    $("#e-tmp-outbound-option-3").addClass("nuke");

    
    /* remove entire section 4 */
    $("#i-tmp-outbound-section-all").hide();
    $("#i-tmp-outbound-section-all").addClass("nuke");
    $("#e-tmp-outbound-section-all").hide();
    $("#e-tmp-outbound-section-all").addClass("nuke");
    // entire section hidden: fixPatentParagraph();

    /* reorder sections now that section 4 gone */
    $("#i-tmp-digit-disclaimer").html( '4' );
    $("#e-tmp-digit-disclaimer").html( '4' );
    $("#i-tmp-digit-waiver").html( '5' );
    $("#e-tmp-digit-waiver").html( '5' );
    $("#i-tmp-digit-approx-waiver").html( '6' );
    $("#e-tmp-digit-approx-waiver").html( '6' );
    $("#i-tmp-digit-waiver-2").html( '4' );
    $("#e-tmp-digit-waiver-2").html( '4' );
    $("#i-tmp-digit-approx-waiver-2").html( '5' );
    $("#e-tmp-digit-approx-waiver-2").html( '5' );
    $("#i-tmp-digit-term").html( '7' );
    $("#e-tmp-digit-term").html( '7' );
    $("#i-tmp-digit-term-1").html( '7.1' );
    $("#e-tmp-digit-term-1").html( '7.1' );
    /** undisplayed  $("#i-tmp-digit-term-2").html( '7.2' ); */
    $("#i-tmp-digit-term-3").html( '7.2' );
    $("#e-tmp-digit-term-3").html( '7.2' );
    $("#i-tmp-digit-term-special").html( '4, 5, 6, 7 and 8' );
    $("#e-tmp-digit-term-special").html( '4, 5, 6, 7 and 8' );
    $("#i-tmp-digit-misc").html( '8' );
    $("#e-tmp-digit-misc").html( '8' );
    $("#i-tmp-digit-misc-1").html( '8.1' );
    $("#e-tmp-digit-misc-1").html( '8.1' );
    $("#i-tmp-digit-misc-2").html( '8.2' );
    $("#e-tmp-digit-misc-2").html( '8.2' );
    $("#i-tmp-digit-misc-3").html( '8.3' );
    $("#e-tmp-digit-misc-3").html( '8.3' );
    $("#i-tmp-digit-misc-4").html( '8.4' );
    $("#e-tmp-digit-misc-4").html( '8.4' );


    $("#i-tmp-term-special").hide();
    $("#e-tmp-term-special").hide();
    $("#i-tmp-term-special").addClass("nuke");
    $("#e-tmp-term-special").addClass("nuke");
}


function updatePosition ()
{
    switch ( $.QueryString["pos"] ) {
        case 'general':
            $('#rootwizard').bootstrapWizard('show','general');
            break;
        case 'copyright':
            testCopyrightPage();
            $('#rootwizard').bootstrapWizard('show',1);
            break;
        case 'patents':
            testPatentPage();
            $('#rootwizard').bootstrapWizard('show',2);
            break;
        case 'review':
            testReviewPage();
            $('#rootwizard').bootstrapWizard('show',3);
            break;
        case 'apply':
            // loadTemplates();
            testAllPages();
            $('#rootwizard').bootstrapWizard('last');
            break;
    } 
    // testAllPages();
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

            if ( !$("#beneficiary-name").val() )
            {
                $("#review-beneficiary-name").html( emptyField );
                configs['beneficiary-name'] = '';
            } else {
                $("#review-beneficiary-name").html(
                    $("#beneficiary-name").val() );
                configs['beneficiary-name'] = $("#beneficiary-name").val();
            }

            if ( !$("#project-name").val() ) 
            {
                $("#review-project-name").html( emptyField );
                $("#i-tmp-project-name").html( emptyField );
                $("#e-tmp-project-name").html( emptyField );
                $("#i-tmp-project-name-2").html( emptyField );
                $("#e-tmp-project-name-2").html( emptyField );
                configs['project-name'] = '';
            } else {
                $("#review-project-name").html(
                    $("#project-name").val() );
                $("#i-tmp-project-name").html(
                    $("#project-name").val() );
                $("#e-tmp-project-name").html(
                    $("#project-name").val() );
                $("#i-tmp-project-name-2").html(
                    $("#project-name").val() );
                $("#e-tmp-project-name-2").html(
                    $("#project-name").val() );
                configs['project-name'] = $("#project-name").val();
            }

            if ( !$("#project-website").val() ) 
            {
                $("#review-project-website").html( emptyField );
                configs['project-website'] = '';
            } else 
            {
                $("#review-project-website").html(
                    $("#project-website").val() );
                configs['project-website'] = $("#project-website").val();
            }

            if ( !$("#project-email").val() ) 
            {
                $("#review-project-email").html( emptyField );
                configs['project-email'] = '';
            } else 
            {
                $("#review-project-email").html(
                    $("#project-email").val() );
                $("#i-tmp-project-email-1").html(
                    $("#project-email").val() );
                $("#e-tmp-project-email-1").html(
                    $("#project-email").val() );
                $("#i-tmp-project-email-2").html(
                    $("#project-email").val() );
                $("#e-tmp-project-email-2").html(
                    $("#project-email").val() );
                configs['project-email'] = $("#project-email").val();
            }

            if ( !$("#contributor-process-url").val() ) 
            {
                $("#review-contributor-process-url").html( emptyField );
                $("#i-tmp-submission-instructions").html( emptyField );
                $("#e-tmp-submission-instructions").html( emptyField );
                configs['process-url'] = '';
            } else {
                $("#review-contributor-process-url").html(
                    $("#contributor-process-url").val() );
                $("#i-tmp-submission-instructions").html(
                    $("#contributor-process-url").val() );
                $("#e-tmp-submission-instructions").html(
                    $("#contributor-process-url").val() );
                configs['process-url'] = 
                    $("#contributor-process-url").val();
            }

            if ( !$("#project-jurisdiction").val() ) 
            {
                $("#review-project-jurisdiction").html( emptyField );
                $("#i-tmp-project-jurisdiction").html( emptyField );
                $("#e-tmp-project-jurisdiction").html( emptyField );
                configs['project-jurisdiction'] = '';
            } else{
                $("#review-project-jurisdiction").html(
                    $("#project-jurisdiction").val() );
                $("#i-tmp-project-jurisdiction").html(
                    $("#project-jurisdiction").val() );
                $("#e-tmp-project-jurisdiction").html(
                    $("#project-jurisdiction").val() );
                configs['project-jurisdiction'] = 
                    $("#project-jurisdiction").val();
            }

            if ( !$("#agreement-exclusivity").val() ) 
            {
                $("#review-agreement-exclusivity").html( emptyField );
                $("#i-tmp-contributor-exclusivity").html( emptyField );
                $("#e-tmp-contributor-exclusivity").html( emptyField );
                configs['agreement-exclusivity'] = '';
            } else{
                var cleanVersion = '';
                if ( $("#agreement-exclusivity").val() in dictionary )
                {
                    cleanVersion = 
                        dictionary[$("#agreement-exclusivity").val()];
                } else {
                    cleanVersion = $("#agreement-exclusivity").val();
                }

                $("#review-agreement-exclusivity").html(
                    cleanVersion );

                $("#i-tmp-contributor-exclusivity").html(
                    cleanVersion );
                $("#e-tmp-contributor-exclusivity").html(
                    cleanVersion );

                configs['agreement-exclusivity'] = 
                    $("#agreement-exclusivity").val();
            }


            if ( $("#agreement-exclusivity").val() == 'exclusive' )
            {
                $("#i-tmp-license-option-1").show();
                $("#i-tmp-license-option-1").removeClass("nuke");
                $("#i-tmp-license-option-2").hide();
                $("#i-tmp-license-option-2").addClass("nuke");
                $("#e-tmp-license-option-1").show();
                $("#e-tmp-license-option-1").removeClass("nuke");
                $("#e-tmp-license-option-2").hide();
                $("#e-tmp-license-option-2").addClass("nuke");

            } else {
                $("#i-tmp-license-option-1").hide();
                $("#i-tmp-license-option-1").addClass("nuke");
                $("#i-tmp-license-option-2").show();
                $("#i-tmp-license-option-2").removeClass("nuke");
                $("#e-tmp-license-option-1").hide();
                $("#e-tmp-license-option-1").addClass("nuke");
                $("#e-tmp-license-option-2").show();
                $("#e-tmp-license-option-2").removeClass("nuke");

            }


            if ( !outboundCopyrightLicenses ) {
                $("#review-outbound-licenses").html( emptyField );
                $("#i-tmp-licenses").html( emptyField );
                $("#e-tmp-licenses").html( emptyField );
                $("#i-tmp-licenses-2").html( emptyField );
                $("#e-tmp-licenses-2").html( emptyField );
                configs['outboundlist'] = '';

            } else {
                $("#review-outbound-licenses").html(
                    outboundCopyrightLicenses );
                $("#i-tmp-licenses").html(
                    outboundCopyrightLicenses );
                $("#e-tmp-licenses").html(
                    outboundCopyrightLicenses );
                $("#i-tmp-licenses-2").html(
                    outboundCopyrightLicenses );
                $("#e-tmp-licenses-2").html(
                    outboundCopyrightLicenses );
                configs['outboundlist'] = outboundCopyrightLicenses;
            }

            if ( $("#outbound-option-same").prop("checked") )
                setOutboundOptionSame();

            if ( $("#outbound-option-same-licenses").prop("checked") )
                setOutboundOptionSameLicenses();

            if ( $("#outbound-option-fsf").prop("checked") )
                setOutboundOptionFsf();


            $("#review-outbound-license-other").html(
                $("#outboundlist-custom").val() );
            configs['outboundlist-custom'] = $("#outboundlist-custom").val();

            $("#review-media-licenses").html(
                mediaLicenses );
            configs['medialist'] = mediaLicenses;

            if ( mediaLicenses == "None" ) {
                $("#e-tmp-outbound-media-license").hide();
                $("#i-tmp-outbound-media-license").hide();
                $("#e-tmp-outbound-media-license").addClass("nuke");
                $("#i-tmp-outbound-media-license").addClass("nuke");
            } else {
                if ( mediaLicenses == "" )
                    mediaLicenses = emptyField;
                $("#i-tmp-media-licenses").html(
                    mediaLicenses );
                $("#e-tmp-media-licenses").html(
                    mediaLicenses );
                $("#i-tmp-outbound-media-license").show();
                $("#e-tmp-outbound-media-license").show();
                $("#i-tmp-outbound-media-license").removeClass("nuke");
                $("#e-tmp-outbound-media-license").removeClass("nuke");
            }

            // outbound-option-no-commitment
            if ( $("#outbound-option-no-commitment").prop("checked") )
                setOutboundOptionNoCommitment();


            var cleanVersion = '';
            if ( $("#patent-type").val() in dictionary )
            {
                cleanVersion = 
                    dictionary[$("#patent-type").val()];
            } else {
                cleanVersion = $("#patent-type").val();
            }


            $("#review-patent-type").html(
                cleanVersion );
            $("#i-tmp-patent-option").html(
                cleanVersion );
            $("#e-tmp-patent-option").html(
                cleanVersion );

            configs['patent-option'] = $("#patent-type").val();

            if ( $("#patent-type").val() == 'Traditional' )
            {
                $("#i-tmp-patent-option-1").show();
                $("#i-tmp-patent-option-1").removeClass("nuke");
                $("#i-tmp-patent-option-2").hide();
                $("#i-tmp-patent-option-2").addClass("nuke");
                $("#e-tmp-patent-option-1").show();
                $("#e-tmp-patent-option-1").removeClass("nuke");
                $("#e-tmp-patent-option-2").hide();
                $("#e-tmp-patent-option-2").addClass("nuke");

                $("#i-tmp-outbound-special").show();
                $("#i-tmp-outbound-special").removeClass("nuke");
                $("#e-tmp-outbound-special").show();
                $("#e-tmp-outbound-special").removeClass("nuke");
            } else {
                $("#i-tmp-patent-option-1").hide();
                $("#i-tmp-patent-option-1").addClass("nuke");
                $("#i-tmp-patent-option-2").show();
                $("#i-tmp-patent-option-2").removeClass("nuke");
                $("#e-tmp-patent-option-1").hide();
                $("#e-tmp-patent-option-1").addClass("nuke");
                $("#e-tmp-patent-option-2").show();
                $("#e-tmp-patent-option-2").removeClass("nuke");

                $("#i-tmp-outbound-special").hide();
                $("#i-tmp-outbound-special").addClass("nuke");
                $("#e-tmp-outbound-special").hide();
                $("#e-tmp-outbound-special").addClass("nuke");

            }


            testApplyPage();

            return isReviewPageOk;
}

function testApplyPage ()
{
    if ( doDebug)
        console.log("at testApplyPage");

    isApplyPageOk = true;

    /* NEED TO REVIEW AFTER DECISIONS */
    /*
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
    */
    $("#apply-individual").show();
    $("#apply-entity").show();

    // creates the querystring to recreate current wizard state
    finalQueryString = $.param(configs);
    if ( doDebug)
        console.log("finalQueryString: " + finalQueryString);
    // set final linkto be used in the interface




    // EXAMPLE: 
    // http://service.fabricatorz.com/query2form/?_replyto=project@rejon.org&_subject=Contributor%20License%20Agreement%20E-Signing%20Process&_body=Fill%20out%20the%20following%20form,%20then%20sign%20your%20initials%20to%20complete%20the%20Contributor%20License%20Agreement.&fullname=&Title=&Company=&email-address=&Physical-address=&Sign-with-your-initials=&_submit=sign




    var finalLink = document.URL.substr(0,document.URL.lastIndexOf('/')) + 
                    "/?" + 
                    finalQueryString;
    // console.log("finalLink: " + finalLink);

    if ( "" != configs["project-email"] )
    {
        var encoded_uri = encodeURIComponent(finalLink);
        shortUrl = getShortUrl(encoded_uri);
    } else {
        shortUrl = '';
    }

    updateQuery4Form();

    if ( ! $('#contributor-process-url').val() )
    {
        if ( "" != configs["project-email"] )
        {
            if ( '1337' == debugNeedle )
                updateTestUrls();

            var queryReady = 
                (( "" != query4form_short ) ? query4form_short : query4form );

            $("#link-esign").attr("href", queryReady);
            $("#link-esign").addClass('btn-success');
            $("#link-esign").removeClass('btn-danger');
            $("#link-esign").html("Link to E-Signing Form");
            $("#signing-service").html('<b>Contributor Agreements</b>: ' +
                'Share the link with your contributors.');

            $("#embed-esign").html( getEmbedCode( queryReady ) );
            $("#embedding-service-all").show();


        } else {
            $("#link-esign").html( 'Need Project Email' );
            $("#link-esign").removeClass('btn-success');
            $("#link-esign").addClass('btn-danger');
            $("#signing-service").html('<b>Contributor Agreements</b>: ' +
                'Share the link with your contributors.');

            $("#embedding-service-all").hide();
        }
    } else {
        $("#link-esign").attr("href", $('#contributor-process-url').val());
        $("#link-esign").addClass('btn-success');
        $("#link-esign").removeClass('btn-danger');
        $("#link-esign").html("Contributor Signing Website");
        $("#signing-service").html('<b>Your Contributor Process</b>: ' + 
                                   'Share with your contributors.');
        $("#embed-esign").html( getEmbedCode( 
            $('#contributor-process-url').val() ) );
        $("#embedding-service-all").show();

    }


    // make sure short file parameter shows up in emails, and form
    //
    // and then also update page
    // a final step will be to make sure that has SIGNED a doc
    // that the final PDF and HTML will be signed and attached to email

    var tmpFinalLink = '';
    if ( "" == shortUrl )
        tmpFinalLink = finalLink;
    else
        tmpFinalLink = shortUrl;

    $(".final-link").attr("href", finalLink );

    var finalBrew = 
        "<section><h4>Recreate this Contributor License Agreement</h4>\n" +
        '<p><a href="' + tmpFinalLink + '">' + tmpFinalLink + '</p>' + "\n" + 
        "</section>\n";
    // console.log("finalBrew: " + finalBrew);

    $("#embed-offscreen").html( $( "#review-text" ).html() + finalBrew );
    $(".htmlstore-individual").val( $( "#review-text-style" ).html() + 
                         $( "#review-text" ).html() +
                         finalBrew );
    $("#embed-offscreen .nuke").remove();


    $("#embed-offscreen-entity").html( 
        $( "#review-text-entity" ).html() + finalBrew );
    $(".htmlstore-entity").val( $( "#review-text-style" ).html() + 
                         $( "#review-text-entity" ).html() +
                         finalBrew );
    $("#embed-offscreen-entity .nuke").remove();


    $("#embed-agreement").html( $("#embed-offscreen").html() );
    $("#embed-agreement-entity").html( $("#embed-offscreen-entity").html() );

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

function updateTestUrls ()
{
    /* 
     * @TODO not working now, changed to localhost in index.html for now
     *
    $("#html2pdf-form-individual").attr("action", serviceUrl + 
        '/html2pdf');
    $("#html2pdf-form-entity").attr("action", serviceUrl + 
        '/html2pdf');
    */
    if ( configs['project-email'] )
        $("#link-esign").attr("href", serviceUrl + '/query2form');
    else
        $("#link-esign").attr("href", '#');

}


$(document).ready(function() {

    loadTemplates();
    
    queryStringToConfigs();
    //  if ( doDebug )
    //    setFakeData();
    updateConfigs();

    if ( '1337' == debugNeedle )
        updateTestUrls();




    $("#patent-option-2-options").hide();


    $("#html2pdf-individual").click(function() {
        $('#html2pdf-form-individual').submit();
    });

    $("#html2pdf-entity").click(function() {
        $('#html2pdf-form-entity').submit();
    });


    // @TODO need to make these each test each input, not ALL inputs
    $( "#beneficiary-name" ).change(function() {
        // return testGeneralPage();
    });

    $( "#project-name" ).change(function() {
        // return testGeneralPage();
    });

    $( "#project-website" ).change(function() {
        // return testGeneralPage();
    });

    $( "#project-email" ).change(function() {
        configs["project-email"] = $( "#project-email" ).val();

        // return testGeneralPage();
    });

    $( "#contributor-process-url" ).change(function() {
        // return testGeneralPage();
    });

    $( "#project-jurisdiction" ).change(function() {
        // return testGeneralPage();
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
        $("#medialist-label").show();
        $("#medialist").show();
        // return testGeneralPage();
    });

    $( "#outbound-option-same-licenses" ).change(function() {
        if ( $("#outbound-option-same-licenses").prop( "checked" ) ) {
            $("#outboundlist").show();
            $("#outboundlist-custom").show();
        }
        $("#medialist-label").show();
        $("#medialist").show();
        // return testGeneralPage();
    });

    $( "#outbound-option-fsf" ).change(function() {
        $("#outboundlist").hide();
        $("#outboundlist-custom").hide();
        $("#medialist-label").show();
        $("#medialist").show();
        // return testGeneralPage();
    });

    $( "#outbound-option-no-commitment" ).change(function() {
        $("#outboundlist").hide();
        $("#outboundlist-custom").hide();
        $("#medialist-label").hide();
        $("#medialist").hide();
        // return testGeneralPage();
    });


    $( "#patent-type" ).change(function() {
        if ( $( "#patent-type" ).val() == 'Patent-Pledge' )
            $("#patent-option-2-options").show();
        else
            $("#patent-option-2-options").hide();

    });

    $( "#link-esign" ).click(function() {
        if ( "" == configs["project-email"] )
        {
            $("#link-esign").removeAttr("href");
            $("#link-esign").removeClass('btn-success');
            $("#link-esign").addClass('btn-danger');
            $('#rootwizard').bootstrapWizard('show','general');
        }
    });

    $( "#link-esign" ).change(function() {
            updateQuery4Form();
            $("#link-esign").attr("href", 
                ( "" != query4form_short ) ? query4form_short : query4form );
            $("#link-esign").addClass('btn-success');
            $("#link-esign").removeClass('btn-danger');
            $("#link-esign").html("Link to E-Signing Form");
        
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
    onTabClick: function(tab, navigation, index) 
    {
        testAllPages();
        return true;
    } 
    }

    );

    updatePosition();
    if ( $.QueryString["action"] )
    {
        console.log( "action: " + $.QueryString["action"] );
        switch ( $.QueryString["action"] ) 
        {
            case 'sign-entity':
                if ( doDebug) 
                    console.log( "Sign entity" );
                $('#rootwizard').bootstrapWizard('last');
                testReviewPage();
                testApplyPage();
                // console.log( 'sign-entity: ' + $('#review-text-entity').html() );
                $('#html2pdf-form-entity').submit();
                break;
            case 'sign-individual':
                if ( doDebug) 
                    console.log( "Sign individual" );
                $('#rootwizard').bootstrapWizard('last');
                testReviewPage();
                testApplyPage();
                // console.log("sign-indy: " +  $('#review-text').html() );
                $('#html2pdf-form-individual').submit();
                break;
        }
    }

    window.prettyPrint && prettyPrint()

});
