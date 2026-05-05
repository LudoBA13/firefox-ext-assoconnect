let button = document.createElement('button');
//button.addEventListener('click', e => autoSearch(282, 455058));
//button.innerHTML = 'Entrepôt St-Andiol';
//
//document.getElementById('searchTableWrapper').before(button);
//
//button = document.createElement('button');

function ensureChecked(selector)
{
	const el = document.querySelector(selector);
	if (el && !el.checked)
	{
		el.click();
	}
	return el;
}
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
function isSearchPanelOpen()
{
	return document.getElementById('templateCore').classList.contains('searchPanelOpen');
}
function toggleSearchPanel()
{
	document.getElementById('searchPanelToggle').click();
}

function getSearchCategoryBlock(infoId)
{
	let node = getSearchItemBlock(infoId);
	while (node && !node.classList.contains('searchPanelBlock'))
	{
		node = node.parentNode;
	}

	return node;
}
function isSearchCategoryOpen(infoId)
{
	return getSearchCategoryBlock(infoId).classList.contains('open');
}
function toggleSearchCategory(infoId)
{
	getSearchCategoryBlock(infoId).querySelector('h3')?.click();
}

function getSearchItemBlock(infoId)
{
	return root.querySelector(`.searchPanelItemWrapper[data-key="info${infoId}"]`);
}
function isSearchItemOpen(infoId)
{
	return getSearchItemBlock(infoId).classList.contains('open');
}
function toggleSearchItem(infoId)
{
	document.getElementById(`info${infoId}_toggle_1Label`).click();
}

//document.getElementById('searchQuery').addEventListener(
//	'keyup',
//	function (e)
//	{
//		if (/^[0-9]{7,}$/.test(e.target.value))
//		{
//			autoSearch(39, e.target.value);
//		}
//	},
//	{
//		capture: true,
//		passive: true
//	}
//);

function autoSearch(infoId, valueId)
{
	document.getElementById('formCleaner').click();

	// There's a bug in AssoConnect where searching by VIF then clearing the search
	// does not re-enable the search input
	document.getElementById('searchQuery').disabled = false;

	let delay = 0;
	if (!isSearchPanelOpen())
	{
		window.setTimeout(() => toggleSearchPanel(infoId), delay);
		delay += 16;
	}
	if (!isSearchItemOpen(infoId))
	{
		if (!isSearchCategoryOpen(infoId))
		{
			window.setTimeout(() => toggleSearchCategory(infoId), delay);
			delay += 400;
		}
		window.setTimeout(() => toggleSearchItem(infoId), delay);
		delay += 16;
	}
	window.setTimeout(
		function ()
		{
			let input = document.getElementById(`info${infoId}`);
			if (input)
			{
				input.focus();
				input.value = valueId;
				input.dispatchEvent(new Event('change'))

				return;
			}

			input = document.getElementById(`info${infoId}_values_${valueId}`);
			if (input && !input.checked)
			{
				input.focus();
				input.click();
			}
		},
		delay
	);
}