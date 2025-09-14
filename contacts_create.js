// BA = 130 - Bouches-du-Rhône
autoSelect('BuyPackerUserUserInfos157334', '379832');

// Typologie du contact = 2_Association
autoSelect('BuyPackerUserUserInfos147812', '355001');

function autoSelect(selectorId, optionValue)
{
	const option = document.querySelector(`#${selectorId} > option[value="${optionValue}"]`);
	if (option)
	{
		option.selected = true;
	}
}