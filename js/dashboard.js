
var serverAddress = '//localhost';
var serverPath = "/gproject/";
window.addEventListener("load",connect);

function connect()
{
	var filesList;
	var speakerStatus;
	getFilesList(serverAddress + serverPath + "getFilesList.php?user_id=1");
	getSpeakerInfo(serverAddress + serverPath + "getSpeakerInfo.php?speaker_id=1");
	document.getElementById("play_button").addEventListener("click", function() { mediaPlayer("play"); } );
	document.getElementById("stop_button").addEventListener("click", function() { mediaPlayer("stop"); } );
	document.getElementById("switch_button").addEventListener("click", function() { switchSpeaker(); } );
	document.getElementById("upload_file").action = serverAddress + serverPath + "uploadFile.php";
	switch_button
}

function mediaPlayer(action)
{
	if (action == "play")
	{
		url = serverAddress + serverPath + "play.php?SpeakerID=1&FileName="+ filesList.files_names[0];
		try
		{
			ob=new XMLHttpRequest();
			ob.open("GET",url,true);
			ob.send();
		}
		catch(exception)
		{
			alert("Request Failed")
		}
	}
	
	if (action == "stop")
	{
		url = serverAddress + serverPath + "stop.php?SpeakerID=1";
		try
		{
			ob=new XMLHttpRequest();
			ob.open("GET",url,true);
			ob.send();
		}
		catch(exception)
		{
			alert("Request Failed")
		}
	}
}

function switchSpeaker()
{
	if (speakerInfo.speaker_state == 1)
	{
		url = serverAddress + serverPath + "swtich.php?speaker_id=1&state=off";
		try
		{
			ob=new XMLHttpRequest();
			ob.open("GET",url,true);
			ob.send();
		}
		catch(exception)
		{
			alert("Request Failed")
		}
		location.reload();
	}
	
	if (speakerInfo.speaker_state == 0)
	{
		url = serverAddress + serverPath + "swtich.php?speaker_id=1&state=on";
		try
		{
			ob=new XMLHttpRequest();
			ob.open("GET",url,true);
			ob.send();
		}
		catch(exception)
		{
			alert("Request Failed")
		}
		location.reload();
	}
}

function playFile(fileName)
{
	url = serverAddress + serverPath + "play.php?SpeakerID=1&FileName=" + fileName.target.fileName;
	try
	{
		ob=new XMLHttpRequest();
		ob.open("GET",url,true);
		ob.send();
	}
	catch(exception)
	{
		alert("Request Failed")
	}
}

function getFilesList(URL)
{
	try
	{
		req =new XMLHttpRequest();
		req.open("GET",URL,true);
		req.addEventListener("readystatechange",processRequestFiles);
		req.send();
	}
	catch(exception)
	{
		alert("Request Failed")
	}
}

function processRequestFiles()
{
	if(req.readyState==4)
	{
		arr = JSON.parse(req.responseText);
		filesList = arr;
		list = document.createElement('ul');
		for(i=0;i<arr.files_names.length;i++)
		{
			item = document.createElement('li');
			item.appendChild(document.createTextNode(arr.files_names[i]));
			item.addEventListener("click",playFile,false);
			item.fileName = arr.files_names[i];
			list.appendChild(item);
		}
	document.getElementById('files_list').appendChild(list);
	}
}

function getSpeakerInfo(URL)
{
	try
	{
		ob=new XMLHttpRequest();
		ob.open("GET",URL,true);
		ob.addEventListener("readystatechange",processRequestSpeakerInfo);
		ob.send();
	}
	catch(exception)
	{
		alert("Request Failed")
	}
}

function processRequestSpeakerInfo()
{
	if(ob.readyState==4)
	{
		speakerInfo = JSON.parse(ob.responseText);
		document.getElementById('speaker_name').innerHTML = speakerInfo.speaker_name;
		document.getElementById('speaker_country').innerHTML = speakerInfo.speaker_country;
		document.getElementById('speaker_city').innerHTML = speakerInfo.speaker_city;
		document.getElementById('speaker_location').innerHTML = speakerInfo.speaker_location;
		document.getElementById('speaker_ip').innerHTML = speakerInfo.speaker_ip;
		document.getElementById('speaker_volume').innerHTML = speakerInfo.speaker_volume;
		speakerStatus = speakerInfo.speaker_state;
		if(speakerInfo.speaker_state == 1)
		{
			document.getElementById("status_led").setAttribute("src","img/on.png");
		}
		if(speakerInfo.speaker_state == 0)
		{
			document.getElementById("status_led").setAttribute("src","img/off.png");
		}
	}
}

