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
				occupied: true,
				occupancy:12 
			},
			room105: {
				name:"105", 
				occupied: true,
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
		}
	]	
];





