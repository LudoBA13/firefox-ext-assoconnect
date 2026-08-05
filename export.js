function ensureChecked(selector)
{
	const el = document.querySelector(selector);
	if (el && !el.checked)
	{
		el.click();
	}
}

const button = document.getElementById('searchTableExportButton').cloneNode(true);
button.addEventListener('click', function ()
{
	ensureChecked('#searchTableHeaderCheckbox');
	document.querySelector('.checkAllAlert')?.click();
	ensureChecked('#sparkTableExportColumn_all');
	document.querySelector('#sparkTemplateTableExportColumns + div .buttonOrange');
});
button.querySelector('span').textContent = 'Tout exporter';
document.getElementById('searchTableExportButton').after(button);