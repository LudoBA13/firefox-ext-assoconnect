const nsPrefix = 'ludoba13';

function getStorageInput(storageId)
{
	const storageInput = document.getElementById('BuyPackerUserUserInfos' + storageId);
	if (!storageInput)
	{
		console.log('Impossible de mettre à jour');
	}

	return storageInput;
}
