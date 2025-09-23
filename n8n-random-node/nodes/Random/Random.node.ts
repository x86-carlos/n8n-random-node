import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

// Criar classe para o conector
export class Random implements INodeType {
	description: INodeTypeDescription = {
		// Descrição do conector
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
			// Definir qual recurso da API o conector irá utilizar
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'GET random.org/integers',
						value: 'getResource',
					},
				],
				noDataExpression: true,
				description: 'Gera um número aleatório',
				default: 'getResource',
			},

			// Definir operação executada pelo conector
			{
				displayName: 'Options',
				name: 'option',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'getResource',
						],
					},
				},
				noDataExpression: true,
				options: [
					{
						name: 'True Random Number Generator',
						value: 'operationGerar',
						action: 'Gerar um número aleatório',
						description: 'Gerar um número aleatório no intervalo especificado',
					},
				],
				default: 'operationGerar',
			},

			// Definir campos númericos 'Mínimo' e 'Máximo'
			{
				displayName: 'Min',
				name: 'minNumber',
				required: true,
				type: 'number',
				typeOptions: {
					numberPrecision:0,
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
				default: 100,
			},
		], 
	}; 

	// Função para realizar consulta na API
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('option', 0) as string;
		const returnData = [];
		let responseData;
		
		for(let i = 0; i < items.length; i++){
			if(resource === 'getResource' && operation === 'operationGerar') {
				const min = this.getNodeParameter('minNumber', 1) as string;
				const max = this.getNodeParameter('maxNumber', 1) as string;
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
		}
		return [this.helpers.returnJsonArray(returnData)];
	}

} 
