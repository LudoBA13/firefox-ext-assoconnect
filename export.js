function ensureChecked(selector)
{
	const el = document.querySelector(selector);
	if (el && !el.checked)
	{
		el.click();
	}
}

const button = document.getElementById('searchTableExportAllButton').cloneNode(true);
button.addEventListener('click', function ()
{
	ensureChecked('#searchTableHeaderCheckbox');
	document.querySelector('.checkAllAlert')?.click();
	document.querySelector('#searchTableExportAllButton').click();
	ensureChecked('#sparkTableExportColumn_all');
	document.querySelector('#sparkTemplateTableExportColumns + div .buttonOrange').click();
});
button.querySelector('span').textContent = 'Tout exporter';
document.getElementById('searchTableExportAllButton').after(button);