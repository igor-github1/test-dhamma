window.onload = onLoad;
var cur_active_note = null;
var blogging = 0;
var vdivLog = '\
	<!-- ОБЛАСТЬ ДЛЯ ОТЛАДОЧНОЙ ИНФОРМАЦИИ - НАЧАЛО-->\
	<!-- (отображается при включенном параметре blogging: ./js/scripts.js -> blogging = 1)-->\
	<div id="divLog"\
		style="\
			width:50%;\
			background-color:lightgreen;\
			border-style:dashed;\
			border-color:blue;\
			border-width:1\
		"\
	>\
		<b>Logging...</b><br /><br />\
	</div><br>\
	<!-- ОБЛАСТЬ ДЛЯ ОТЛАДОЧНОЙ ИНФОРМАЦИИ - КОНЕЦ-->\
	';
function onLoad(){
	/* Включаем область вывода отладочных сообщений при необходимости */
	onLoadLogDiv();

	/* Каждой ссылке в тексте на примечание устанавлиаем обработчик onmouseover */

	_writeln('start');
	try{
		var pars = document.getElementsByTagName("a");
		if(pars){
			for(i=0; i<pars.length; i++){
				var cur_id = pars[i];
				//_write(.id);
				if(cur_id.id.indexOf('note_auth_link_inline')!=-1 ||
					cur_id.id.indexOf('note_trans_link_inline')!=-1){
					//_write('handler set');
					cur_id.onmouseover=onMouseOverRef;
					cur_id.onmouseout=onMouseOutRef;
				}
			}
		}
	}
	catch(e){
		_writeln(e);		
	}
	_write('stop');
}
function _write(arg){
	var d = document.getElementById('divLog');
	if(d)
		d.innerHTML += (arg==null? 'null': arg.toString())+'; ';
}
function _writeln(arg){
	var d = document.getElementById('divLog');
	if(d)
		d.innerHTML += (arg==null? 'null': arg.toString())+'<br>';
}

function onMouseOverRef(ee){
	// узнаем тип примечания - автора или переводчика
	var note_type = 'unknown';
	
	if(this.id.indexOf('note_auth_link_inline')!=-1){
		note_type='note_auth';
	}
	else{
		note_type='note_trans';
	}
	
	//_writeln(note_type);
	
	// узнаем номер текущего примечания
	var re = /\d+/
	var num = re.exec(this.id);
	_write(this.id);
	
	// в зависимости от типа примечания получаем html-элемент этого примечания
	var note;
	if(note_type=='note_auth')
		note = document.getElementById("note_auth_text"+num);
	else if (note_type=='note_trans')
		note = document.getElementById("note_trans_text"+num);
	else note = null;
	
	if(note){
		if(cur_active_note==null){
			cur_active_note = document.createElement('div');
			if(cur_active_note){
				cur_active_note.id="cur_active_note_div";			
				cur_active_note.className = 'cur_active_note';
				
				// в зависимости от типа примечания устанавливает значения нужных параметров
				var cur_type_color = (note_type=='note_auth')? '#3232CD': '#28A428';
				var cur_note_title = (note_type=='note_auth')? 'Примечание автора': 'Примечание переводчика';
				cur_active_note.innerHTML='\
					<h3 style="color:white; background-color:'+ cur_type_color+'; text-align:center; margin:0; padding:0.5%;">'+cur_note_title+ '</h3>\
					<span style="font-weight:bold; display:inline-block; width:100%; text-align:center; font-size:80%"></span>\
				';
				var e = document.createElement('div');
				if(e){
					e.style.paddingLeft = e.style.paddingRight = e.style.paddingTop = e.style.paddingBottom="1%";
					cur_active_note.appendChild(e);
					
					e.innerHTML+=note.innerHTML;
				}
				// если высота области примечания оказалась слишком большой, то уменьшаем ее
				document.body.appendChild(cur_active_note);
				var be = document.createElement('div');
				be.style.background=cur_type_color;
				be.style.color="white";
				be.style.fontWeight="bold";
				be.style.bottom="0%";
				be.style.width="100%";
				be.style.position="absolute";
				be.style.opacity="1";
				be.style.textAlign="center"
				be.style.fontSize="80%";
				be.innerHTML="(неполный текст, для перехода к списку примечаний нажмите на ссылку)";

				var sh = cur_active_note.scrollHeight;
				var oh = cur_active_note.offsetHeight;

				// Если текст не умещается во всплывающем окно примечаний, то добавляем сообщение об этом
				if(((sh-oh)/oh)*100>5) cur_active_note.appendChild(be);
				
				// Вычисляем текущее положение ссылки на примечание
				var y = this.offsetTop-document.documentElement.scrollTop;

				// В зависимости от текущего расположения ссылки на примечание, выводим всплывающее окно в верхней или нижней части экрана
				if(y<window.innerHeight/2){
					cur_active_note.style.bottom="4%";
				}
				else{					
					cur_active_note.style.top="4%";
					cur_active_note.style.bottom="";
				}
			}
		}
	};	
};

function onMouseOutRef(){
	// узнаем номер текущего отображенного примечания
	try{
		/* убираем примечание с экрана*/
		if(cur_active_note){
			document.body.removeChild(cur_active_note);
		}
	}
	catch(e){
		_writeln(e);
	}
	cur_active_note=null;
}

function onLoadLogDiv(){
	if(blogging == 1){
		//var b = document.getElementByTagName("body");
			//if (b){divLog
				//l = document.body.createElement("div");
				//l.innerHTML=vdivLog;
				document.body.innerHTML=vdivLog+ document.body.innerHTML;
			//}
		
	}
	//var l = document.getElementById("divLog");
	//_write("fdf");
	//_write(blogging);	
	//if (l){
	//	if(blogging == 0){
	//		//_write("On");
	//		l.style.display="none";
	//	}		
	//}
}