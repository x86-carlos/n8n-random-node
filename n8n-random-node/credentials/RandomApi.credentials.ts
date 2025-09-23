import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class RandomApi implements ICredentialType {
	name = 'randomNodeCredential';
	displayName = 'API for random number generation';
}
