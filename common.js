const nsPrefix = 'ludoba13';

function autoCheck(checkboxId)
{
	const checkbox = document.getElementById(checkboxId);
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

function createCustomTextField(storageId, paramId, labelText)
{
	const storageInput   = getStorageInput(storageId);
	const storageWrapper = getElementById(`BuyPackerUserUserInfos${storageId}Wrapper`);
	if (!storageWrapper)
	{
		return;
	}

	const div   = document.createElement('div');
	const label = div.appendChild(document.createElement('label'));
	const input = div.appendChild(document.createElement('input'));
	const id    = `${nsPrefix}_custom_${storageId}_${paramId}`;

	div.classList.add(nsPrefix);

	label.textContent = labelText;
	label.setAttribute('for', id);
	input.id = id;
	input.dataset.paramId = paramId;
	input.dataset.storageId = storageId;
	input.type = 'text';

	const m = getParamRegexp(paramId).exec(storageInput.value);
	if (m)
	{
		input.value = m[1];
	}

	input.addEventListener('change', onCustomInputChange);
	storageWrapper.before(div);
}

function getParamRegexp(paramId)
{
	return new RegExp('\\$' + paramId + ':([^$]*)\\$');
}

function onCustomInputChange(e)
{
	const target       = e.target;
	const paramId      = target.dataset.paramId;
	const storageId    = target.dataset.storageId;
	const storageInput = getStorageInput(storageId);
	if (!storageInput)
	{
		console.log('Impossible de mettre à jour "%s"', paramId);
		return;
	}

	const regexp = getParamRegexp(paramId);
	if (!regexp.test(storageInput.value))
	{
		storageInput.value += '$' + paramId + ':$';
	}

	storageInput.value = storageInput.value.replace(
		getParamRegexp(paramId),
		() => '$' + paramId + ':' + target.value + '$'
	);
}

function getStorageInput(storageId)
{
	const storageInput = getElementById('BuyPackerUserUserInfos' + storageId);
	if (!storageInput)
	{
		console.log('Impossible de mettre à jour "%s"', paramId);
	}

	return storageInput;
}

function getElementById(id)
{
	const element = document.getElementById(id);
	if (!element)
	{
		console.debug('Cannot find element %s', '#' + id);
	}

	return element;
}
