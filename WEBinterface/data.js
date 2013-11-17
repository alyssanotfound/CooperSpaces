//right now LL1 is 10 and LL2 is 11 and brooks lab is room 800
var buildingSnapshots = [
	//building for one interval
	[
		//floor 1
		{
			room101: {
				name:"101", 
				occupied: true,
				occupancy:32
			},
			room104: {
				name:"104", 
				occupied: false,
				occupancy:12 
			},
			room105: {
				name:"105", 
				occupied: false,
				occupancy:2
			},
			room106: {
				name:"106", 
				occupied: false,
				occupancy:60
			},

		},
		//floor 2
		{
			room201: {
				name:"201", 
				occupied: true,
				occupancy:32 
			},
			room202: {
				name:"201A", 
				occupied: true,
				occupancy:12
			}
		}
	],
	//building for next interval
	[
		{
			room101: {
				name:"101", 
				occupied: false,
				occupancy:32 
			},
			room104: {
				name:"104", 
				occupied: false,
				occupancy:12 
			},
			room105: {
				name:"105", 
				occupied: false,
				occupancy:2
			},
			room106: {
				name:"106", 
				occupied: false,
				occupancy:60
			}

		},
		{
			room201: {
				name:"201", 
				occupied: false,
				occupancy:32
			},
			room202: {
				name:"201A", 
				occupied: false,
				occupancy:12 
			}
		},
		{
			room416: {
				name:"416", 
				occupied: true,
				occupancy:32
			},
			room427: {
				name:"427", 
				occupied: true,
				occupancy:12 
			}
		}
	]	
];

var listOfRooms = [
101, 104, 105, 106, 201, 202, 305, 416, 427, 502, 503, 504, 505, 506, 616, 717, 800, 801, 802, 803, 804, 806 
]





