(function($){ })(jQuery);

$(document).ready(function () {

// Grab the URL of the website
var baseURL = window.location.origin;

// Save to first id to local storage
localStorage.setItem('first', $('#next').attr('data-id'));

// Listen for next button
$(document).on('click','#next', function() {
	// Get id from button
	var id = $(this).attr('data-id');
	// Get next article
	$.get(baseURL + "/next/" + id, buttons);
});

// Listen for prev button
$(document).on('click','#prev', function() {
	// Get id from button
	var id = $(this).attr('data-id');
	// Get next article
	$.get(baseURL + "/prev/" + id, buttons);
});

function buttons(res) {
	// Update content
	console.log(res[0].comments)
	$('#content>h2').text(res[0].title);
	$('#comment-holder>p').text(res[0].comments);
	$('a.articleURL').attr('href', res[0].articleURL);
	// Update comments
	comments(res[0].comments);
	// Check if previous button exists
	$buttons = $('#buttons');
	if ($buttons.children().length === 1) {
		// Add button
		var $but = $('<button>').text('Previous').attr('id','prev').attr('data-id',res[0]._id);
		$buttons.prepend($but);
	} else {
		// Check if the new id is the first id
		if (res[0]._id === localStorage.getItem('first')) {
			// If so remove
			$('#prev').remove();
		} else {
			// Just update prev button id
			$('#prev').attr('data-id',res[0]._id);
		}		
	}
	// Update next and post button id
	$('#next').attr('data-id',res[0]._id);
	$('#post').attr('data-id',res[0]._id);
}

function comments(obj) {
	$('#comment-holder').remove();
	var $commentHolder = $('<div>').attr('id','comment-holder');
	for (var i=0; i<obj.length; i++) {
		var $p = $('<p>').html('<span class="number">' + (i+1) + '</span> ' + obj[i].text + ' <a href="#" class="remove" data-id="' + obj[i]._id + '">X</a>');
		$commentHolder.append($p);
	}
	$('#arms2>div.comments').append($commentHolder);
}

// Listen for post button
$(document).on('click','#post', function() {
	// Get id from button
	var id = $(this).attr('data-id');
	// Get the comment
	$comment = $("#comment");
	var comment = $comment.val().trim();
	// Clear the comment
	$comment.val('');
	// Get next article
	$.post(baseURL + "/comment/" + id, {comment: comment}, function(res) {
		// Update comments
		comments(res);
	});
});

// Listen for remove click
$(document).on('click','.remove', function() {
	// Get id from post button
	var id = $('#post').attr('data-id');
	// Get remove id
	var removeID = $(this).attr('data-id');
	// Get next article
	$.post(baseURL + "/remove/" + id, {id: removeID}, function(res) {
		// Update comments
		comments(res);
	});
	return false;
});
});