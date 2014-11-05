var grille=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];//crée une grille 4x4

var score = 0;

function getrandomceil()
{
	var r = Math.floor(Math.random()*4);//floor=arrondi un nombre, random=génère un nombre aléatoire(entre 0 et 3), multiplié par 4
	return r;
}

function randomNumber() //spawn aléatoire des chiffres 2 et 4
{
	if(Math.random() < 0.9)//Si inférieur à 0,9
		return 2; //Retourne 2
	return 4;//Sinon retourne 4
}

window.onkeydown = function(e){ //Déplacement a partir de touche (flèches directionnelles)
	var key = e.keycode || e.which;
	switch (key) {
		case 37:
		moveLeft();
		FusionLeft();
		moveLeft();
		randomspawn();
		//Déplace à gauche
		break;
	case 39:
		moveRight();
		FusionRight();
		moveRight();
		randomspawn();
		//Déplace à droite
		break;
	 case 38:
	 	moveTop();
	 	FusionTop();
	 	moveTop();
	 	randomspawn();
	 	//Déplace en haut
	 	break;
	 case 40:
	 	moveBot();
	 	FusionBot();
	 	randomspawn();
	 	//randomspawn();
	 	//Déplace en bas
	 	break;
	 default:
	 	break;
	}
	affichegrille();
	afficherscore();
};

function randomspawn()
{
	if(!checkGrid())
		return;
	var x,y;
	x=getrandomceil(); //crée variable qui prenne en compte 2 position (x,y)
	y=getrandomceil(); //la function getrandomceil est égal à 2

	if (checkNumber(x,y)==="")//vérifie que la case soit vide
	{
		grille[x][y]= randomNumber();
	} 
	else
	{
		randomspawn(); //relance la function
	}	
}

function checkGrid()//function qui vérifie si le tableau est plein
{
	for (var y = 0; y < grille.length; y++){ //parcours les positions de la ligne
		for (var x = 0; x < grille.length; x++){//parcours les positions de la colonne
			if (checkNumber(x,y)=="")//si la grille est vide retourne true
				return true;
		}
	};
	return false;//si elle est pleine retourne false
}

function start()
{
	randomspawn();
	randomspawn();
}

function affichegrille()
{
	var td = document.getElementById("grid");
	var str = "<table>";
	str += "<tr>";
	str += "<td>"+checkNumber(0,0)+"</td> <td>"+checkNumber(0,1)+"</td> <td>"+checkNumber(0,2)+"</td> <td>"+checkNumber(0,3)+"</td>";
	str += "</tr>";
	str += "<tr>";
	str += "<td>"+checkNumber(1,0)+"</td> <td>"+checkNumber(1,1)+"</td> <td>"+checkNumber(1,2)+"</td> <td>"+checkNumber(1,3)+"</td>";
	str += "</tr>";
	str += "<tr>";
	str += "<td>"+checkNumber(2,0)+"</td> <td>"+checkNumber(2,1)+"</td> <td>"+checkNumber(2,2)+"</td> <td>"+checkNumber(2,3)+"</td>";
	str += "</tr>";
	str += "<tr>";
	str += "<td>"+checkNumber(3,0)+"</td> <td>"+checkNumber(3,1)+"</td> <td>"+checkNumber(3,2)+"</td> <td>"+checkNumber(3,3)+"</td>";
	str += "</tr>";
	str += "</table>";

	td.innerHTML = str;
}

function checkNumber(x,y)
{
	if (grille[x][y] == 0) //si la case est égale à 0
		return ""; //retourner chaine de caractère vide
	return grille[x][y];//retourne le nombre de la case
}


function get_next_num_pos_left(start,grille,line)//trouver la postion des chiffres
{
	var i=start
	while(grille[line][i]==0 && i<grille[line].length)
		i++;
	return i;
}

function get_next_num_pos_right(start,grille,line)//trouver la postion des chiffres
{
	var i=start
	while(grille[line][i]==0 && i>0)
		i--;
	return i;
}

function get_next_num_pos_top(i, line)
{
	var tmp = line;
	if (tmp < 0)
		return 0;
	while(tmp > 0 && grille[tmp - 1][i] == 0)
		tmp--;
	return tmp;
}

function get_next_num_pos_bot(i, line)
{
	var tmp = line;
	if (tmp > 3)
		return 3;
	while(tmp < 3 && grille[tmp + 1][i] == 0)
		tmp++;
	return tmp;
}

function moveLeft()//Déplace les chiffres vers la gauche
{
	for(line=0; line<grille.length; line++)//
	{	
		var i;
		for (i=0; i<grille[line].length; i++)
		{
			var j = get_next_num_pos_left(i,grille,line);
			if(j<grille[line].length && j!=i)
			{
				grille[line][i]=grille[line][j];
				grille[line][j]=0;
			}
		}
	}
}

function FusionLeft()//Fusionne les chiffres de même nombre entre eux
{
	for(line=0; line<grille.length; line++)//(Fusion) Parcours la grille 
	{
		for (i=0; i<grille[line].length; i++)
		{
			if(grille[line][i] === grille[line][i - 1])//
			{
				grille[line][i - 1] *= 2;
				grille[line][i] = 0;
				score = score + grille[line][i - 1];
			}
		}
	}
}

function moveRight()//Déplace les chiffres vers la droite
{
	for(line=0; line<grille.length; line++)//Parcours la grille
	{	
		var i;
		for (i=3; i>=0; i--)//
		{
			var j = get_next_num_pos_right(i,grille,line);
			if(j<grille[line].length && j!=i)
			{
				grille[line][i]=grille[line][j];
				grille[line][j]=0;
			}
		}
	}
}

function FusionRight()//Fusionne les chiffres de même nombre entre eux
{
	for(line=0; line<grille.length; line++)//(Fusion) Parcours la grille 
	{
		for (i=3; i>=0; i--)
		{
			if(grille[line][i] === grille[line][i + 1])//
			{
				grille[line][i + 1] *= 2;
				grille[line][i] = 0;
				score = score + grille[line][i + 1];
			}
		}
	}
}

function moveTop()
{
	for(line = 0; line < 4; line++)
	{
		for (i = 0; i < 4; i++)
		{
			if (grille[line][i] != 0)
			{
				j = get_next_num_pos_top(i, line);
				if(j !=line)
				{
					grille[j][i] = grille[line][i];
					grille[line][i] = 0;
				}
			}
		}
	}
}

function FusionTop()
{
	for(line = 1; line < 4; line++)
	{
		for (i = 0; i < 4; i++)
		{
			if(grille[line][i] == grille[line-1][i])
			{
				grille[line-1][i] *= 2;
				grille[line][i] = 0;
				score = score + grille[line-1][i];
			}
		}
	}
}

function moveBot()
{
	for(line = 3; line >= 0; line--)
	{
		for (i = 3; i >= 0; i--)
		{
			if (grille[line][i] != 0)
			{
		
				j = get_next_num_pos_bot(i, line);
				if(j != line)
				{
					grille[j][i] = grille[line][i];
					grille[line][i] = 0;
				}
			}
		}
	}
}

function FusionBot()
{
	for(line = 2; line >= 0; line--)
	{
		for (i = 3; i >= 0; i--)
		{
			if(grille[line][i] == grille[line+1][i])
			{
				grille[line+1][i] *= 2;
				grille[line][i] = 0;
				score = score + grille[line+1][i];
			}
		}
	}
}

function afficherscore()
{
    window.document.getElementById("score").innerHTML = score;
}
/*
function gameOver()
{
	var nb = 0;

	for(line=0; line<grille.length; line++) 
	{
		for (i=0; i<grille[line].length; i++)
		{
			if (grille[line][i] != 0)
			{
				nb++;
			}
		}
	}
	console.log(nb);
	if (nb == 16)
	{
		
	}
}

function checkFusion()
{
	for(line=0; line<grille.length; line++) 
	{
		for (i=0; i<grille[line].length; i++)
		{
			if (grille[line][i] )
}
*/
start();
affichegrille();