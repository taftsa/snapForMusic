//Calculate Credits
function calculate()	{
	var semesters = $('.semesterList');
	var totalCredits = 0;
	
	for (var o = 0; o <= 11; o++) {
		var classes = $('#' + o + ' .class .credits');
		var credits = 0;
			
		for (var i = 0; i < classes.length; i++) {
			credits += ($(classes[i]).html()/1);
			
			if ($(classes[i]).parent().hasClass('done')) {				
				totalCredits += ($(classes[i]).html()/1);
			};
		};
		
		//Sum total credits earned
		$('#semester' + o).html(credits);

		//Change Color if Overloaded
	if (o == 0 || o == 11) {
		} else if (credits > 18){
			$('#semester' + o).css('background-color', 'red');
		} else if (credits < 12) {
			$('#semester' + o).css('background-color', 'orange');
		} else if (credits < 18 && ($('#' + o).children('.pensemble').children('.credits').html() == "0" || $('#' + o).children('.sensemble').children('.credits').html() == "0")) {
			$('#semester' + o).css('background-color', 'green');
		} else {
			$('#semester' + o).css('background-color', '');
		};
	};
	
	//Change class indicator with class
	switch (true) {
		case (totalCredits < 30):
			$('#yearInSchool').html('Fr');
			break;
		case (totalCredits < 60):
			$('#yearInSchool').html('So');
			break;
		case (totalCredits < 90):
			$('#yearInSchool').html('Jr');
			break;
		default:
			$('#yearInSchool').html('Sr');
			break;
	};
	
	$('#totalCredits').html(totalCredits);
};

//Calculate Ensemble Hours
function calculateEnsembles() {
	var pensembles = $('.p');
	var sensembles = $('.s');
	
	var pensembleHours = 0;
	var sensembleHours = 0;
	
	for (var i = 0; i < pensembles.length; i++) {
		if(!$(pensembles[i]).parent().hasClass('failed') && !$(pensembles[i]).parent().hasClass('repeated')) {
			pensembleHours += ($(pensembles[i]).html()/1);
		};
		
	};
	
	for (var i = 0; i < sensembles.length; i++) {
		if(!$(sensembles[i]).parent().hasClass('failed') && !$(sensembles[i]).parent().hasClass('repeated')) {
			sensembleHours += ($(sensembles[i]).html()/1);
		};
	};
	
	$('#pensembleCount').html(pensembleHours);
	$('#sensembleCount').html(sensembleHours);
	
	//Change Color if Too Few or Too Many
	if (pensembleHours < 4) {
		$('#pensembleCount').css('background-color', 'red');
	} else if (pensembleHours > 4) {
		$('#pensembleCount').css('background-color', 'orange');
	} else {
		$('#pensembleCount').css('background-color', '');
	};
	
	if (sensembleHours < 2) {
		$('#sensembleCount').css('background-color', 'red');
	} else if (sensembleHours > 2) {
		$('#sensembleCount').css('background-color', 'orange');
	} else {
		$('#sensembleCount').css('background-color', '');
	};
};

//On Ready
$(document).on('ready', function(){
	calculate();
	calculateEnsembles();
	makeSortable();
});

//Designate Specific Years
$(document).on('click', '.calNotDone', function() {
	var firstYear = prompt('Enter 2-digit year of first Fall.');
	
	if (firstYear != null) {
		$(this).removeClass('calNotDone');
		$(this).empty();
		
		$('.year').each(function(i){
			$(this).html("'" + Math.ceil((firstYear / 1) + (0.5 * i)));
		});
	};
});

//Designate Name
$(document).on('click', '#submitName', function() {
	var name = document.getElementById('name').value;
	
	if (name != '') {		
		$('#allSemestersAndRequirements').append('<div id="nameWatermark">' + name + '</div>');
		$('#nameBlock').empty();
	};
});

//Check for *Completed* Ensemble Credits
function checkEnsembles() {
	var pensemblesDone = 0;

	$('.pensemble.done').each(function(){
		pensemblesDone += ($(this).children('.credits').html()/1);
	});
	
	if (pensemblesDone >= 4) {
		$('#pensembles').addClass('done');
	} else {
		$('#pensembles').removeClass('done');
	};
	
	var sensemblesDone = 0;
	
	$('.sensemble.done').each(function(){
		sensemblesDone += ($(this).children('.credits').html()/1);
	});
	
	if (sensemblesDone >= 2) {
		$('#sensembles').css('background-color', 'lightgreen');
	} else {
		$('#sensembles').css('background-color', '');
	};
};

//Check SLO and CMP Completion
function checkSLOs() {
	//Start with all 10 SLOs (including 3, which won't get added unless everything is done which would be fine
	for (var i = 0; i <= 10; i++) {
		sloDone = true;
		$('.slo' + i).each(function(){
			if (!$(this).hasClass('done')) {
				sloDone = false;
			};
		});
		
		if (sloDone) {
			$('#SLO' + i).addClass('done');
		} else {
			$('#SLO' + i).removeClass('done');
		};
	};
	
	
	//Calculate SLO 3, and remove "done" if somehow it got added earlier without hitting 3 credits
	var slo3Credits = 0;
	$('.slo3').each(function(){
		if ($(this).hasClass('done')) {
			slo3Credits += ($(this).children('.credits').html()/1);
		};
	});
	
	if (slo3Credits >= 3) {
		$('#SLO3').addClass('done');
	} else {
		$('#SLO3').removeClass('done');
	};
	
	//Check CMP 1 and 2
	var cmp12Done = true;
	$('.cmp12').each(function(){
		if (!$(this).hasClass('done')) {
			cmp12Done = false;
		};
	});
	
	if (cmp12Done) {
		$('#CMP12').addClass('done');
	} else {
		$('#CMP12').removeClass('done');
	};
	
	//Calculate CMP 3
	var cmp3Credits = 0;
	$('.cmp3').each(function(){
		if ($(this).hasClass('done')) {
			cmp3Credits += ($(this).children('.credits').html()/1);
		};
	});
	
	if (cmp3Credits >= 9) {
		$('#CMP3').addClass('done');
	} else {
		$('#CMP3').removeClass('done');
	};
};

//Change Ensemble Credits
$(document).on('click', '.ensemble', function(e) {
	e.stopPropagation();
	if ($(this).html() == '1') {
		$(this).html('0');
	} else {
		$(this).html('1');
	};
	
	calculate();
	calculateEnsembles();
	checkEnsembles();
	checkSLOs();
});

//Change CMP2 Class
$(document).on('click', '#cmp2Code', function(e) {
	e.stopPropagation();
	
	if ($(this).html() == 'ID 150') {
		$(this).html('ID 201');
		$(this).next().html('Transition Success');
		$(this).parent().children('.courseTime').remove();
		$(this).parent().append('<div class="summer badge">&#10039;</div><div class="online badge">&#128435;</div>');
		$(this).parent().addClass('summerClass');
	} else {
		$(this).html('ID 150');
		$(this).next().html('Academic Inquiry');
		$(this).parent().children('.summer.badge').remove();
		$(this).parent().children('.online.badge').remove();
		$(this).parent().append('<div class="courseTime">1p MWF</div>');
		$(this).parent().removeClass('summerClass');
	};
});

//Change Class Status
$(document).on('click', '.notDone', function() {
	var allowRegistration = true;
	
	//Check for prerequisites before registration (not all are included)
	
	//JQE required before advanced lessons
	if ($(this).children('.badge').hasClass('jqe') && !$('#jqe').hasClass('done')) {
		alert ('JQE must be completed before registering for this class.');
		allowRegistration = false;
	};
	
	//60 credits required before ID 301
	if ($(this).attr('id') == 'id301' && $('#totalCredits').html() < 60) {
		alert ('60 credits required before registering for this class.');
		allowRegistration = false;
	};
	
	//SLO1 required before ID 301
	if ($(this).attr('id') == 'id301' && !$('#SLO1').hasClass('done')) {
		alert ('SLO 1 required before registering for this class.');
		allowRegistration = false;
	};
	
	//Confirm JQE prerequisites (not automatic)
	if ($(this).children('.bigBadge').hasClass('jqe') && !$('#jqe').hasClass('done') && !confirm('Has student completed Theory and Aural Skills sequence and 4 semesters of lessons?')) {
		allowRegistration = false;
	};
	
	if (allowRegistration) {
		$(this).removeClass('notDone');
	
			if ($(this).hasClass('requirement')) {
				$(this).addClass('done');
			} else {		
				$(this).addClass('registered');
			};
	};
});

$(document).on('click', '.registered', function() {
	$(this).removeClass('registered');
	$(this).addClass('done');
	
	checkEnsembles();
	checkSLOs();
	calculate();
});

$(document).on('click', '.done', function() {
	if ($(this).hasClass('requirement')) {
		$(this).removeClass('done');
		$(this).addClass('notDone');
	} else if ($(this).hasClass('slo') || $(this).hasClass('ensembles')) {
		
	} else {
		$(this).removeClass('done');
		$(this).addClass('failed');
		$(this).append('<div class="repeat">R</div>');
		
		calculateEnsembles();
		checkEnsembles();
		checkSLOs();
		calculate();
	};
});

$(document).on('click', '.failed', function() {
	$(this).removeClass('failed');
	$(this).addClass('notDone');
	
	$(this).find('.repeat').remove();
	
	calculateEnsembles();
});

//Repeat a Class
$(document).on('click', '.repeat', function(e) {
	alert('Student must complete Academic Forgiveness Form to remove previous grade, with a limit of 5 per career. (https://limestonecollege.formstack.com/forms/academic_forgiveness_request_form)');
	
	//Make it so that the click only counts in the .repeat bubble, not its parent(s)
	e.stopPropagation();
	
	//Check to see if the class has been repeated already and duplicate it accordingly
	if ($(this).parent().children('.badge').hasClass('repeatedClass')) {
		$(this).parent().parent().append($(this).parent().clone().removeClass('failed').addClass('notDone').addClass('tempDesignation'));
	} else {
		$(this).parent().parent().append($(this).parent().clone().append('<div class="repeatedClass badge">\uD834\uDD07</div>').removeClass('failed').addClass('notDone').addClass('tempDesignation'));
	};
	
	$('.tempDesignation').children('.repeat').remove();
	$('.tempDesignation').removeClass('tempDesignation');
	
	//Switch on the original class
	$(this).parent().removeClass('failed');
	$(this).parent().addClass('repeated');
	calculate();
	
	//Remove the Repeat button
	$(this).remove();
	
	calculateEnsembles();
});

//Highlight Ensembles on Hover
$(document).on('mouseenter', '#pensembles', function() {
	$('.p').each(function(){
		if ($(this).html() == '1') {
			$(this).parent().css('background-color', '#fcffa4');
		};
	});
});

$(document).on('mouseleave', '#pensembles', function() {
	$('.p').parent().css('background-color', '');
});

$(document).on('mouseenter', '#sensembles', function() {
	$('.s').each(function(){
		if ($(this).html() == '1') {
			$(this).parent().css('background-color', '#fcffa4');
		};
	});
});

$(document).on('mouseleave', '#sensembles', function() {
	$('.s').parent().css('background-color', '');
});

//Highlight Classes on Hover Over SLOs and CMPs
$(document).on('mouseenter', '#SLO1', function() {
	$('.slo1').css('background-color', '#fcffa4');
});

$(document).on('mouseleave', '#SLO1', function() {
	$('.slo1').css('background-color', '');
});

$(document).on('mouseenter', '#SLO2', function() {
	$('.slo2').css('background-color', '#fcffa4');
});

$(document).on('mouseleave', '#SLO2', function() {
	$('.slo2').css('background-color', '');
});

$(document).on('mouseenter', '#SLO3', function() {
	$('.slo3').css('background-color', '#fcffa4');
});

$(document).on('mouseleave', '#SLO3', function() {
	$('.slo3').css('background-color', '');
});

$(document).on('mouseenter', '#SLO4', function() {
	$('.slo4').css('background-color', '#fcffa4');
});

$(document).on('mouseleave', '#SLO4', function() {
	$('.slo4').css('background-color', '');
});

$(document).on('mouseenter', '#SLO5', function() {
	$('.slo5').css('background-color', '#fcffa4');
});

$(document).on('mouseleave', '#SLO5', function() {
	$('.slo5').css('background-color', '');
});

$(document).on('mouseenter', '#SLO6', function() {
	$('.slo6').css('background-color', '#fcffa4');
});

$(document).on('mouseleave', '#SLO6', function() {
	$('.slo6').css('background-color', '');
});

$(document).on('mouseenter', '#SLO7', function() {
	$('.slo7').css('background-color', '#fcffa4');
});

$(document).on('mouseleave', '#SLO7', function() {
	$('.slo7').css('background-color', '');
});

$(document).on('mouseenter', '#SLO8', function() {
	$('.slo8').css('background-color', '#fcffa4');
});

$(document).on('mouseleave', '#SLO8', function() {
	$('.slo8').css('background-color', '');
});

$(document).on('mouseenter', '#SLO9', function() {
	$('.slo9').css('background-color', '#fcffa4');
});

$(document).on('mouseleave', '#SLO9', function() {
	$('.slo9').css('background-color', '');
});

$(document).on('mouseenter', '#SLO10', function() {
	$('.slo10').css('background-color', '#fcffa4');
});

$(document).on('mouseleave', '#SLO10', function() {
	$('.slo10').css('background-color', '');
});

$(document).on('mouseenter', '#CMP12', function() {
	$('.cmp12').css('background-color', '#fcffa4');
});

$(document).on('mouseleave', '#CMP12', function() {
	$('.cmp12').css('background-color', '');
});

$(document).on('mouseenter', '#CMP3', function() {
	$('.cmp3').css('background-color', '#fcffa4');
});

$(document).on('mouseleave', '#CMP3', function() {
	$('.cmp3').css('background-color', '');
});


//Highlight SLOs and CMPs on Hover Over Classes
$(document).on('mouseenter', '.slo1', function() {
	$('#SLO1').css('background-color', '#fcffa4');
});

$(document).on('mouseleave', '.slo1', function() {
	$('#SLO1').css('background-color', '');
});

$(document).on('mouseenter', '.slo2', function() {
	$('#SLO2').css('background-color', '#fcffa4');
});

$(document).on('mouseleave', '.slo2', function() {
	$('#SLO2').css('background-color', '');
});

$(document).on('mouseenter', '.slo3', function() {
	$('#SLO3').css('background-color', '#fcffa4');
});

$(document).on('mouseleave', '.slo3', function() {
	$('#SLO3').css('background-color', '');
});

$(document).on('mouseenter', '.slo4', function() {
	$('#SLO4').css('background-color', '#fcffa4');
});

$(document).on('mouseleave', '.slo4', function() {
	$('#SLO4').css('background-color', '');
});

$(document).on('mouseenter', '.slo5', function() {
	$('#SLO5').css('background-color', '#fcffa4');
});

$(document).on('mouseleave', '.slo5', function() {
	$('#SLO5').css('background-color', '');
});

$(document).on('mouseenter', '.slo6', function() {
	$('#SLO6').css('background-color', '#fcffa4');
});

$(document).on('mouseleave', '.slo6', function() {
	$('#SLO6').css('background-color', '');
});

$(document).on('mouseenter', '.slo7', function() {
	$('#SLO7').css('background-color', '#fcffa4');
});

$(document).on('mouseleave', '.slo7', function() {
	$('#SLO7').css('background-color', '');
});

$(document).on('mouseenter', '.slo8', function() {
	$('#SLO8').css('background-color', '#fcffa4');
});

$(document).on('mouseleave', '.slo8', function() {
	$('#SLO8').css('background-color', '');
});

$(document).on('mouseenter', '.slo9', function() {
	$('#SLO9').css('background-color', '#fcffa4');
});

$(document).on('mouseleave', '.slo9', function() {
	$('#SLO9').css('background-color', '');
});

$(document).on('mouseenter', '.slo10', function() {
	$('#SLO10').css('background-color', '#fcffa4');
});

$(document).on('mouseleave', '.slo10', function() {
	$('#SLO10').css('background-color', '');
});

$(document).on('mouseenter', '.cmp12', function() {
	$('#CMP12').css('background-color', '#fcffa4');
});

$(document).on('mouseleave', '.cmp12', function() {
	$('#CMP12').css('background-color', '');
});

$(document).on('mouseenter', '.cmp3', function() {
	$('#CMP3').css('background-color', '#fcffa4');
});

$(document).on('mouseleave', '.cmp3', function() {
	$('#CMP3').css('background-color', '');
});

//Highlight repeated classes on mouseover
$(document).on('mouseenter', '.repeated', function(){
	var checkSame = $(this).children('.courseTitle').html();
	
	$('.class').each(function(){
		if ($(this).children('.courseTitle').html() == checkSame) {
			$(this).css('background-color', '#fcffa4');
		};			
	});
});	

$(document).on('mouseleave', '.repeated', function(){
	var checkSame = $(this).children('.courseTitle').html();
	
	$('.class').each(function(){
		if ($(this).children('.courseTitle').html() == checkSame) {
			$(this).css('background-color', '');
		};
	});
});

//Drag and Drop
function makeSortable() {
	$('.semesterList').sortable({
		connectWith: ".semesterList",
		stop: function(event,ui){calculate()},//Calculate hours every time a sort is done
		receive: function(ev, ui) {
			if(ui.item.hasClass('springClass') && ui.item.parent().hasClass('fallSem')) {
				ui.sender.sortable('cancel');
				ui.item.children('.only').fadeOut(150).fadeIn(150).fadeOut(150).fadeIn(150);
			};
			if(ui.item.hasClass('fallClass') && ui.item.parent().hasClass('springSem')) {
				ui.sender.sortable('cancel');
				ui.item.children('.only').fadeOut(150).fadeIn(150).fadeOut(150).fadeIn(150);
			};
			if(!ui.item.hasClass('summerClass') && ui.item.parent().hasClass('summerSemester')) {
				ui.sender.sortable('cancel');
			};
		},
	});
};

//Create and Download .adv File
$(document).on('click', '#save', function(){
	var fileName;
	
	if ($('#nameWatermark').length) {
		fileName = $('#nameWatermark').html();
	} else {
		fileName = prompt('File Name');
	};	
	
	if (fileName !== null) {	
		var data = 'data:text/html;charset=utf-8,' + $('body').html();
		
		var encodedUri = encodeURI(data);
		var link = document.createElement('a');
		link.setAttribute('href', encodedUri);
		link.setAttribute('download', fileName + '.adv');
		document.body.appendChild(link);

		link.click();
	};
});

//Load .adv File
$(document).on('click', '#loadAFile', function(){
	if (!window.FileReader) {
        alert('Your browser is not supported');
    };
	
	$('#fileSelect').click().change(function(){
		var input = $('#fileSelect').get(0);
		var reader = new FileReader();		
		var textFile = input.files[0];
        reader.readAsText(textFile);
        $(reader).on('load', function(e){
			var file = e.target.result,
				results;
			if (file && file.length) {
				$('body').html(file);
				makeSortable();
			};
		});
	});	
});

//Add Semesters
$(document).on('click', '#addTransfer', function(){
	if (!$('#semester0').length) {
		$('#allSemestersAndRequirements').prepend('<div class="semester" id="transferSemester">' +
						'<h2>Transfer Credit<span class= "semesterCredits" id="semester0">#</span></h2>' +
						'<div class="semesterList" id="0"></div>' +
						'</div>');
						
		makeSortable();
		calculate();
		$(this).addClass('added');
	} else if ($('#0').is(':parent')) {
		alert('Move all classes out before removing transfer semester');
	} else {
		$('#transferSemester').remove();
		$(this).removeClass('added');
	};		
});

$(document).on('click', '#addSemesterF', function(){
	//Check for years
	var fNum = 5;
	
	if ($('#lastNormalSemester').children('h2').children('.year').html()[0] == "'") {
		fNum = $('#lastNormalSemester').children('h2').children('.year').html();
	}
	
	if (!$('#semester9').length) {
		$('#lastNormalSemester').after('<div class="semester" id="extraFallSemester">' +
						'<h2><div class="fall bigBadge">&#10086;</div>Fall '+ fNum + '<span class= "semesterCredits" id="semester9">#</span></h2>' +
						'<div class="fallSem semesterList" id="9"></div>' +
						'</div>');
						
		makeSortable();
		calculate();
		$(this).addClass('added');
	} else if ($('#9').is(':parent')) {
		alert('Move all classes out before removing extra Fall semester');
	} else {
		$('#extraFallSemester').remove();
		$(this).removeClass('added');
	};		
});

$(document).on('click', '#addSemesterS', function(){
	//Check for years
	var sNum = 5;
	
	if ($('#lastNormalSemester').children('h2').children('.year').html()[0] == "'") {
		sNum = "'" + (($('#lastNormalSemester').children('h2').children('.year').html().substr(1, 2) / 1) + 1);
	}
	
	if (!$('#semester10').length) {
		if ($('#extraFallSemester').length) {
			$('#extraFallSemester').after('<div class="semester" id="extraSpringSemester">' +
				'<h2><div class="spring bigBadge">&#10048;</div>Spring ' + sNum + '<span class= "semesterCredits" id="semester10">#</span></h2>' +
				'<div class="springSem semesterList" id="10"></div>' +
				'</div>');
		} else {
			$('#lastNormalSemester').after('<div class="semester" id="extraSpringSemester">' +
				'<h2><div class="spring bigBadge">&#10048;</div>Spring '+ sNum + '<span class= "semesterCredits" id="semester10">#</span></h2>' +
				'<div class="semesterList" id="10"></div>' +
				'</div>');
		};
		
		makeSortable();
		calculate();
		
		$(this).addClass('added');
	} else if ($('#10').is(':parent')) {
		alert('Move all classes out before removing extra Spring semester');
	} else {
		$('#extraSpringSemester').remove();
		$(this).removeClass('added');
	};		
});

$(document).on('click', '#addSummers', function(){
	if (!$('#semester11').length) {
		$('#allSemestersAndRequirements').append('<div class="semester" id="summerSemesters">' +
						'<h2><div class="summer bigBadge">&#10039;</div>Summer(s)<span class= "semesterCredits" id="semester11">#</span></h2>' +
						'<div class="semesterList summerSemester" id="11"></div>' +
						'</div>');
						
		makeSortable();
		calculate();
		$(this).addClass('added');
	} else if ($('#11').is(':parent')) {
		alert('Move all classes out before removing Summers');
	} else {
		$('#summerSemesters').remove();
		$(this).removeClass('added');
	};		
});

//Add EN 100
$(document).on('click', '#en100', function(){
	if (!$(this).hasClass('added')) {
		if (confirm('Add EN 100?')) {
			$('#1').append('<div class="class notDone genEd slo1" id="en100class"><span class="courseCode">EN 100</span><span class="courseTitle">Intro. to Fr. Comp.</span><div class="credits">3</div><div class="en100 badge">\u2710</div></div>');
			$('#en100class').fadeOut(150).fadeIn(150).fadeOut(150).fadeIn(150);
			$(this).addClass('added');
			
			checkSLOs();
			calculate();
		};
	} else {
		if (confirm('Remove EN 100?')) {
			$('#en100class').remove();
			$(this).removeClass('added');
			
			checkSLOs();
			calculate();
		};
	};
});

//Add Global Experience
$(document).on('click', '#globalXP', function(){
	if (!$(this).hasClass('added')) {
		if (confirm('Add Global Experience?')) {
			$('#3').append('<div class="class notDone" id="globalXPclass"><span class="courseCode">IS 2XX</span><span class="courseTitle">Global Experience</span><div class="credits">3</div><div class="globalXP badge">\uD83D\uDDFA</div></div>');
			$('#globalXPclass').fadeOut(150).fadeIn(150).fadeOut(150).fadeIn(150);
			$(this).addClass('added');
			
			calculate();
			
			alert('Requirements: EN 102 or 103, 35 credits (16 at Limestone), age 18+, and in good academic and financial standing');
		};
	} else {
		if (confirm('Remove Global Experience?')) {
			$('#globalXPclass').remove();
			$(this).removeClass('added');
			
			calculate();
		};
	};
});

//Add CELP
$(document).on('click', '#celp', function(){
	if (!$(this).hasClass('added')) {
		if (confirm('Add CELP?')) {
			$('#3').append('<div class="celpClass class notDone fallClass"><span class="courseCode">RE 203</span><span class="courseTitle">Sp. Form. I</span><div class="credits">3</div><div class="fall only">❦</div><div class="celp badge">\u271F</div><div class="courseTime">11a TR</div></div>');
			$('#4').append('<div class="celpClass class notDone springClass"><span class="courseCode">RE 204</span><span class="courseTitle">Sp. Form. II</span><div class="credits">3</div><div class="spring only">❀</div><div class="celp badge">\u271F</div><div class="courseTime">11a TR</div></div>');
			$('#5').append('<div class="celpClass class notDone"><span class="courseCode">RE XXX</span><span class="courseTitle">Faith/Lead./Serv.</span><div class="credits">3</div><div class="celp badge">\u271F</div></div>');
			$('#6').append('<div class="celpClass class notDone"><span class="courseCode">RE XXX</span><span class="courseTitle">Faith/Lead./Serv.</span><div class="credits">3</div><div class="celp badge">\u271F</div></div>');
			$('.celpClass').fadeOut(150).fadeIn(150).fadeOut(150).fadeIn(150);
			$(this).addClass('added');
			
			calculate();
			
			alert('Requires application and other activities. Direct student to see CELP director for details.');
		};
	} else {
		if (confirm('Remove CELP?')) {
			$('.celpClass').remove();
			$(this).removeClass('added');
			
			calculate();
		};
	};
});

//Add Honors
$(document).on('click', '#honors', function(){
	if (!$(this).hasClass('added')) {
		if (confirm('Add Honors?')) {
			$('#1').append('<div class="honorsClass class notDone"><span class="courseCode">HN 102</span><span class="courseTitle">Acad. Honors Seminar</span><div class="credits">3</div><div class="honors badge">\uD83C\uDF96</div><div class="courseTime">11a MWF</div></div>');
			$('#1').append('<div class="honorsClass class notDone slo1 cmp3"><span class="courseCode">EN 103</span><span class="courseTitle">Honors Writing Seminar</span><div class="credits">3</div><div class="honors badge">\uD83C\uDF96</div><div class="fall only">❦</div><div class="courseTime">12p MWF</div></div>');
			$('#2').append('<div class="honorsClass class notDone slo1"><span class="courseCode">EN 115</span><span class="courseTitle">Adv. Pub. Speaking</span><div class="credits">3</div><div class="honors badge">\uD83C\uDF96</div><div class="spring only">❀</div><div class="courseTime">8a, 9:30a TR</div></div>');
			$('#4').append('<div class="honorsClass class notDone slo2"><span class="courseCode">EN 221</span><span class="courseTitle">Sem. in Lit. Studies</span><div class="credits">3</div><div class="honors badge">\uD83C\uDF96</div><div class="spring only">❀</div><div class="courseTime">9a, 11a MWF</div></div>');
			$('#3').append('<div class="honorsClass class notDone"><span class="courseCode">HN 295</span><span class="courseTitle">Special Topics in Honors</span><div class="credits">3</div><div class="honors badge">\uD83C\uDF96</div><div class="courseTime">12p MWF</div></div>');
			$('#4').append('<div class="honorsClass class notDone"><span class="courseCode">HN 220</span><span class="courseTitle">Honors Colloquium</span><div class="credits">1</div><div class="honors badge">\uD83C\uDF96</div><div class="courseTime">6:30p ❦W, ❀M</div></div>');
			$('#5').append('<div class="honorsClass class notDone"><span class="courseCode">HN 220</span><span class="courseTitle">Honors Colloquium</span><div class="credits">1</div><div class="honors badge">\uD83C\uDF96</div><div class="courseTime">6:30p ❦W, ❀M</div></div>');
			$('#6').append('<div class="honorsClass class notDone"><span class="courseCode">HN 220</span><span class="courseTitle">Honors Colloquium</span><div class="credits">1</div><div class="honors badge">\uD83C\uDF96</div><div class="courseTime">6:30p ❦W, ❀M</div></div>');
			$('#7').append('<div class="honorsClass class notDone"><span class="courseCode">HN 220</span><span class="courseTitle">Honors Colloquium</span><div class="credits">1</div><div class="honors badge">\uD83C\uDF96</div><div class="courseTime">6:30p ❦W, ❀M</div></div>');
			$('#5').append('<div class="honorsClass class notDone"><span class="courseCode">HN 425</span><span class="courseTitle">Honors Capstone</span><div class="credits">3</div><div class="honors badge">\uD83C\uDF96</div><div class="courseTime">12:30p TR</div></div>');
			
			$('.nonHonors').remove();
			
			$('.canBeHonors').addClass('honorsClass');
			$('.canBeHonors .credits').after('<div class="honors badge">\uD83C\uDF96</div>');
			
			$('.honorsClass').fadeOut(150).fadeIn(150).fadeOut(150).fadeIn(150);
			
			$(this).addClass('added');
			
			calculate();
			checkSLOs();
			
			alert('Requires application and other activities. Direct student to see Honors director for details.');
		};
	} else {
		if (confirm('Remove Honors?')) {
			$('#1').append('<div class="class notDone genEd slo1 cmp3 nonHonors"><span class="courseCode">EN 101</span><span class="courseTitle">Freshman Composition</span><div class="credits">3</div></div>');
			$('#1').append('<div class="class notDone genEd cmp12 nonHonors"><span class="courseCode">ID 150</span><span class="courseTitle">Academic Inquiry</span><div class="credits">3</div></div>');	
			$('#2').append('<div class="class notDone genEd slo1 cmp3 nonHonors"><span class="courseCode">EN 102</span><span class="courseTitle">Argument and Research</span><div class="credits">3</div></div>');
			$('#3').append('<div class="class notDone genEd slo1 nonHonors"><span class="courseCode">EN 105</span><span class="courseTitle">Public Speaking</span><div class="credits">3</div></div>');
			$('#4').append('<div class="class notDone genEd slo2 nonHonors"><span class="courseCode">EN XXX</span><span class="courseTitle">Literature</span><div class="credits">3</div></div>');
			
			$('.canBeHonors').removeClass('honorsClass');
			$('.canBeHonors .honors').remove();
			
			$('.canBeHonors').fadeOut(150).fadeIn(150).fadeOut(150).fadeIn(150);
			$('.nonHonors').fadeOut(150).fadeIn(150).fadeOut(150).fadeIn(150);
			
			$('.honorsClass').remove();
			$(this).removeClass('added');
			
			calculate();
			checkSLOs();
		};
	};
});