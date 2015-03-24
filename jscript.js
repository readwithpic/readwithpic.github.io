var link = new Array();
var link2 = new Array();
var k, j, i, userInput, cleanSent, search,h, startNum, constantV, calNum;
var filterWords = ["is", "are", "all", "another", "any", "anybody", "anyone", "anything", "botheach", "each", "other", "either", "everybody", "everyone", "everything", "few", "he", "her", "hers", "herself", "him", "himself", "his", "it", "its", "itself", "many", "me", "mine", "more", "most", "much", "myself", "neither", "no", "one", "nobody", "none", "nothing", "another", "other", "others", "ours", "ourselves", "several", "she", "some", "somebody", "someone", "something", "their", "theirs", "them", "themselves", "these", "they", "this", "those", "us", "we", "what", "whatever", "which", "whichever", "who", "whoever", "whom", "whomever", "whose", "you", "your", "yours", "yourself", "yourselves", "that", "it's", "time", "person", "year", "way", "day", "thing", "man", "world", "life", "hand", "part", "child", "eye", "woman", "place", "work", "week", "case", "point", "government", "company", "number", "group", "problem", "fact", "be", "have", "do", "say", "get", "make", "go", "know", "take", "see", "come", "think", "look", "want", "give", "use", "find", "tell", "ask", "work", "seem", "feel", "try", "leave", "call", "good", "new", "first", "last", "long", "great", "little", "own", "other", "old", "right", "big", "high", "different", "small", "large", "next", "early", "young", "important", "few", "public", "bad", "same", "able", "to", "of", "in", "for", "on", "with", "at", "by", "from", "up", "about", "into", "over", "after", "beneath", "under", "above", "the", "and", "a", "that", "", "it", "not", "he", "as", "you", "this", "but", "his", "they", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "aboard", "about", "above", "across", "after", "against", "along", "amid", "among", "around", "as", "at", "before", "behind", "below", "beneath", "beside", "besides", "between", "beyond", "but", "by", "concerning", "considering", "despite", "down", "during", "except", "excepting", "excluding", "following", "for", "from", "in", "inside", "into", "like", "minus", "near", "of", "off", "on", "onto", "opposite", "outside", "over", "past", "per", "plus", "regarding", "round", "save", "since", "than", "through", "to", "toward", "towards", "under", "underneath", "unlike", "until", "up", "upon", "versus", "via", "with", "within", "without"];
var lastList,textInput,myScroll,loadList,count;
var $win,$doc,$list;

$(document).ready(function () {
    $list= $('li');
    textInput = $('#textInput');
    loadList = $('#listLoad');
    $win=$(window);
    $doc=$(document);
    $('textarea').keyup(function () {
        if ($(this).val()) {
            $('#convert').removeAttr('disabled');
        } else {
            $('#convert').attr('disabled', 'disabled');
        }
    });

    $('#convert').click(function () {
        if (textInput.height() > 350) {
            $('#textBox').fadeOut('fast');
        } else {
            $('#textBox').slideUp('fast');
        }
        loadList.show();
        count = 0;
        h = 0;
        j = 0;
        // default number of search images to be loaded at first
        startNum = 10;
        //constantV is assigned to calNum to load given number consistant images after each scroll
        calNum = startNum;
        link.length = 0;
        link2.length = 0;
        $('#what').empty();
        $('#showIt').remove();
        $('.onlyText').remove();
        userInput = $('textarea[name=texthere]').val();
        cleanSent = userInput.replace(/\s+/g, ' ');
        search = cleanSent.split(" ");
        callAjax(search[j]);
    });

    $('#roundB').click(function () {
        //display textBox at the middle of screen.
        $('#textBox').css('position', 'absolute');
        $('#textInput').css({
            'top': '11%',
            'left': '9%',
            'width': '80%',
            'height': '150%'
        });
        $('#convert').css({
            'top': '165%'
        });
        $('#textBox').fadeIn();
    });

    $("#loadme").click(function () {
        if (j < search.length) {
            h = 0;
            //To reuse same Array link2 
            link2.length = 0;
            //load number of images after each scroll
            constantV = 5;
            //reintalize the calNum to display given constant number of images accross the screen
            calNum += constantV;
            callAjax(search[j]);
        }
    });

    $win.resize(function () {
        // load the rest of screen if the user reduce the zoom less than 100%      
        if (lastList.offset().top < $win.height() && myScroll === 1) {
            myScroll = 1;
            $win.scroll();
        }
    });

    $win.scroll(function () {
        if ($win.scrollTop() + $win.height() > $doc.height() - $doc.height() / 4 && myScroll === 1 && j < search.length) {
            h = 0;
            //To reuse same Array link2 
            link2.length = 0;
            //load number of images after each scroll
            constantV = 5;
            //reintalize the calNum to display given constant number of images accross the screen
            calNum += constantV;
            callAjax(search[j]);
            myScroll = 0;
        }else if(j===search.length){
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
    var look = new URL('https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' + index + '&callback=?');
    $.ajax({
        url: look,
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
        for (i; i < j; i++) {
            // $('#what').append( 'firstIvalue: ' + i);
            //indexOf(search[j]) returns -1 if the value is not present inside array search[j];
            //check if search[j] is not the first html list element 
            if (filterWords.indexOf(search[i]) !== -1 && $list.length > 0) {
                $('.withPic').last().append('<p class=onlyText>' + search[i] + '</p>');
            } else {
                $('#display ul').append('<li id="showIt">' + '<figure>' + '<img src="' + link[i] + '" height=180 width=180>' +
                    '<figcaption>' + '<p class=withPic>' + search[i] + '</p>' + '</figcaption>' + '</figure>' + '</li>');
            }
        }
        
        lastList = $('li:last').attr('id', 'showIt');
        
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
                $('#display ul').append('<li id="showIt">' + '<figure>' + '<img src="' + link2[k] + '" height=180 width=180>' +
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


