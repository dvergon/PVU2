//data structure try_run:

/** 

// 15 regions + chile total -> 16 


var avanzado  =	[total, hombres, mujeres, public, private, sub ];
var terminado = [total, hombres, mujeres, public, private, sub ];
var sinAvance = [total, hombres, mujeres, public, private, sub ];

var public     = [total, hombres, mujeres];
var private    = [total, hombres, mujeres];
var sub        = [total, hombres, mujeres];


var dataStruc = [	 					                    
	String: region_name, 				// name of the region: index 0 --> Chile total 
	region_students_total 				// amount of students total
	homres_total,						// ampunt of hombres 
	mujeres_total,					    // amount of mujeres
	avanzado,							// Array avancado : avanzado = [total, hombres, mujeres, public, private, sub ]
	terminado,							// Array terminado : terminado = [total, hombres, mujeres, public, private, sub ]
	sinAvance,							// sinAvance = [total, hombres, mujeres, public, private, sub ]
	
	public,								// public  = [total, hombres, mujeres]
	private,							// private = [total, hombres, mujeres]
	sub 								// sub     = [total, hombres, mujeres]
]



avancado en % : (x / students_total) * 100
-> x = avanzado[total]   	// for General 
-> x = homres_total			// for Gender Graph
-> x = mujeres_total		// for Gender Graph
-> x = avanzado[public]     // for Type of school Graph
-> x = avanzado[private]    // for Type of school Graph 
-> x = avanzado[sub]     	// for Type of school Graph

avancado en %  region :  x / region_students_total * 100
-> x = avanzado[hombres] 	// for Gender Bar
-> x = avanzado[mujeres]  	// for Gender Bar
-> x = avanzado[public]     // for Type of school Bar
-> x = avanzado[private]    // for Type of school Bar 
-> x = avanzado[sub]     	// for Type of school Bar


terminado en % : (x / students_total) * 100
-> x = teminado[total]   	// for General 
-> x = homres_total			// for Gender Graph
-> x = mujeres_total		// for Gender Graph
-> x = teminado[public]     // for Type of school Bar
-> x = teminado[private]    // for Type of school Bar 
-> x = teminado[sub]     	// for Type of school Bar

teminado en %  region :  x / region_students_total * 100
-> x = teminado[hombres] 	// for Gender Bar
-> x = teminado[mujeres]  	// for Gender Bar
-> x = teminado[public]     // for Type of school Bar
-> x = teminado[private]    // for Type of school Bar 
-> x = teminado[sub]     	// for Type of school Bar

sinAvance en % : (x / students_total) * 100
-> x = sinAvance[total]   	// for General 
-> x = homres_total			// for Gender Graph
-> x = mujeres_total		// for Gender Graph
-> x = sinAvance[public]    // for Type of school Bar
-> x = sinAvance[private]   // for Type of school Bar 
-> x = sinAvance[sub]     	// for Type of school Bar

sinAvance en %  region :  x / region_students_total * 100
-> x = sinAvance[hombres] 	// for Gender Bar
-> x = sinAvance[mujeres]  	// for Gender Bar
-> x = sinAvance[public]    // for Type of school Bar
-> x = sinAvance[private]   // for Type of school Bar 
-> x = sinAvance[sub]     	// for Type of school Bar

**/

function getData(){

	// build data array :

	//var avanzado  =	[total, hombres, mujeres, public, private, sub ];
	var avanzado  =	[30, 15, 15, 10, 10, 10 ];
	//var terminado = [total, hombres, mujeres, public, private, sub ];
	var terminado = [50, 20, 30, 5, 15, 30 ];
	//var sinAvance = [total, hombres, mujeres, public, private, sub ];
	var sinAvance = [70, 45, 25, 12, 28, 30 ];


	//var public     = [total, hombres, mujeres];
	var public     = [27, 15, 22];
	//var private    = [total, hombres, mujeres];
	var private    = [53, 23, 30];
	//var sub        = [total, hombres, mujeres];
	var sub        = [70, 42, 18];


	var dataStruc = [	 					                    
		'chile', 				// name of the region: index 0 --> Chile total 
		150,								// amount of students total
		80,									// ampunt of hombres 
		70,									// amount of mujeres
		avanzado,							// Array avancado : avanzado = [total, hombres, mujeres, public, private, sub ]
		terminado,							// Array terminado : terminado = [total, hombres, mujeres, public, private, sub ]
		sinAvance,							// sinAvance = [total, hombres, mujeres, public, private, sub ]
		
		public,								// public  = [total, hombres, mujeres]
		private,							// private = [total, hombres, mujeres]
		sub 								// sub     = [total, hombres, mujeres]
	]


	return dataStruc;
}