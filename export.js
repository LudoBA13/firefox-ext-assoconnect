function ensureChecked(selector)
{
	const el = document.querySelector(selector);
	if (el && !el.checked)
	{
		el.click();
	}
	return el;
}

let button = document.createElement('button');
button.addEventListener('click', function (e)
{
	ensureChecked('#searchTableHeaderCheckbox');
	document.querySelector('.checkAllAlert')?.click();
	ensureChecked('#searchTableExportDropdownMenu0Item');
	document.querySelector('#sparkTemplateTableExportColumns + div .buttonOrange').click();
});
button.innerHTML = 'Export All';
document.getElementById('searchTableWrapper').before(button);

function runChecks()
{
	ensureChecked('#sparkTableExportColumn_all');
}

if (document.readyState === 'complete')
{
	runChecks();
}
else
{
	window.addEventListener('load', runChecks);
}

const root = document.getElementById('templatePage');