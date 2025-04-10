$(document).ready(function(){
    $(window).on('resize orientationchange', function(){
        signMotion();
        filterClone();
        listGrid();
    });
    hrollClone();
    panelActive('header div:last-of-type > ul li');
    panelActive('.wishContainer .haveList input[type="button"]');
    panelToggle('.listContainer input[type="button"]');
    panelToggle('.listContainer #sortBar > div > button:first-of-type');
    miniNav();
    calculator();
    mSlider('.mainSlider');
    tickerSlider();
    detailTumbSlider();
    detailNav();
    dragUi('.thumbPager');
    dragUi('[id^="fs_"] > ul');
    dragUi('#colorArea > ul');
    dragUi('.reView > ul');
    dragUi('.detailContainer .miniNavWrapper > ol');
    dragUi('.sideNav > ul');
    heartToggle();
    signMotion();
    pwVisible(".signContainer .toggleVisible");
    pwVisible(".myContainer .toggleVisible");
    pwVisible(".myContainer .currentVisible");
    pwVisible(".myContainer .newVisible");
    pwVisible(".myContainer .confirmVisible");
    popUpActive();
    deleteListBtn();
    numberOnly();
    inputValid();
    storeInfo();
    topScroll();
    customRe();
    $("#sofaTab > li:first-of-type").trigger("click");
    updateTabInfo();
    tabBtn('#filtersPanel > ul b','#filtersPanel > ul > li > ol');
    tabBtn('.faqContainer > div > ul > li','.faqContainer > div > ul > li > p');
    tabBtn('header nav > ul u','header nav > ul > li > ol');
    tabBtn('header .mui','header nav');
    tabBtn('footer > div:last-of-type > h3:first-child','footer > div:last-of-type > ol:nth-child(2)');
    tabBtn('footer > div:last-of-type > h3:nth-child(3)','footer > div:last-of-type > ol:last-child');
    activeDeactive();
    listHover();
    listGrid();
    filterClone('#sortBar > div > button.utRr14', '#filtersPanel');
    filterClone('#sortBar > div > span.utMm14', '#filtersPanel');
    filterClone('#sortBar > div > div:last-of-type', '#filtersPanel');
    selectBox();
    request();
    historyBack();

});

function hrollClone(){
    $('.hRollBan > li').clone().appendTo('.hRollBan');
}

function panelToggle(targetA){
    $(targetA).click(function(){
        var panelBtn = "#" + $(this).attr("data-panel");
        $(panelBtn).addClass("active")

        if($(this).hasClass("active")){
            $(panelBtn).removeClass("active");
            $(this).removeClass("active");
        }else{
            $(panelBtn).addClass("active");
            $(this).addClass("active");
        }
    });
}

function panelActive(targetB){
    $(targetB).click(function(){
        var panelBtn = "#" + $(this).attr("data-panel");
        $(panelBtn).addClass("active")
    });

    $('#searchPanel button').click(function(){
        $("#searchPanel").removeClass("active")
    });

    $('#cartPanel .closedBtn, .emptyBtn').click(function(){
        $("#cartPanel").removeClass("active");
    });

    $('#view > div:last-of-type button.circleBtnB').click(function(){
        $('#cartPanel').addClass('active');
    });
}

function miniNav(){
    $('header .accountNav').click(function(){
        $('header > div:last-child > ul').addClass("active");
    });
    $('header > div:last-child > ul > li:last-of-type').click(function(){
        $('header > div:last-child > ul').removeClass("active");
    });
}

function activeDeactive(){
    var targetC = {
        '.mui' : ['header div:last-of-type > ul', '#cartPanel', '#searchPanel'],
        '.accountNav': ['header .mui', 'header nav', '#cartPanel', '#searchPanel'],
        'header div:last-of-type > ul li:first-of-type': ['header div:last-of-type > ul', 'header .mui', 'header nav', '#cartPanel'],
        'header div:last-of-type > ul li:nth-of-type(4)': ['header div:last-of-type > ul', 'header .mui', 'header nav', '#searchPanel']
    }
    $.each(targetC, function(selector, targets) {
        $(selector).click(function() {
            $(targets.join(', ')).removeClass('active');
        });
    });
}

function calculator(){
    function updateTotalPrice(){
        var total = 0;
    
        $('.haveCart li').each(function(){
            var priceText = $(this).find('dd.utBd18').text().replace('$', '').replace(',', '');
            var itemPrice = parseFloat(priceText);
            var currentNumb = parseInt($(this).find('.qtyComponent span').text());
            total += itemPrice * currentNumb;
        });
    
        $('#cartPanel h3 strong').text('$' + total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        
    }

    $('.qtyAdd, .qtyRemove').click(function(){
        var span = $(this).siblings('span');
        var currentNumb = parseInt(span.text());

        if($(this).hasClass('qtyAdd')){
            if(currentNumb < 99){
                currentNumb++;
            }
        }else if($(this).hasClass('qtyRemove')){
            if(currentNumb > 1){
                currentNumb--;
            }
        }

        span.text(currentNumb);
        updateTotalPrice();
    });

    $('.haveCart input[value="delete"]').click(function(){
        $(this).closest('li').remove();

        if($('.haveCart li').length === 0){
            $('.emptyCart, .emptyBtn').addClass('active');
            $('.haveBtn').addClass('active');
        }

        updateTotalPrice()
    });

}

function mSlider(target){
    $(target).bxSlider({
        mode: 'horizontal',
        moveSlides: 1,
        slideMargin: 10,
        infiniteLoop: true,
        slideWidth: 400,
        minSlides: 1,
        maxSlides: 4,
        speed: 800,
        pager: false,
        captions: true,
        adaptiveHeight: true,
    });
}

function tickerSlider(){
    $(".mainTicker").bxSlider({
        ticker: true,
        tickerHover: true,
        speed: 100000,
        slideWidth: 230,
        maxSlides: 10
    });
}

function detailTumbSlider(){
    var slider = $('.detailSlider').bxSlider({
        mode: 'horizontal',
        // infiniteLoop: false,
        speed: 750,
        adaptiveHeight: true,
        adaptiveHeightSpeed: 500,
        easing: 'ease-in-out',
        captions: true,
        pagerCustom: '.thumbPager',
    });

    var slideLength = $('.detailSlider').children("li").length;
    for(var i = 0; i < slideLength-2; i++){
        var imgSrc = $('.detailSlider').children("li").eq(i+1).find("img").attr("src");
        $(".thumbPager").append("<li><a data-slide-index='" + i + "'><img src='" + imgSrc + "' alt='slide" + (i + 1) + "'></a></li>");
    }
    
    var currentSlide = 0;

    $(".thumbPager li").on("click touchend", function(){
        var index = $(this).index();
        slider.goToSlide(index);
        $(".thumbPager li").removeClass("active");
        $(this).addClass("active");
        scrollToThumbnail();
    });
    $(".thumbPager li:first-of-type").addClass("active");

    $(".bx-prev, .bx-next").on("click touchend", function(){
        currentSlide = slider.getCurrentSlide();

        $(".thumbPager li").removeClass("active");
        $(".thumbPager li").eq(currentSlide).addClass("active");
        scrollToThumbnail(currentSlide);
    });

    // function scrollToThumbnail(){
    //     var $thumbPager = $(".thumbPager");
    //     var activeThumb = $(".thumbPager li.active");
    //     var activeThumbOffset = activeThumb.position().left;
    //     var maxScrollLeft = $thumbPager[0].scrollWidth - $thumbPager[0].clientWidth;
    //     var currentScrollLeft = $thumbPager.scrollLeft();

    //     if(currentScrollLeft >= maxScrollLeft && activeThumb.is(":first-child")){
    //         $thumbPager.stop().animate({ scrollLeft: 0 }, 300);
    //     }else{
    //         $thumbPager.stop().animate({ scrollLeft: Math.min(activeThumbOffset, maxScrollLeft) }, 300);
    //     }
    // }

    function scrollToThumbnail(currentSlide){
        var $thumbPager = $(".thumbPager");
        var maxScrollLeft = $thumbPager[0].scrollWidth - $thumbPager[0].clientWidth;
        var thumbPagerLength = $thumbPager.children("li").length;

        if(window.matchMedia('(min-width:1280px)').matches){
            if(currentSlide >= 7){
                $thumbPager.animate({ scrollLeft: maxScrollLeft }, 300);
            }else{
                $thumbPager.animate({ scrollLeft: 0 }, 300);
            }
        }else if(window.matchMedia('(min-width:768px) and (max-width:1279px)').matches){
            if(currentSlide >= 6 && currentSlide < (thumbPagerLength / 2 + 1)){
                var midScroll = (maxScrollLeft / 2);
                $thumbPager.animate({ scrollLeft: midScroll }, 300);
            }else if(currentSlide >= (thumbPagerLength / 2 + 1)){
                $thumbPager.animate({ scrollLeft: maxScrollLeft }, 300);
            }else{
                $thumbPager.animate({ scrollLeft: 0 }, 300);
            }
        }else if(window.matchMedia('(max-width: 767px)').matches){
            var maxScrollLeft = $thumbPager[0].scrollWidth - $thumbPager[0].clientWidth;
            var sectionWidth = maxScrollLeft / Math.ceil(thumbPagerLength / 5);
        
            if(currentSlide >= 4 && currentSlide < (thumbPagerLength / 5 + 1)){
                var SectionScroll1 = sectionWidth; 
                $thumbPager.animate({ scrollLeft: SectionScroll1 }, 300);
            }else if(currentSlide >= (thumbPagerLength / 5 + 1) && currentSlide < (thumbPagerLength / 5 * 2 + 1)){
                var SectionScroll2 = sectionWidth * 2;
                $thumbPager.animate({ scrollLeft: SectionScroll2 }, 300);
            }else if(currentSlide >= (thumbPagerLength / 5 * 2 + 1) && currentSlide < (thumbPagerLength / 5 * 3 + 1)){
                var SectionScroll3 = sectionWidth * 3;
                $thumbPager.animate({ scrollLeft: SectionScroll3 }, 300);
            }else if(currentSlide >= (thumbPagerLength / 5 * 3 + 1) && currentSlide < (thumbPagerLength / 5 * 4 + 1)){
                var SectionScroll4 = sectionWidth * 4;
                $thumbPager.animate({ scrollLeft: SectionScroll4 }, 300);
            }else if(currentSlide >= (thumbPagerLength / 5 * 4 + 1) && currentSlide < (thumbPagerLength / 5 * 5 + 1)){
                var SectionScroll5 = sectionWidth * 5;
                $thumbPager.animate({ scrollLeft: SectionScroll5 }, 300);
            }else{
                $thumbPager.animate({ scrollLeft: 0 }, 300);
            }
        }
    }
}

function dragUi(yScroll){
    var isDragging = false;
    var startX = 0;
    var scrollLeft = 0;

    $(yScroll).on("mousedown", function(e){
        isDragging = true;
        startX = e.pageX - $(this).offset().left;
        scrollLeft = $(this).scrollLeft();
        $(this).css("cursor", "grabbing");
    });

    $(document).on("mousemove", function(e){
        if (!isDragging) return;
        var x = e.pageX - $(yScroll).offset().left;
        var walk = (x - startX) * 1;
        $(yScroll).scrollLeft(scrollLeft - walk);
    });

    $(document).on("mouseup", function(){
        isDragging = false;
        $(yScroll).css("cursor", "grab");
    });
}
/* slider */
function heartToggle(){
    $(".addToWish").click(function(){
        $(this).toggleClass("on");
        $(this).val($(this).hasClass("on") ? "ON" : "OFF");
    });
}

function signMotion(){
    var stopinforgotPw = true; 

    if(window.matchMedia('(min-width:1280px)').matches){
        $('.signUpBtn, .logInBtn').click(function(){
            if(stopinforgotPw){
                switch(stopinforgotPw){
                    case $(this).is('.signUpBtn'):
                        $('.moveAside').removeClass('active');
                        $('.signIn').removeClass('active');
                        $('.signUp').removeClass('active');
                        break;
                    case $(this).is('.logInBtn'):
                        $('.moveAside').addClass('active');
                        $('.signIn').addClass('active');
                        $('.signUp').addClass('active');
                        break;
                }
            }
        });
        $('.signIn .forgotBtn').click(function(){
            $('.forgotPw').addClass('active');
            stopinforgotPw = false;
        });
        $('.signIn .forgotPw .backLog').click(function(){
            $('.forgotPw').removeClass('active');
            stopinforgotPw = true;
        });
    }else if(window.matchMedia('(max-width:1279px)').matches){
        $('.signUpBtn, .logInBtn').click(function(){
            if(stopinforgotPw){
                switch(stopinforgotPw){
                    case $(this).is('.signUpBtn'):
                        $('.moveAside').removeClass('active');
                        $('.signIn').removeClass('active');
                        $('.signUp').removeClass('active')
                        break;
                    case $(this).is('.logInBtn'):
                        $('.moveAside').addClass('active');
                        $('.signIn').addClass('active');
                        $('.signUp').addClass('active');
                        break;
                }
            }
        });
        $('.signIn .forgotBtn').click(function(){
            $('.forgotPw').addClass('active');
            $('.signContainer .signIn fieldset').addClass('active');
            stopinforgotPw = false;
        });
        $('.signIn .forgotPw .backLog, .signContainer #sendPopups .okBtn').click(function(){
            $('.forgotPw').removeClass('active');
            $('.signContainer .signIn fieldset').removeClass('active');
            stopinforgotPw = true;
        });
    }
}

function pwVisible(visibleToggle){
    var pwStatus = false;
    $(visibleToggle).click(function(){
        var $pwTarget = $(this);
        var $input = $pwTarget.siblings("input[type='password'], input[type='text']");

        if(pwStatus == false){
            $pwTarget.addClass("active");
            $input.attr("type", "text");
        }else{
            $pwTarget.removeClass("active");
            $input.attr("type", "password");
        }
        pwStatus = !pwStatus;
    });
}

function popUpActive(){
    $('.popUpBtn').click(function(){
        var popUpBtn = "#" + $(this).attr("data-popup");
        $(popUpBtn).addClass("active");
    });

    $('.closeBtn').click(function(){
        $("[id$='Popups'], [id$='Popup'], #introPop").removeClass("active");
        $("div:has(#introPop)").addClass("active");
    });

    $("input[value='Close']").click(function(){
        $("#reRequest").removeClass("active");
    });
}

function deleteListBtn(){
    $('.popUpBtn').click(function(){
        var $itemToDelete = $(this).closest('li');

        $('#deletePopup .okBtn').click(function(){
            if($itemToDelete){
                $itemToDelete.remove();
                if($('.haveList ul li').length === 0){
                    $('.emptyList').addClass('active');
                    $('.haveList').removeClass('active');
                }
                $('#deletePopup').removeClass('active');
            }
        });
    });
}

function numberOnly(){
    $(".numberOnly").on("keyup",function(){
        $(this).val($(this).val().replace(/[^0-9]/g,""));
    });
}

function inputValid(){
    var currentPage = null;
    var currentForm = null;

    $('.signContainer li > span').addClass('active');

    $('.signBtn, .popUpBtn, input[value="Pay Now"], input[value="Order Now"], input[value="SAVE"]').click(function(e){
        e.preventDefault();
        var valid = true;

        currentForm = $(this).closest('fieldset');
        currentForm.find('input[required]').each(function(){
            var $input = $(this);
            var errorMessage = $input.siblings('.signContainer li > span');
            if($input.is(':invalid')){
                valid = false;
                $input.addClass('user-invalid');
                errorMessage.removeClass('active');
            }else{
                $input.removeClass('user-invalid');
                errorMessage.addClass('active');
            }
        });
        if(valid){
            var popupId = $(this).attr('data-popup');
            $('#' + popupId).addClass('active');
        }
    });
    $('.okBtn').click(function(){
        $('#sendPopups, #thankPopups').removeClass('active');
        $(currentPage).addClass('active');
        $('.forgotPw').removeClass('active');
        $('.signContainer .signIn > fieldset').removeClass('active');
    });
}

function storeInfo(){
    $('#map a').click(function(){
        var areaFS = "#" + $(this).attr("data-area");
        var firstLiBtn = $(areaFS).find('ul li:first-child input[type="button"]');
        var firstId1 = "#" + firstLiBtn.attr("data-map");
        
        $('[id^="fs_"]').removeClass("active");
        $(areaFS).addClass("active");
        
        $('#map a').removeClass("active");
        $(this).addClass("active");

        firstLiBtn.addClass("active");
        
        $('[id^="f_"]').removeClass("active");
        $(firstId1).addClass("active");
    });

    $('.storeContainer div ul li input[type="button"]').click(function(){
        var areaBtn = "#" + $(this).attr("data-map");
        $('[id^="f_"]').removeClass("active");
        $(areaBtn).addClass("active");
        
        $('input[type="button"]').removeClass("active");
        $(this).addClass("active");
    });
}

function topScroll(){
    var offset = $("[class$='Container']").offset();
    $('input[value="top"]').click(function(){
        $('html, body').animate({scrollTop: offset.top}, '500');
    });
}

function customRe(){
    $("#productArea > ul > li").click(function(){
        var categoryLi = "#" + $(this).attr("data-tab");
        var tabFirstLi = $(categoryLi + " > li:first-of-type");

        $("#productArea > ul > li").removeClass("active");
        $(this).addClass("active");
        $("[id$='Tab']").removeClass("active");
        $(categoryLi).addClass("active");

        tabFirstLi.addClass("active");
        updateTabInfo(tabFirstLi.text());
        if($(tabFirstLi).hasClass("active")){
            $("[id$='Tab'] > li:not(:first-of-type)").removeClass("active");
        }

        if(categoryLi === "#sofaTab"){
            $("#sofaTab > li:first-of-type").trigger("click");
        }else if(categoryLi === "#seatingTab"){
            $("#seatingTab > li:first-of-type").trigger("click");
        }else if(categoryLi === "#storageTab"){
            $("#storageTab > li:first-of-type").trigger("click");
        }

        if(categoryLi === "#sofaTab" || categoryLi === "#seatingTab"){
            $("#texArea > .leather, #texArea > .fabric").addClass("active");
            $("#texArea > .wood").removeClass("active");
        }else if(categoryLi === "#storageTab"){
            $("#texArea > .wood").addClass("active");
            $("#texArea > .leather, #texArea > .fabric").removeClass("active");
        }
        $("#texArea > li > ol > li, #colorArea, #colorArea > ul > li, .customContainer > div:last-child").removeClass("active");
    });
    $("[id$='Tab'] > li").click(function(){
        var proName = $(this).text();

        $("[id$='Tab'] > li").removeClass("active");
        $(this).addClass("active");

        updateTabInfo(proName);
        $("#texArea > li > ol > li, #colorArea, #colorArea > ul > li, .customContainer > div:last-child").removeClass("active");
    });
    $("#texArea > li > ol > li").click(function(){
        var texType = $(this).find("img").attr("alt");
        var proName = $("[id$='Tab'] > li.active").text();
        var texImg = "custom_" + proName + "_" + texType + ".png";

        $("#texArea > li > ol > li").removeClass("active");
        $(this).addClass("active");

        if($(this).parents('li').hasClass('wood')){
            $("#colorArea").removeClass("active");
            $("#colorArea > ul > li").removeClass("active");
            $(".customContainer > div:last-child").addClass("active");
        } 
        else if($(this).parents('li').hasClass('leather') || $(this).parents('li').hasClass('fabric')){
            $("#colorArea").addClass("active");
            $(".customContainer > div:last-child").removeClass("active");
        }

        updateTabInfo(proName);

        $("#productImg img").attr("src", "images/" + texImg).attr("alt", proName);
        
        $('html, body').animate({
            scrollTop: $(".customContainer > div:nth-child(2)").offset().top-50}, 10);

    });
    $("#colorArea > ul > li").click(function(){
        var texType = $("#texArea > li > ol > li.active").find("img").attr("alt"); 
        var proName = $("[id$='Tab'] > li.active").text();
        var colorChoice = $(this).find("img").attr("alt");
        var texImg = "custom_" + proName + "_" + texType + "_" + colorChoice + ".png";

        $("#colorArea > ul > li").removeClass("active");
        $(this).addClass("active");
        $(".customContainer > div:last-child").addClass("active");

        updateTabInfo(proName);
        
        $("#productImg img").attr("src", "images/" + texImg).attr("alt", proName);

        $('html, body').animate({
            scrollTop: $(".customContainer > div:nth-child(2)").offset().top-50}, 10);
    });
}

var proData = {
    "Liliana Leather Small Sofa": {specs: [71, 37, 35]},
    "Jaden Right Chaise Sectional": {specs: [120.25, 64, 36]},
    "Celeste Flip Chaise Sectional": {specs: [93, 64, 29]},
    "Harlan Power Reclining Sofa": {specs: [90, 39.37, 29.53]},
    "Voss Leather Power Reclining Sectional": {specs: [116, 116, 39]},
    "Olivia Sofa": {specs: [89, 38, 30] },
    "Braxten Leather Right Chaise Sectional": {specs: [116, 69, 32.25]},
    "Braxten Leather Sofa": {specs: [89.25, 40.5, 32.25]},
    "Voss Power Reclining Sofa": {specs: [87, 43, 39]},
    "Ingrid Left Sectional": {specs: [118, 118, 30]},
    "Maeve Sofa": {specs: [90, 40, 28]},
    "Hugo Right Sectional": {specs: [117, 110, 26]},
    "Taylor Sofa": {specs: [94, 39, 32]},
    "Liliana Leather Chair": {specs: [38, 37, 35]},
    "Celeste Chair": {specs: [40, 38, 29]},
    "Harlan Power Recliner": {specs: [76.5, 42, 30.5]},
    "Voss Power Recliner": {specs: [40, 43, 39]},
    "Rylee Ottoman": {specs: [42, 42, 16]},
    "Braxten Leather Chair": {specs: [42.5, 40.5, 30.25]},
    "Maeve Armchair": {specs: [43, 40, 28]},
    "Taylor Chair": {specs: [45, 39, 32]},
    "Gino Leather Chair - Olive": {specs: [31, 39, 32]},
    "Wynne Swivel Chair": {specs: [34, 33, 29]},
    "Omri Swivel Chair": {specs: [37, 37, 29]},
    "Rost Swivel Chair": {specs: [38, 38, 34]},
    "Torben Recliner": {specs: [29.5, 29.1, 38.9]},
    "Thisted Sideboard": {specs: [57, 17, 34.6]},
    "Randers Sideboard - Walnut": {specs: [71, 18.5, 31.50]}
};

function updateTabInfo(proName){
    if (proData[proName] && proData[proName].specs){
        var proSpecs = proData[proName].specs; 
        var imgName = "custom_" + proName + ".png";

        $("#specs > li").eq(0).find("small").text(proSpecs[0]); 
        $("#specs > li").eq(1).find("small").text(proSpecs[1]);
        $("#specs > li").eq(2).find("small").text(proSpecs[2]);

        $("#productImg img").attr("src", "images/" + imgName).attr("alt", proName);

    }
}
/* customOrder */
function onlyClass(){
    $("header nav > ul > li").click(function(){
        $(this).toggleClass('active');
    });
}

function tabBtn(targetTab, tabInfo){
    $(targetTab).click(function(){
        var $tabInfo = $(this).siblings(tabInfo);

        if($(this).hasClass("active")){
            $($tabInfo).removeClass("active");
            $(this).removeClass("active");
        }else{
            $($tabInfo).addClass("active");
            $(this).addClass("active");
        }
    });
}

function listGrid(){
    if(window.matchMedia('(min-width:1024px)').matches){
        $('.way1').on('click').addClass('active');
        $('.secondGrid').attr('class', 'thirdGrid');
        $('.oneGrid').attr('class', 'thirdGrid');
        $('.way2').off('click').removeClass('active');

        $('.way1').click(function(){
            $(this).addClass('active');
            $('.way2').removeClass('active');
            $('.secondGrid').attr('class', 'thirdGrid');
        });
        $('.way2').click(function(){
            $(this).addClass('active');
            $('.way1').removeClass('active');
            $('.thirdGrid').attr('class','secondGrid');
        });
    }else if(window.matchMedia('(min-width:768px) and (max-width:1023px)').matches){
        $('.way1').off('click').removeClass('active');

        $('.way2').addClass('active');
        $('.way1').removeClass('active');
        $('.thirdGrid').attr('class', 'secondGrid');
        $('.oneGrid').attr('class', 'secondGrid');
    }else if(window.matchMedia('(max-width:767px)').matches){

        $('.thirdGrid').attr('class', 'oneGrid');
        $('.secondGrid').attr('class', 'oneGrid');
    }
}

function listHover(){
    $('.listContainer > ul > li').hover(function(){
        $(this).removeClass('active');

        var originSrc = $(this).find('img:first').attr('src');
        var originAlt = $(this).find('img:first').attr('alt');
        var hoverImg = originSrc.replace('.jpg', '_hover.jpg');

        $(this).find('img:first').attr("src", hoverImg).attr("alt", originAlt);
    },function(){
        var originSrc = $(this).find('img:first').attr('src').replace('_hover.jpg', '.jpg');
        var originAlt = $(this).find('img:first').attr('alt');
        
        $(this).find('img:first').attr("src", originSrc).attr("alt", originAlt);
    });
    // listHover
    $('.listContainer .closeBtn').click(function(){
        var $li = $(this).closest('li');
        var originSrc = $li.find('img:first').attr('src').replace('_hover.jpg', '.jpg');
        var originAlt = $li.find('img:first').attr('alt');
        
        $li.find('img:first').attr("src", originSrc).attr("alt", originAlt);
        $li.addClass('active');
    });

    listGrid();
}

function filterClone(targetTag, targetArea){
    if(window.matchMedia('(max-width: 767px)').matches && targetTag && targetArea){
        $(targetTag).clone().appendTo(targetArea);
    }
}

function selectBox(){
    $('#sortBar span.utMm14 > span, .selectRequest > span').click(function(){
        $('.selectBox, .selectRequest > ol').toggle();
    });
    
    $('.selectBox li, .selectRequest > ol > li').click(function(){
        var selectText = $(this).text();

        $('.selectBox li, .selectRequest > ol > li').removeClass('active');
        $(this).addClass('active');
        $('#sortBar span.utMm14 > span, .selectRequest > span').text(selectText);
        $('.selectBox, .selectRequest > ol').hide();
    });
}

function detailNav(){
    var miniNav = $(".detailContainer ol.utMm18").wrap("<div class='miniNavWrapper'></div>");
    var navLine = $("<span id='navLine'></span>").appendTo(".detailContainer .miniNavWrapper");

    function updateNavLine(item){
        var parent = item.closest('li');
        if(parent.length){ 
            var leftPos = parent.position().left;
            var width = parent.outerWidth();
            navLine.css({
                "transform": `translateX(${leftPos}px)`,
                "width": `${width}px` 
            });
        }
    }
    updateNavLine($(".detailContainer ol.utMm18 > li.active a"));
    $(".detailContainer ol.utMm18 > li").hover(
        function(){
            var link = $(this).find("> a");
            updateNavLine(link);
        },
        function(){
            updateNavLine($(".detailContainer ol.utMm18 > li.active a"));
        }
    );
}

function request(){
    $("input[value='YES']").click(function(){
        $("#requestPopup").removeClass("active");
        $("li:nth-of-type(2) > strong").text("Request");
        $("input[type='button'][value='Return Request']").css("display", "none");
        $("#reRequest").removeClass("active");
    });
}

function historyBack(){
    $("a.utMm16").click(function(){
        history.back(1);
    });
}