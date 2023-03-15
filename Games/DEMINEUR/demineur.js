
var Ref_partie_principale ;
var tab =[] ;
var Ref_case_survolée ;
var Ref_difficulte ;
var Ref_createur ;
var Ref_date_creation ;
var Ref_statut ;
var Ref_mines ;
var Ref_numero ;
var Ref_pop_up_loose ;
var Ref_pop_up_win ;
var Ref_pop_up_mines ;
var ctrl = 0 ;
var compteur_case_blanche =0 ;
var partie ;
var numpartie = 0 ;
var nb_case ;
var nb_mines = 0 ;
var nb_mines_initial ;

function reload() {
	compteur_case_blanche =0
	Ref_pop_up_win.style.opacity ="0" ;
	Ref_pop_up_loose.style.opacity ="0" ;
	Ref_pop_up_mines.style.opacity ="0" ;
	Ref_difficulte.innerHTML = "Difficulté : ";
	Ref_createur.innerHTML = "Créateur : " ;
	Ref_statut.innerHTML = " Statut de la partie :" ;
	Ref_mines.innerHTML =" Mines restantes :" ;
	Ref_date_creation.innerHTML = " Date de création : "
	numpartie = Ref_numero.value ;
	
	init() ;
	//case_survolée();
	
	
}
function init(){ //
	Ref_partie_principale=document.getElementById("partie_principale");
	Ref_difficulte=document.getElementById("difficulte");
	Ref_createur = document.getElementById("createur");
	Ref_date_creation = document.getElementById("date_creation") ;
	Ref_statut = document.getElementById("statut") ;
	Ref_mines = document.getElementById("mines") ;
	Ref_pop_up_loose = document.getElementById("pop_up_loose") ;
	Ref_pop_up_win = document.getElementById("pop_up_win") ;
	Ref_pop_up_mines = document.getElementById("pop_up_mines") ;
	Ref_numero = document.getElementById("numero") ;
	partie = partie_regroup[numpartie] ;
	hauteur = partie.plateau.length ;
	longueur = partie.plateau[numpartie].length ;
	nb_case = hauteur * longueur ;
	Ref_partie_principale.style.width= (longueur *50)+50+"px" ;
	Ref_partie_principale.style.height= (hauteur *50)+50+"px" ;
	info_partie(); //
	nb_mines_initial = nb_mines ;
	
	
}

function grille() {
	var i ;
	var j ;
	var k ;
	var cases ;
	var contenu ="";
	reload();
	for (i= 0 ; i<nb_case ;i++){
		contenu= contenu+"<div id= 'case_"+i.toString()+"'"+ "class ='cases'onmousedown='case_survolée();' value=' "+i.toString()+"'>"+i.toString()+"</div>" ;
		Ref_partie_principale.innerHTML= contenu ;
		tab[i] = document.getElementById("case_"+i).innerHTML ;
	}
	
	i=0 ;
	j= 0 ;
	k= 0 ;
	tab[0] ;
	cases = 0;
	while ( cases != nb_case )
	{
		tab[cases]=partie_regroup[numpartie].plateau[j][k] ;
		document.getElementById("case_"+cases).innerHTML =tab[cases] ;
		document.getElementById("case_"+cases).style.color = "transparent";
		
		k=k+1 ;
		i=i+1;
		if(i == longueur)
		{
			k=0 ;
			i=0;
			j=j+1;
			console.log(j);
		}
		cases=cases+1 ;
	}
	compter_nb_mines();
	Ref_mines.innerHTML = "Mines restantes : " + nb_mines ;	
	
}



function case_survolée(){//
	
	var contenu="" ;
	var contenu2 ;
	console.log("debut case_survolée");
	console.log(event.target.id);
	Ref_case_survolée = event.target.id ;
	contenu2 = document.getElementById(Ref_case_survolée).innerHTML
	if (ctrl == 1 ) {
		contenu = "!" ;
		if ( document.getElementById(Ref_case_survolée).innerHTML == "!" ){
			console.log(nb_mines) ;
		}
		else{
			document.getElementById(Ref_case_survolée).innerHTML = contenu ;
			document.getElementById(Ref_case_survolée).style.textAlign ="center";
			document.getElementById(Ref_case_survolée).style.color = "black";
			console.log(nb_mines) ;
			nb_mines = nb_mines -1 ;
			Ref_mines.innerHTML = "Mines restantes :"+ nb_mines ;
			if (nb_mines < 0) {
				
				Ref_pop_up_mines.style.opacity ="1" ;
				
				
			}
		}
	}
	else {
		
		if (document.getElementById(Ref_case_survolée).innerHTML == "!")
		{
			
			document.getElementById(Ref_case_survolée).innerHTML = tab[Ref_case_survolée.substr(5,6)] ;
			
		}
		document.getElementById(Ref_case_survolée).style.backgroundColor= "white" ;
		compteur_case_blanche = compteur_case_blanche +1;
		if (document.getElementById(Ref_case_survolée).innerHTML == "9")
		{
			document.getElementById(Ref_case_survolée).innerHTML = "*"
			Ref_statut.innerHTML = "Statut de la partie : PERDU"
			console.log("  Vous avez Perdu") ;
			Ref_pop_up_loose.style.opacity="1";
			dévoiler()
		}
		
		if ( compteur_case_blanche ==  nb_case -nb_mines_initial) {
			Ref_pop_up_win.style.opacity="1";
			dévoiler()
		}
		document.getElementById(Ref_case_survolée).style.color = "black"; ;
		
	}
	ctrl=0 ;
	
}

function clavier() {
	
	if (event.which == 17) 
	{
		ctrl =1 ;
	}
	
}
function compter_nb_mines() { //
	var i ;
	var j;
	nb_mines = 0 ;
	for (j=0 ; j<hauteur ;j++){ 
		for (i=0 ; i<longueur ; i++)
		{
			console.log(partie_regroup[numpartie].plateau[j][i]);
			if (partie_regroup[numpartie].plateau[j][i] ==9 )
			{
				nb_mines=nb_mines+1 ;
			}
		}
	}
	
}	

function info_partie(){ //
	var contenu="" ;
	compter_nb_mines();
	contenu = Ref_difficulte.innerHTML ;
	Ref_difficulte.innerHTML = contenu +" " + partie_regroup[numpartie].difficulte ;
	contenu = Ref_createur.innerHTML ;
	Ref_createur.innerHTML = contenu + " " + partie_regroup[numpartie].nomCreateur ;
	contenu = Ref_date_creation.innerHTML ;
	Ref_date_creation.innerHTML = contenu + " " + partie_regroup[numpartie].dateCreation ;
	contenu = Ref_statut.innerHTML ;
	Ref_statut.innerHTML = contenu + " " +"en Jeu";
	contenu = Ref_mines.innerHTML ;
	Ref_mines.innerHTML = contenu + nb_mines ;
}
function dévoiler(){
	var i
	for (i=0 ; i<nb_case ;i++ )
	{
		aux = document.getElementById("case_"+i).innerHTML ;
		document.getElementById("case_"+i).innerHTML=tab[document.getElementById("case_"+i).id.substr(5,6)]
		document.getElementById("case_"+i).style.textAlign ="center";
		document.getElementById("case_"+i).style.color = "black";
		document.getElementById("case_"+i).style.backgroundColor= "white" ;
		
	}
}