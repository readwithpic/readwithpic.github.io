var link = new Array();
var link2 = new Array();
//looping variables and interger only
var k, j, i, h, startNum, constantV, calNum;
var filterWords = ["is", "are", "all", "another", "any", "anybody", "anyone", "anything", "botheach", "each", "other", "either", "everybody", "everyone", "everything", "few", "he", "her", "hers", "herself", "him", "himself", "his", "it", "its", "itself", "many", "me", "mine", "more", "most", "much", "myself", "neither", "no", "one", "nobody", "none", "nothing", "another", "other", "others", "ours", "ourselves", "several", "she", "some", "somebody", "someone", "something", "their", "theirs", "them", "themselves", "these", "they", "this", "those", "us", "we", "what", "whatever", "which", "whichever", "who", "whoever", "whom", "whomever", "whose", "you", "your", "yours", "yourself", "yourselves", "that", "it's", "time", "person", "year", "way", "day", "thing", "man", "world", "life", "hand", "part", "child", "eye", "woman", "place", "work", "week", "case", "point", "government", "company", "number", "group", "problem", "fact", "be", "have", "do", "say", "get", "make", "go", "know", "take", "see", "come", "think", "look", "want", "give", "use", "find", "tell", "ask", "work", "seem", "feel", "try", "leave", "call", "good", "new", "first", "last", "long", "great", "little", "own", "other", "old", "right", "big", "high", "different", "small", "large", "next", "early", "young", "important", "few", "public", "bad", "same", "able", "to", "of", "in", "for", "on", "with", "at", "by", "from", "up", "about", "into", "over", "after", "beneath", "under", "above", "the", "and", "a", "that", "", "it", "not", "he", "as", "you", "this", "but", "his", "they", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "aboard", "about", "above", "across", "after", "against", "along", "amid", "among", "around", "as", "at", "before", "behind", "below", "beneath", "beside", "besides", "between", "beyond", "but", "by", "concerning", "considering", "despite", "down", "during", "except", "excepting", "excluding", "following", "for", "from", "in", "inside", "into", "like", "minus", "near", "of", "off", "on", "onto", "opposite", "outside", "over", "past", "per", "plus", "regarding", "round", "save", "since", "than", "through", "to", "toward", "towards", "under", "underneath", "unlike", "until", "up", "upon", "versus", "via", "with", "within", "without"];
var lastList, textInput, myScroll, loadList, count,option,animation, userInput, cleanSent, search;
var $win, $doc, $list, $textArea, $roundB, $closeB, $buttonSpin, $funny, $ani;

$(document).ready(function () {
    $list = $('li');
    textInput = $('#textInput');
    loadList = $('#listLoad');
    $win = $(window);
    $doc = $(document);
    $textArea = $('textarea');
    $roundB = $('#roundB');
    $closeB = $('#closeB');
    $buttonSpin=$('#buttonSpin');
    $funny=$('#funny');
    $ani=$('#ani');
    
    //Enable or Disable readwithpic button
    $textArea.keyup(function () {
        if ($(this).val() && $('li').length > 1) {
            $('#readwithpic').removeAttr('disabled');
        } else {
            $('#readwithpic').attr('disabled', 'disabled');
        }
    });
    
    $('#readwithpic').click(function () {
        //avoid rapid click from user 
        $('#readwithpic').attr('disabled', 'disabled');
        
        //Immediately remove two front pictures
        $('.frontDisplay').remove();
        
        //textarea animation effect during middle of screen
        if (textInput.height() > 350) {
            $('#textInput').fadeOut('fast');
            $('.mainGroup').fadeOut('fast');
            $closeB.hide();
            
        //textarea animation effect at home page
        } else {
            $('#textInput').slideUp('fast');
            $('.mainGroup').fadeOut('fast');
        }
         
        //Option display for humor and animation    ----START--->
        if($funny.is(':checked')){
            option='funny';
        }else{
            option='';
        }
        
        if($ani.is(':checked')){
            animation='imgtype=animated&';
        }else{
            animation='';
        }
        
        //Don't show list of option at home page unless user pressed option button
        $('.optionBox').hide();
        
        //option button text
        $('#optionText').show();
        
        //hide option button close logo
        $('#optionClose').hide();
        //Option display    ----END----<
        
        //main brain of textarea    ----START---->
        count = 0;
        h = 0;
        j = 0;
        myScroll = 0;
        // default number of search images to be loaded at first
        startNum = 30;
        //constantV is assigned to calNum to load given number consistant images after each scroll
        calNum = startNum;
        link.length = 0;
        link2.length = 0;
        $('#what').empty();
        $('.onlyText').remove();
        userInput = $('textarea[name=texthere]').val();
        cleanSent = userInput.replace(/\s+/g, ' ');// remove more than 1 space.
        search = cleanSent.split(" ");//seperate each words from the sentence and put in array.
        callAjax(search[j]); //callAjax is the main function to get look for image
        //brain transfer            ----END----<
        
        //Remove all the lists
        $('li').remove();

        //Display loading sign as a first list element
        $('#display ul').append(loadList);
        
        //Display loading while ajax request
        loadList.show();
       
        //small upperight-corner round button
        $roundB.show('fast');
        $buttonSpin.show();
    });
    
    //Empty textarea
    $('#clear').click(function () {
        $textArea.val('');
    });
    
    //Option box
    $('#option').click(function() {
        if($('.optionBox').is(':visible')){
            $('.optionBox').hide();
            $('#optionText').show();
            $('#optionClose').hide();
        }else{
            $('.optionBox').show();
            $('#optionText').hide();
            $('#optionClose').show();
        }
    });
     
    //Text are control(round button)    ---START--->
    $('#roundB').click(function () {
        //display textBox at the middle of screen.
        $('#textInput').css({
            'position': 'fixed',
                'top': '10%',
                'left': '9%',
                'width': '80%',
                'height': '70%'
        });
        $('.mainGroup').css({
            'position': 'fixed',
                'top': '82%'
        });
        $('#textInput').fadeIn('fast');
        $('.mainGroup').fadeIn('fast');
        $('#closeB').show();
        $('.optionBox').css({
            'position': 'fixed',
                'top': '14%',
        });
        $(this).hide();
    });

    //close button
    $('#closeB').click(function () {
        $('#textInput').fadeOut('fast');
        $('.mainGroup').fadeOut('fast');
        $roundB.show();
        $('.optionBox').hide();
         $('#optionText').show();
        $('#optionClose').hide();
        $(this).hide();
    });
    //text are control button   ---END---<
    
    
    $win.resize(function () {
        // load the rest of screen if the user reduce the zoom less than 100%      
        if (lastList.offset().top < $win.height() && myScroll === 1) {
            myScroll = 1;
            $win.scroll();
        }
    });
    
    
    //load additiona pictures when user scroll.
    $win.scroll(function () {
        if ($win.scrollTop() + $win.height() > $doc.height() - $doc.height() / 4 && myScroll === 1 && j < search.length) {
            h = 0;
            //To reuse same Array link2 
            link.length = 0;
            link2.length = 0;
            
            //load number of images after each scroll
            constantV = 10;
            
            //reintalize the calNum to display given constant number of images accross the screen
            calNum += constantV;
            callAjax(search[j]);
            myScroll = 0;
        } else if (j === search.length) {
            loadList.hide();
        }
    });

    //dubugging zone
    $('#debug').click(function () {
        $('#sDebug').append('<br>' + "Linklength1 : " + link.length + '<br>');
        $('#sDebug').append("Linklength2 : " + link2.length + '<br>');
        $("#sDebug").append("dubug j value :" + j + '<br>');
        $('#sDebug').append("dubug i value:" + i + '<br>');
        $('#sDebug').append("dubug count value:" + count + '<br>');
        $('#sDebug').append("dubug k value:" + k + '<br>');
    });
});

function callAjax(index) {
    var choice,animationPic;
    var rand=Math.floor(Math.random() * 3);
    
    if( rand === 1 && option==='funny'){
        choice='funny';
    }else{
        choice='';
    }
    
    if((rand === 1 || rand === 2) && animation === 'imgtype=animated&'){
        animationPic = 'imgtype=animated&';
    }else{
        animationPic = '';
    }
    
    var look = new URL('https://ajax.googleapis.com/ajax/services/search/images?v=1.0&safe=active&' + animationPic + 'q=' + choice + index + '&callback=?');
    $.ajax({
        url:look,
        dataType: 'json',
        success: function (data) {
            if (data.responseData.results.length === 0) {
                if (j < startNum) {
                    link[j] = "http://upload.wikimedia.org/wikipedia/commons/9/98/MA_Route_blank.svg";
                    j++;
                } else {
                    link2[h] = "http://upload.wikimedia.org/wikipedia/commons/9/98/MA_Route_blank.svg";
                    j++;
                    h++;
                }
            } else {
                if (j < startNum) {
                    link[j] = data.responseData.results[0].url;
                    j++;
                } else {
                    link2[h] = data.responseData.results[0].url;
                    j++;
                    h++;
                }
            }
            //checked against the calNum to make sure it doesn't load images more then startNum(default number of images to be load at first) 
            if (j < search.length && j < calNum) {
                callAjax(search[j]);
            } else {
                show();
            }
        }
    });
}

//function do display first 30 words
function show() {
    var loopNum;
    i = 0;
    
    //slideUp or fadeOut the textarea and button
    if (count === 0) {
        for (i; i < j; i++) {;
            //indexOf(search[j]) returns -1 if the value is not present inside array search[j];
            //check if search[j] is not the first html list element 
            if (filterWords.indexOf(search[i]) !== -1 && $list.length > 0) {
                $('.withPic').last().append('<p class=onlyText>' + search[i] + '</p>');
            } else {
                $('#display ul').append('<li class="showIt">' + '<figure>' + '<img src="' + link[i] + '" height=180 width=180>' +
                    '<figcaption>' + '<p class=withPic>' + search[i] + '</p>' + '</figcaption>' + '</figure>' + '</li>');
            }
        }
        $buttonSpin.hide();
        
        //get the last list element
        lastList = $('li:last').attr('class', 'showIt');

        //always put the loading at the last element
        $('#display ul').append(loadList);
        
        //disable this for loop
        count = 1;
        
        //initiate scroll
        myScroll = 1;
        
        //for bigger bigger resolution or screen to load more list element than intiated max startNum value
        if (lastList.offset().top < $win.height()) {
            $win.scroll();
        }
    } else {
        k = 0;
        //to run the loop if the value of constantV is less then link2.length.
        if (link2.length < constantV) {
            i = j - link2.length;
            loopNum = i + link2.length;
            //$('#what').append('<br>' + 'insideLOOPNUM: ' + loopNum);
            //Once value of j arrives here it'll be orginal value + constantV because callAjax function have already run twice
        } else {
            i = j - constantV;
            loopNum = i + constantV;
        }
        
        for (i; i < loopNum; i++) {
            //indexOf(search[j]) returns -1 if the value is not present inside array search[j];
            //check if search[j] is not the first html list element 
            if (filterWords.indexOf(search[i]) !== -1 && $list.length > 0) {
                $('.withPic').last().append('<p class=onlyText>' + search[i] + '</p>');
            } else {
                $('#display ul').append('<li class="showIt">' + '<figure>' + '<img src="' + link2[k] + '" height=180 width=180>' +
                    '<figcaption>' + '<p class=withPic>' + search[i] + '</p>' + '</figcaption>' + '</figure>' + '</li>');
            }
            k++;
            //for debug purposes
            // $('#what').append('<br>' + 'insideIvalue: ' + i);
            // $('#what').append('<br>' + 'insideKvalue: ' + k);
            // $('#what').append('<br>' + 'insideJvalue: ' + j);
        }
        
        $('#display ul').append(loadList);
        myScroll = 1;
        
        if (lastList.offset().top < $win.height()) {
            $win.scroll();
        }
        
    }
}

