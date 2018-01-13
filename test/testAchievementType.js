/*
 * Copyright (C) 2016  Max Prettyjohns
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

import bookbrainzData from './bookshelf';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {truncateTables} from '../lib/util';


chai.use(chaiAsPromised);
const {expect} = chai;
const {AchievementType, bookshelf} = bookbrainzData;

describe('AchievementType model', () => {
	afterEach(() => truncateTables(bookshelf, ['bookbrainz.achievement_type']));

	it('should return a JSON object with correct keys when saved', () => {
		const achievementTypePromise = new AchievementType({
			badgeUrl: 'http://test.com',
			description: 'test achievement',
			id: 1,
			name: 'test achievement'
		})
			.save(null, {method: 'insert'})
			.then((model) => model.refresh())
			.then((achievementType) => achievementType.toJSON());

		return expect(achievementTypePromise).to.eventually.have.all.keys([
			'id', 'name', 'description', 'badgeUrl'
		]);
	});
});
