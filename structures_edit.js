createCustomField(152755, 'ud', 'UD');

function createCustomField(storageId, paramId, labelText)
{
	const storageInput   = getStorageInput(storageId);
	const storageWrapper = document.getElementById(`BuyPackerUserUserInfos${storageId}Wrapper`);
	if (!storageWrapper)
	{
		console.debug(`BuyPackerUserUserInfos${storageId}Wrapper`);
		return;
	}

	const div   = document.createElement('div');
	const label = div.appendChild(document.createElement('label'));
	const input = div.appendChild(document.createElement('input'));
	const uid   = '_' + Math.random().toString(36).slice(2, 10);

	div.classList.add('ludoba13');

	label.textContent = labelText;
	label.setAttribute('for', uid);
	input.id = uid;
	input.dataset.paramId = paramId;
	input.dataset.storageId = storageId;
	input.type = 'text';

	const m = getParamRegexp(paramId).exec(storageInput.value);
	console.dir(getParamRegexp(paramId));
	console.dir(storageInput.value);
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
		console.log(`Impossible de mettre à jour "${paramId}"`);
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
	const storageInput = document.getElementById('BuyPackerUserUserInfos' + storageId);
	if (!storageInput)
	{
		console.log(`Impossible de mettre à jour "${paramId}"`);
	}

	return storageInput;
}