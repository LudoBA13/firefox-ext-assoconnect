function ensureChecked(selector)
{
	const el = document.querySelector(selector);
	if (el && !el.checked)
	{
		el.click();
	}
}

const originalButton = document.getElementById('searchTableExportButton');
const button = originalButton.cloneNode(true);
button.id = 'searchTableExportAllButton';
button.addEventListener('click', function ()
{
	ensureChecked('#searchTableHeaderCheckbox');
	document.querySelector('.checkAllAlert')?.click();
	document.querySelector('#searchTableExportButton').click();
	ensureChecked('#sparkTableExportColumn_all');
	document.querySelector('#sparkTemplateTableExportColumns + div .buttonOrange').click();
});
button.querySelector('span').textContent = 'Tout exporter';
originalButton.after(button);