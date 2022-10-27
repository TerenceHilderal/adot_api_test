export type Payload = Array<Data>;

export type Data = {
	lat: number;
	lon: number;
	name: string;
};

export type Csv = {
	lat: number;
	lon: number;
	event_type: string;
};

export type ApiResponse = {
	lat: number;
	lon: number;
	name: string;
	impressions: number;
	clicks: number;
};

export type ResponseApi = {
	Chatelet: ApiResponse;
	Arc: ApiResponse;
};

export type ResponseInterestsPointImpressions = {
	chateletImps: number;
	arcImps: number;
};

export type ResponseInterestsPointClicks = {
	chateletClicks: number;
	arcClicks: number;
};

export type Unit = 'K' | 'N';
