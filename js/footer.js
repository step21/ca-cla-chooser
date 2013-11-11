

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
            if ( !$('#project-family-name').val() ) {
                $('#project-family-name').addClass("cla-alert");
                isGeneralPageOk = false;
            } else {
                $('#project-family-name').removeClass("cla-alert");
                isGeneralPageOk = true;
            }

            if ( !$('#project-name').val() ) {
                $('#project-name').addClass("cla-alert");
                isGeneralPageOk = false;
            } else {
                $('#project-name').removeClass("cla-alert");
                isGeneralPageOk = true;
		    }

            if ( !$('#project-website').val() || 
                 !validateURL( $('#project-website').val() ) ) {
                $('#project-website').addClass("cla-alert");
                isGeneralPageOk = false;
            } else {
                $('#project-website').removeClass("cla-alert");
                isGeneralPageOk = true;
            }

            if ( !$('#project-email').val() ||
                 !validateEmail($('#project-email').val()) ) 
            {
                $('#project-email').addClass("cla-alert");
                isGeneralPageOk = false;
            } else {
                $('#project-email').removeClass("cla-alert");
                isGeneralPageOk = true;
            }

            if ( !$('#contributor-signing-process').val() ||
                 !validateURL( $('#contributor-signing-process').val()  ) ) {
                $('#contributor-signing-process').addClass("cla-alert");
                isGeneralPageOk = false;
            } else {
                $('#contributor-signing-process').removeClass("cla-alert");
                isGeneralPageOk = true;
            }

            if ( !$('#project-jurisdiction').val() ) {
                $('#project-jurisdiction').addClass("cla-alert");
                isGeneralPageOk = false;
            } else {
                $('#project-jurisdiction').removeClass("cla-alert");
                isGeneralPageOk = true;
            }

    return isGeneralPageOk;
}

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



	$('#rootwizard').bootstrapWizard({onNext: function(tab, navigation, index)
    {
        console.log("tab: " + tab);
        console.log("navigation: " + navigation);
        console.log("index: " + index);

        switch( index )
        {
            case generalPageIndex + 1:
                return testGeneralPage();
                break;
            case 2:
                return testCopyrightPage();
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
