import csvParser from 'csv-parser';
import path from 'path';
import fs from 'fs';
import { Csv, Payload, ResponseApi, ResponseInterestsPointImpressions, ResponseInterestsPointClicks, Unit } from '../types/type';

export class InterestPointService {
	static loadEvents(): Promise<Array<Csv>> {
		const eventsArray: Array<Csv> = [];
		return new Promise((resolve, reject) => {
			fs.createReadStream(path.join(__dirname, '../data/events.csv'))
				.pipe(csvParser())
				.on('data', (data: Csv) => eventsArray.push(data))
				.on('error', (err) => {
					console.log(err);
				})
				.on('end', () => {
					resolve(eventsArray);
				});
		});
	}

	static distanceBetweenInterestPointAndEvent(lat1: number, lon1: number, lat2: number, lon2: number, unit: Unit): number {
		if (lat1 == lat2 && lon1 == lon2) {
			return 0;
		} else {
			const radlat1 = (Math.PI * lat1) / 180;
			const radlat2 = (Math.PI * lat2) / 180;
			const theta = lon1 - lon2;
			const radtheta = (Math.PI * theta) / 180;
			let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
			if (dist > 1) {
				dist = 1;
			}
			dist = Math.acos(dist);
			dist = (dist * 180) / Math.PI;
			dist = dist * 60 * 1.1515;
			if (unit == 'K') {
				dist = dist * 1.609344;
			}
			if (unit == 'N') {
				dist = dist * 0.8684;
			}
			return dist;
		}
	}

	static async eventsData(dataR: Payload): Promise<ResponseApi> {
		let chateletImps = 0;
		let chateletClicks = 0;
		let arcClicks = 0;
		let arcImps = 0;
		await this.loadEvents().then((datas) => {
			for (const data of datas) {
				({ chateletClicks, arcClicks } = InterestPointService.pointInterestClicks(data, chateletClicks, arcClicks));

				({ chateletImps, arcImps } = InterestPointService.pointInterestImpressions(data, chateletImps, arcImps));
			}
		});

		return {
			Chatelet: {
				...dataR[0],
				impressions: chateletImps,
				clicks: chateletClicks,
			},
			Arc: {
				...dataR[1],
				impressions: arcImps,
				clicks: arcClicks,
			},
		};
	}

	static pointInterestImpressions(data: Csv, chateletImps: number, arcImps: number): ResponseInterestsPointImpressions {
		if (
			this.distanceBetweenInterestPointAndEvent(48.86, 2.35, data.lat, data.lon, 'K') < this.distanceBetweenInterestPointAndEvent(48.8759992, 2.3481253, data.lat, data.lon, 'K') &&
			data.event_type === 'imp'
		) {
			chateletImps++;
		} else if (
			this.distanceBetweenInterestPointAndEvent(48.86, 2.35, data.lat, data.lon, 'K') > this.distanceBetweenInterestPointAndEvent(48.8759992, 2.3481253, data.lat, data.lon, 'K') &&
			data.event_type === 'imp'
		) {
			arcImps++;
		}
		return { chateletImps, arcImps };
	}

	static pointInterestClicks(data: Csv, chateletClicks: number, arcClicks: number): ResponseInterestsPointClicks {
		if (
			this.distanceBetweenInterestPointAndEvent(48.86, 2.35, data.lat, data.lon, 'K') < this.distanceBetweenInterestPointAndEvent(48.8759992, 2.3481253, data.lat, data.lon, 'K') &&
			data.event_type === 'click'
		) {
			chateletClicks++;
		} else if (
			this.distanceBetweenInterestPointAndEvent(48.86, 2.35, data.lat, data.lon, 'K') > this.distanceBetweenInterestPointAndEvent(48.8759992, 2.3481253, data.lat, data.lon, 'K') &&
			data.event_type === 'click'
		) {
			arcClicks++;
		}
		return { chateletClicks, arcClicks };
	}
}
