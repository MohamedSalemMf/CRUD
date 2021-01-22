var pNameInput = document.getElementById("pName");
var pPriceInput = document.getElementById("pPrice");
var pCategoryInput = document.getElementById("pCategory");
var pDescInput = document.getElementById("pDesc");
var userNameAlert = document.getElementById("userNameAlert");
var globalUpdateIndex = 0;
var myStore;
if(localStorage.getItem("productInStorage") == null)
{
	myStore = [];
}
else
{
	myStore = JSON.parse(localStorage.getItem("productInStorage"));
	displayProducts();
}
//*********************************************************************
function addProduct()
{
	if(validateProductName() == true)
	{
		var pNameValue = pNameInput.value;
		var pPriceValue = pPriceInput.value;	
		var pCategoryValue = pCategoryInput.value;
		var pDescValue = pDescInput.value;	
		var oneProduct =
		{
			pName : pNameValue,	
			pPrice : pPriceValue,
			pCategory : pCategoryValue,
			pDesc : pDescValue,
		}
		myStore.push(oneProduct);
		localStorage.setItem("productInStorage" , JSON.stringify(myStore))
		displayProducts();
		clearInputs();	
	}
}
//****************************************************
function clearInputs()
{
	pNameInput.value = "";
	pPriceInput.value = "";
	pCategoryInput.value = "";
	pDescInput.value = "";
}
//***********************************************************************
function displayProducts()
{
	var cartuna = ``;
	
	for(var i=0; i < myStore.length; i++)
	{

		cartuna += `<tr>
						<td>`+i+`</td>
						<td>`+myStore[i].pName+`</td>
						<td>`+myStore[i].pPrice+`</td>
						<td>`+myStore[i].pCategory+`</td>
						<td>`+myStore[i].pDesc+`</td>
						<td><button onclick="updateProduct(`+i+`)" class="btn btn-outline-warning">update</button></td>
						<td><button onclick="deleteProduct(`+i+`)" class="btn btn-outline-danger">delete</button></td>
					</tr>`
	}	
	document.getElementById("tBody").innerHTML = cartuna; 
}
//********************************************************************************
//Delete
function deleteProduct(pDeleteIndex)
{
	myStore.splice(pDeleteIndex,1);
	displayProducts();
	localStorage.setItem("productInStorage" , JSON.stringify(myStore))
}
//*********************************************************************************
function updateProduct(pUpdateIndex)
{
	//32
	globalUpdateIndex = pUpdateIndex;
	pNameInput.value = myStore[pUpdateIndex].pName
	pPriceInput.value = myStore[pUpdateIndex].pPrice
	pCategoryInput.value = myStore[pUpdateIndex].pCategory
	pDescInput.value = myStore[pUpdateIndex].pDesc;
	
	//26
	document.querySelector(".addUpdate").style.display = "none";

	//28
	document.querySelector(".buttonUpdate").classList.remove ("d-none");
}

function updateNow()
{
	myStore[globalUpdateIndex].pName = pNameInput.value
	myStore[globalUpdateIndex].pPrice = pPriceInput.value
	myStore[globalUpdateIndex].pPrice = pCategoryInput.value
	myStore[globalUpdateIndex].pCategory = pDescInput.value
	displayProducts();
	clearInputs();
	localStorage.setItem("productInStorage" , JSON.stringify(myStore));
	
	//34
	document.querySelector(".addUpdate").style.display = "inline-block";
	document.querySelector(".buttonUpdate").classList.add ("d-none");
}

//*************************************************************
function pSearch(userWord)
{
	var cartunaSearch = ``;
	for(var i=0 ; i < myStore.length ; i++)
	{
		if( (myStore[i].pName).toLowerCase().includes(userWord.toLowerCase()) || (myStore[i].pCategory).toLowerCase().includes(userWord.toLowerCase()))
		{
					cartunaSearch += `<tr>
						<td>`+i+`</td>
						<td>`+myStore[i].pName+`</td>
						<td>`+myStore[i].pPrice+`</td>
						<td>`+myStore[i].pCategory+`</td>
						<td>`+myStore[i].pDesc+`</td>
						<td><button onclick="updateProduct(`+i+`)" class="btn btn-outline-warning">update</button></td>
						<td><button onclick="deleteProduct(`+i+`)" class="btn btn-outline-danger">delete</button></td>
					</tr>`
		}
	}
	//40
	document.getElementById("tBody").innerHTML = cartunaSearch;
}
//********************************************************************
function validateProductName()
{
	var rgx = /^[a-zA-Z]+$/
	
	if(rgx.test(pNameInput.value) == true )
	{
		pNameInput.classList.add("is-valid");
		pNameInput.classList.remove("is-invalid"); 
		userNameAlert.classList.replace("d-block" , "d-none");
		return true;
	}
	else
	{
		pNameInput.classList.add("is-invalid");
		pNameInput.classList.remove("is-valid"); 
		userNameAlert.classList.replace("d-none" , "d-block");
		return false;
	}
}
pNameInput.addEventListener("keyup" , validateProductName);