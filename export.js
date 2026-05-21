function ensureChecked(selector)
{
	const el = document.querySelector(selector);
	if (el && !el.checked)
	{
		el.click();
	}
}

const button = document.createElement('button');
button.addEventListener('click', function ()
{
	ensureChecked('#searchTableHeaderCheckbox');
	document.querySelector('.checkAllAlert')?.click();
	ensureChecked('#searchTableExportDropdownMenu0Item');
	document.querySelector('#sparkTemplateTableExportColumns + div .buttonOrange').click();
});
button.innerHTML = 'Export All';
document.getElementById('searchTableWrapper').before(button);