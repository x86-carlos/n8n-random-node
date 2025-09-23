import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class Random implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random',
		name: 'random',
		icon: 'file:integral.svg',
		group: ['transform'],
		version: 1,
		description: 'Conector que retorna um número aleatório num intervalo definido pelo usuário',
		defaults: {
			name: 'random',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'randomNodeCredential',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Gerar',
						value: 'gerar',
					},
				],
				noDataExpression: true,
				description: 'Gera um número aleatório',
				default: 'gerar',
			},

			{
				displayName: 'Options',
				name: 'option',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'gerar',
						],
					},
				},
				noDataExpression: true,
				options: [
					{
						name: 'Gerar',
						value: 'gerar',
						action: 'Gerar um número aleatório',
						description: 'Gerar um número aleatório no intervalo especificado',
					},
				],
				default: 'gerar',
			},

			{
				displayName: 'Min',
				name: 'minNumber',
				required: true,
				type: 'number',
				typeOptions: {
					numberPrecision:0,
				},
				displayOptions: {
					show: {
						resource: [
							'gerar',	
						],
						operation: [
							'gerar',
						],
					},
				},
				default: 1,
			},

			{
				displayName: 'Max',
				name: 'maxNumber',
				required: true,
				type: 'number',
				typeOptions: {
					numberPrecision:0,
				},
				displayOptions: {
					show: {
						resource: [
							'gerar',	
						],
						operation: [
							'gerar',
						],
					},
				},
				default: 1,
			},
		], //End Properties
	}; //End Description

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('option', 0) as string;
		const returnData = [];
		let responseData;

		if(resource === 'gerar' && operation === 'gerar') {
			const min = this.getNodeParameter('minNumber', 0) as string;
			const max = this.getNodeParameter('maxNumber', 0) as string;
			const options = {
				headers: {
					'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				},
				uri: `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`,
			};
			
			try {
				responseData = await this.helpers.requestWithAuthentication.call(this,'randomNodeCredential', options);


				returnData.push(responseData);

			} catch(error) {
				throw new Error(`Random Number Generato API error: ${error.message}`);
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}

} //End Class
