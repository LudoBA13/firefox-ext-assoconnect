// BA = 130 - Bouches-du-Rhône
autoSelect('BuyPackerUserUserInfos157385', '380008');

// Type de structure = 1_Partenaire
autoCheck('BuyPackerUserUserInfos175732_427291');

function autoCheck(checkboxId)
{
	const checkbox = document.getElementById('BuyPackerUserUserInfos175732_427291');
	if (checkbox)
	{
		checkbox.checked = true;
	}
}

function autoSelect(selectorId, optionValue)
{
	const option = document.querySelector(`#${selectorId} > option[value="${optionValue}"]`);
	if (option)
	{
		option.selected = true;
	}
}