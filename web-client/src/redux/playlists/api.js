import { apiRequest } from '@utils/fetch';

const mockPlaylists = [
	{
		id: '1',
		name: 'Major Scale Blah Blah Blah',
		image: '/c1.jpg',
		lessonsCount: 5,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
		favoriteCount: 10,
		difficulty: 'Intermediate',
		tags: ['first', 'second', 'third', 'something'],
	},
	{
		id: '2',
		name: 'Second pllaylist',
		image: '/c2.jpg',
		lessonsCount: 3,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
		favoriteCount: 10,
		difficulty: 'Intermediate',
		tags: ['first', 'second', 'third', 'something'],
	},
	{
		id: '3',
		name: 'First playlist',
		image: '/c1.jpg',
		lessonsCount: 5,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
		favoriteCount: 10,
		difficulty: 'Intermediate',
		tags: ['first', 'second', 'third', 'something'],
	},
	{
		id: '4',
		name: 'Second pllaylist',
		image: '/c2.jpg',
		lessonsCount: 3,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
		favoriteCount: 10,
		difficulty: 'Intermediate',
		tags: ['first', 'second', 'third', 'something'],
	},
	{
		id: '5',
		name: 'First playlist',
		image: '/c1.jpg',
		lessonsCount: 5,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
		favoriteCount: 10,
		difficulty: 'Intermediate',
		tags: ['first', 'second', 'third', 'something'],
	},
	{
		id: '11',
		name: 'Major Scale Blah Blah Blah',
		image: '/c1.jpg',
		lessonsCount: 5,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
		favoriteCount: 10,
		difficulty: 'Intermediate',
		tags: ['first', 'second', 'third', 'something'],
	},
	{
		id: '12',
		name: 'Second pllaylist',
		image: '/c2.jpg',
		lessonsCount: 3,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
		favoriteCount: 10,
		difficulty: 'Intermediate',
		tags: ['first', 'second', 'third', 'something'],
	},
	{
		id: '13',
		name: 'First playlist',
		image: '/c1.jpg',
		lessonsCount: 5,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
		favoriteCount: 10,
		difficulty: 'Intermediate',
		tags: ['first', 'second', 'third', 'something'],
	},
	{
		id: '14',
		name: 'Second pllaylist',
		image: '/c2.jpg',
		lessonsCount: 3,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
		favoriteCount: 10,
		difficulty: 'Intermediate',
		tags: ['first', 'second', 'third', 'something'],
	},
	{
		id: '15',
		name: 'First playlist',
		image: '/c1.jpg',
		lessonsCount: 5,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
		favoriteCount: 10,
		difficulty: 'Intermediate',
		tags: ['first', 'second', 'third', 'something'],
	},
];

const fetchPlaylistsQuery = () => `query {
 courses {
  id, name, description, coverSrc, tags {id, name}, author {id}
}
}`;

export const fetchPlaylists = async () => apiRequest({ query: fetchPlaylistsQuery() });
