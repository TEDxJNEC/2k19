


//Setup
function showPrefs()
{
    var front = document.getElementById("front");
    var back = document.getElementById("back");

	//Flip-it (widget)
    if (window.widget)
	{
	widget.prepareForTransition("ToBack");
	front.style.display="none";
	back.style.display="block";
	}

    if (window.widget) setTimeout ('widget.performTransition();', 0);
		
	//Flip-it (web, if NOT widget)
	if (!window.widget) document.getElementById('phiculator').className='showback';

}

function hidePrefs()
{
    var front = document.getElementById("front");
    var back = document.getElementById("back");

	//Flip-it (widget)
    if (window.widget)
	{
	widget.prepareForTransition("ToFront");
	back.style.display="none";
	front.style.display="block";
	}
			
    if (window.widget) setTimeout ('widget.performTransition();', 0);
		
	//Flip-it (web, if NOT widget)
	if (!window.widget)	document.getElementById('phiculator').className='showfront';
}

function weblink(theURL) {
if (window.widget) widget.openURL(theURL);
else location.href=theURL;
}


function phiculate()
{
	var phi = (1+Math.sqrt(5))/2;
	
	var phismallvar = document.phiform.phismallinput;
	var philargevar = document.phiform.philargeinput;
	
	for (i=0; i<document.phiform.calctype.length; i++)
	
	if(ratiodirection == 'philargeinput' && document.phiform.calctype[i].checked==true)
	{
		var thecalctype = document.phiform.calctype[i].value;
		
		//Calculate
		phismallvarfull = philargevar.value/phi;
				
		//If in INT mode, round the answer
		if(thecalctype == "intcalc") phismallvarfull = Math.round(phismallvarfull);
		
		//Output the answer, up to 14chars
		phismallvar.value = String(phismallvarfull).slice(0,14);
	}
	
	else if(ratiodirection == 'phismallinput' && document.phiform.calctype[i].checked==true)
	{
		var thecalctype = document.phiform.calctype[i].value;
		
		//Calculate
		philargevarfull = phismallvar.value*phi;
	
		//If in INT mode, round the answer
		if(thecalctype == "intcalc") philargevarfull = Math.round(philargevarfull);
	
		//Output the answer, up to 14chars
		philargevar.value = String(philargevarfull).slice(0,14);
};

//Tidier errors
if (philargevar.value == "NaN") philargevar.value = "---";
if (phismallvar.value == "NaN") phismallvar.value = "---";

};


function focustoggle(ratioactive)
{
	
	ratiodirection = ratioactive;
	
	if(ratioactive == 'phismallinput')
	{
		document.getElementById("phismallinput").className='active';
		document.getElementById("philargeinput").className='inactive';
	}
	
	else if(ratioactive == 'philargeinput')
	{
		document.getElementById("phismallinput").className='inactive';
		document.getElementById("philargeinput").className='active';
	}
		
};


function resetall()
{
	document.phiform.phismallinput.value = 1;
	document.phiform.philargeinput.value = 1.618033988749;
	document.phiform.fullcalctype.checked = true;
	document.phiform.phismallinput.focus();
};

