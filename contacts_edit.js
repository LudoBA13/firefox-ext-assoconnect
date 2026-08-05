function doIt()
{
	const style = document.getElementById('usersMultiple')?.getAttribute('style') || '';
	if (!style.includes('none'))
	{
		// If the #usersMultiple section isn't hidden with display:none it means
		// there's already a relationship
		return;
	}

	// "Structure de rattachement" field
	const structEl   = document.getElementById('BuyPackerUserUserInfos178799');
	const structName = structEl?.value;
	if (!structName)
	{
		return;
	}

	const button = document.createElement('button');
	button.dataset.value = structName;
	button.style.width = '100%';
	button.textContent = 'Ajouter la relation structure';

	button.onclick = function (e)
	{
		e.preventDefault();

		const helper = document.getElementById('usersHelper');
		helper.scrollIntoView();
		helper.value = e.target.dataset.value;
		helper.focus({ focusVisible: true });
		helper.click();
	};

	structEl.after(button);
}

doIt();