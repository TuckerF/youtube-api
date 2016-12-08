$(document).ready(function(){

$(document).ready(function(){

$(document).keypress(function(event){
	if(event.keyCode == 13){  // the enter key code 
		event.preventDefault();
		var searchTerm = $('#query').val();
		getRequest(searchTerm);
		$("#query").val(' ');
	}
});

$('#submit').click(function(event){
	event.preventDefault();
	var searchTerm = $('#query').val();
	getRequest(searchTerm);
	$("#query").val(' ');
});


function getRequest(searchTerm){
	var params = {
		q: searchTerm,
		part: 'snippet',
		type: 'video',
		key: 'AIzaSyBoNFfAExXIcb93jlzRlUYqG-d3eCJTZM4',
		maxResults: '10'
	}
	url = 'https://www.googleapis.com/youtube/v3/search';

	$.getJSON(url, params, function(data){
		showResults(data.items);
		console.log(data.items);
	})
}

function showResults(data){
		var resultList = $('#search-results');
		var list = {
			title: '',
			videoURL: '',
			thumbNail: '',
			init: function(){
				for(var i=0; i<data.length; i++){
					this.title = data[i].snippet.title;
					this.videoURL = 'http://www.youtube.com/watch?v=' + data[i].id.videoId;
					this.thumbNail= data[i].snippet.thumbnails.medium.url;
					resultList.append(this.drawList());
				}
			},			
			drawList: function(){
				return "<div class='box'><div class='title'>" + this.title + "</div><a href='" + this.videoURL + "'target='_blank'> <img class='image' src='" + this.thumbNail + "'></a></div>"
			},
		};

		resultList.empty();		
		list.init();
		console.log(list);	
	}

});

});