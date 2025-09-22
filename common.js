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

function createPlanningInput(storageId, paramId, labelText)
{
	const storageInput   = getStorageInput(storageId);
	const storageWrapper = getElementById(`BuyPackerUserUserInfos${storageId}Wrapper`);
	if (!storageWrapper)
	{
		return;
	}

	// The following is redundant and will be refactored later
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
	input.placeholder = 'Cr\xE9er un planning';
	input.classList.add('planning');

	input.addEventListener('click', (e) =>
	{
		if (e.target.value !== '')
		{
			return;
		}
		e.target.value = '1LuMdSe';
		e.target.dispatchEvent(new Event('change', { bubbles: true }));

		const newRow = createPlanningRow(e.target.value, input);
		e.target.after(newRow);
		newRow.querySelector('select')?.focus();
	});

	const m = getParamRegexp(paramId).exec(storageInput.value);
	if (m)
	{
		input.value = m[1];
	}

	const planningRegexp = /[1234](?:Lu|Ma|Me|Je|Ve)(?:Md|Mf|Ap)(?:Fr|Se|Su)/g;
	const matches = storageInput.value.match(planningRegexp);

	if (matches)
	{
		for (const planning of matches)
		{
			div.appendChild(createPlanningRow(planning, input));
		}
	}

	input.addEventListener('change', onCustomInputChange);
	storageWrapper.before(div);
}

function createPlanningRow(planning, input)
{
	const [, week, day, time, type] = /^([1234])(Lu|Ma|Me|Je|Ve)(Md|Mf|Ap)(Fr|Se|Su)$/.exec(planning);
	const weeks = {
		'1': "1\u1D49\u02B3",
		'2': "2\u207F\u1D48",
		'3': "3\u1D49",
		'4': "4\u1D49"
	};
	const days = {
		'Lu': 'lundi',
		'Ma': 'mardi',
		'Me': 'mercredi',
		'Je': 'jeudi',
		'Ve': 'vendredi'
	};
	const times = {
		'Md': '8h30',
		'Mf': '10h',
		'Ap': '14h'
	};
	const types = {
		'Fr': 'Frais',
		'Se': 'Sec',
		'Su': 'Surgelés'
	};

	const container = document.createElement('div');
	container.classList.add(`${nsPrefix}-planning-row`);

	const weekSelect = createPlanningSelect(weeks, week);
	const daySelect  = createPlanningSelect(days,  day);
	const timeSelect = createPlanningSelect(times, time);
	const typeSelect = createPlanningSelect(types, type);

	const addButton = document.createElement('button');
	addButton.textContent = '+';
	addButton.type = 'button';
	addButton.classList.add('add');

	addButton.addEventListener('click', (e) =>
	{
		const currentRow = e.target.parentNode;
		const selects = currentRow.querySelectorAll('select');
		let planningString = '';
		for (const select of selects)
		{
			planningString += select.value;
		}

		const newRow = createPlanningRow(planningString, input);
		currentRow.after(newRow);
	});

	const removeButton = document.createElement('button');
	removeButton.textContent = '\u00D7';
	removeButton.type = 'button';
	removeButton.classList.add('remove');

	removeButton.addEventListener('click', (e) =>
	{
		const row = e.target.parentNode;
		const root = row.parentNode;
		row.remove();

		const anyRemainingSelect = root.querySelector('select');
		if (anyRemainingSelect)
		{
			anyRemainingSelect.dispatchEvent(new Event('change', { bubbles: true }));
		}
		else
		{
			const input = root.querySelector('input');
			if (input)
			{
				input.value = '';
				input.dispatchEvent(new Event('change', { bubbles: true }));
			}
		}
	});

	container.appendChild(removeButton);
	container.appendChild(weekSelect);
	container.appendChild(daySelect);
	container.appendChild(timeSelect);
	container.appendChild(typeSelect);
	container.appendChild(addButton);

	function createPlanningSelect(options, selectedValue)
	{
		const select = createSelect(options, selectedValue);
		select.addEventListener('change', onPlanningChange);

		return select;
	}

	function encodePlanningOrder(planning)
	{
		const replacements = {
			'Lu': '1', 'Ma': '2', 'Me': '3', 'Je': '4', 'Ve': '5', // days
			'Md': '1', 'Mf': '2', 'Ap': '3',                       // time
			'Se': '1', 'Fr': '2', 'Su': '3'                        // type
		};

		return planning.replace(
			/[A-Z][a-z]/g,
			(match) => replacements[match] || match
		);
	}

	function comparePlannings(a, b)
	{
		const encodedA = encodePlanningOrder(a);
		const encodedB = encodePlanningOrder(b);
		return encodedA.localeCompare(encodedB);
	}

	function onPlanningChange(e)
	{
		const root      = e.target.parentNode.parentNode;
		const input     = root.querySelector('input');
		const plannings = [];

		const rows = root.querySelectorAll(`.${nsPrefix}-planning-row`);
		for (const row of rows)
		{
			const selects = row.querySelectorAll('select');
			let planningString = '';
			for (const select of selects)
			{
				planningString += select.value;
			}
			plannings.push(planningString);
		}

		const uniquePlannings = [...new Set(plannings)];
		input.value = uniquePlannings.sort(comparePlannings).join('');

		const changeEvent = new Event('change', { bubbles: true });
		input.dispatchEvent(changeEvent);
	}

	return container;
}

function createSelect(options, selectedValue)
{
	const select = document.createElement('select');
	for (const [value, text] of Object.entries(options))
	{
		const option = document.createElement('option');
		option.value = value;
		option.textContent = text;
		if (value === selectedValue)
		{
			option.selected = true;
		}
		select.appendChild(option);
	}
	return select;
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
		console.error('Impossible de mettre à jour "%s"', paramId);
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
