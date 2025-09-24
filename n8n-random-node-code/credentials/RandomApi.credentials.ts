import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class RandomApi implements ICredentialType {
	name = 'randomNodeCredential';
	displayName = 'API for random number generation';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	// Não foi implementado um teste para a credencial, pois o endpoint fornecido não exige uma API Key. Contudo, se for necessário adicionar uma chave para outros recursos, basta alterar a classe e adicionar um teste confome o indicado na documentação oficial disponível em: https://docs.n8n.io/integrations/creating-nodes/build/reference/credentials-files/
}
