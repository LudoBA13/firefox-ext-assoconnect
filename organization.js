let button = document.createElement('button');
button.addEventListener('click', e => autoSearch(282, 455058));
button.innerHTML = 'Entrepôt St-Andiol';

document.getElementById('searchTableWrapper').before(button);

button = document.createElement('button');
button.addEventListener('click', e => autoSearch(39, 1130007));
button.innerHTML = 'ACLAP';
document.getElementById('searchTableWrapper').before(button);


button = document.createElement('button');
button.addEventListener('click', function (e)
{
	document.getElementById('searchTableHeaderCheckbox').click();
	document.querySelector('.checkAllAlert').click();
	document.getElementById('searchTableExportDropdownMenu0Item').click();
	document.getElementById('sparkTableExportColumn_all').click();
	document.querySelector('#sparkTemplateTableExportColumns + div .buttonOrange').click();
});
button.innerHTML = 'Export All';
document.getElementById('searchTableWrapper').before(button);


function autoSearch(infoId, valueId)
{
	const templateCore = document.getElementById('templateCore');

	let delay = 0;
	if (!templateCore?.classList.contains('searchPanelOpen'))
	{
		document.getElementById('searchPanelToggle').click();
		delay += 100;
	}
	if (!document.querySelector(`.searchPanelItemWrapper.open[data-key="info${infoId}"]`))
	{
		window.setTimeout(
			() => document.getElementById(`info${infoId}_toggle_1Label`).click(),
			delay
		);
		delay += 100;
	}
	// Debug. Will be refactored properly later
	if (valueId === 1130007)
	{
		document.getElementById(`info${infoId}`).value = valueId;
		return;
	}
	window.setTimeout(
		() => document.getElementById(`info${infoId}_values_${valueId}`).click(),
		delay
	);
}