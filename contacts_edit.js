function getElementById(id)
{
	const element = document.getElementById(id);
	if (!element)
	{
		console.debug('Cannot find element %s', '#' + id);
	}

	return element;
}

function copyStructureRelation()
{
	const usersSelector = getElementById('usersHelper');
	if (!usersSelector)
	{
		return;
	}

	// Structure de rattachement
	const input = getElementById('BuyPackerUserUserInfos178799');
	const names = input?.value;
	if (!names)
	{
		return;
	}

	for (const name of names.split('|'))
	{
		const button = document.createElement('button');
		button.innerText = `Ajouter ${name}`;
		button.classList.add('ludoba13');

		button.addEventListener(
			'click',
			function (e)
			{
				e.preventDefault();

				usersSelector.value = name;
				usersSelector.focus();
				usersSelector.click();
			}
		);
		usersSelector.before(button);
	}

	if (!document.querySelector('#usersMultiple li.formUserMultipleItem'))
	{
		window.location.hash = '#usersWrapper';
	}
}

copyStructureRelation();