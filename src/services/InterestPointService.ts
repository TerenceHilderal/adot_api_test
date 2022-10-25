import csvParser from 'csv-parser';
import path from 'path';
import fs from 'fs';
import { Csv, Unit } from '../types/type';
import POI from '../data/points-of-interest.json';

export class InterestPointService {
	static loadEvents(): Promise<Array<Csv>> {
		const eventsArray: Array<Csv> = [];
		return new Promise((resolve, reject) => {
			fs.createReadStream(path.join(__dirname, '../data/events-copy.csv'))
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

	static distanceBetweenInterestPointAndEvent(
		lat1: number,
		lon1: number,
		lat2: number,
		lon2: number,
		unit: Unit,
	): number {
		if (lat1 == lat2 && lon1 == lon2) {
			return 0;
		} else {
			var radlat1 = (Math.PI * lat1) / 180;
			var radlat2 = (Math.PI * lat2) / 180;
			var theta = lon1 - lon2;
			var radtheta = (Math.PI * theta) / 180;
			var dist =
				Math.sin(radlat1) * Math.sin(radlat2) +
				Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
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

	static eventsData() {
		let chateletImp = 0;
		let chateletClick = 0;
		let arcClick = 0;
		let arcImp = 0;
		this.loadEvents().then((datas) => {
			for (const data of datas) {
				({ chateletClick, arcClick } =
					InterestPointService.pointInterestClicks(
						data,
						chateletClick,
						arcClick,
					));

				({ chateletImp, arcImp } =
					InterestPointService.pointInterestImpressions(
						data,
						chateletImp,
						arcImp,
					));
			}
		});
		return {
			Chatelet: {
				...POI[0],
				impressions: chateletImp,
				clicks: chateletClick,
			},
			Arc: {
				...POI[1],
				impressions: arcImp,
				clicks: arcClick,
			},
		};
	}

	private static pointInterestImpressions(
		data: Csv,
		chateletImp: number,
		arcImp: number,
	) {
		if (
			this.distanceBetweenInterestPointAndEvent(
				48.86,
				2.35,
				data.lat,
				data.lon,
				'K',
			) <
				this.distanceBetweenInterestPointAndEvent(
					48.8759992,
					2.3481253,
					data.lat,
					data.lon,
					'K',
				) &&
			data.event_type === 'imp'
		) {
			chateletImp++;
		} else if (
			this.distanceBetweenInterestPointAndEvent(
				48.86,
				2.35,
				data.lat,
				data.lon,
				'K',
			) >
				this.distanceBetweenInterestPointAndEvent(
					48.8759992,
					2.3481253,
					data.lat,
					data.lon,
					'K',
				) &&
			data.event_type === 'imp'
		) {
			arcImp++;
		}
		return { chateletImp, arcImp };
	}

	private static pointInterestClicks(
		data: Csv,
		chateletClick: number,
		arcClick: number,
	) {
		if (
			this.distanceBetweenInterestPointAndEvent(
				48.86,
				2.35,
				data.lat,
				data.lon,
				'K',
			) <
				this.distanceBetweenInterestPointAndEvent(
					48.8759992,
					2.3481253,
					data.lat,
					data.lon,
					'K',
				) &&
			data.event_type === 'click'
		) {
			chateletClick++;
		} else if (
			this.distanceBetweenInterestPointAndEvent(
				48.86,
				2.35,
				data.lat,
				data.lon,
				'K',
			) >
				this.distanceBetweenInterestPointAndEvent(
					48.8759992,
					2.3481253,
					data.lat,
					data.lon,
					'K',
				) &&
			data.event_type === 'click'
		) {
			arcClick++;
		}
		return { chateletClick, arcClick };
	}
}
