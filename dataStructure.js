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




var avanzado      =	 [total, hombres, mujeres, public, private, sub ];
var avanzado_per  =  [total_per, hombres_per, mujeres_per, public_per, private_per, sub_per];
var terminado     =  [total, hombres, mujeres, public, private, sub ];
var terminado_per =  [total_per, hombres_per, mujeres_per, public_per, private_per, sub_per];
var sinAvance     =  [total, hombres, mujeres, public, private, sub ];
var sinAvance_per =  [total_per, hombres_per, mujeres_per, public_per, private_per, sub_per];

var public     	  = [total, hombres, mujeres];
var public_per    = [total_per, hombres_per, mujeres_per];
var private       = [total, hombres, mujeres];
var private_per   = [total_per, hombres_per, mujeres_per];
var sub           = [total, hombres, mujeres];
var sub_per       = [total_per, hombres_per, mujeres_per];

avancado_month_before = [avanzando_enero,avanzando_enero_per, avanzando_febrero, avanzando_enero_per ..]

var dataStruc = [                                           
    String: region_name,                //0 name of the region:                 = STRING 
    region_students_total               //1 amount of students total            = INT
    homres_total,                       //2 amunt of hombres                    = INT
    homres_total_per,                   //3 percent of hombres                  = INT
    mujeres_total,                      //4 amount of mujeres                   = INT
    mujeres_total_per,                  //5 percent of mujeres                  = INT 
    avanzado,                           //6 Array avancado : avanzado           = [total, hombres, mujeres, public, private, sub ]
    avanzado_per                        //7 Array percentage avancado_per       = [total_per, hombres_per, mujeres_per, public_per, private_per, sub_per];
    terminado,                          //8 Array terminado : terminado         = [total, hombres, mujeres, public, private, sub ]
    terminado_per,                      //9 Array percentage terminado_per      = [total_per, hombres_per, mujeres_per, public_per, private_per, sub_per];
    sinAvance,                          //10 Array sin Avance: sinAvance        = [total, hombres, mujeres, public, private, sub ]
    sinAvance_per,                      //11 Array percentage sin Avance_per    = [total_per, hombres_per, mujeres_per, public_per, private_per, sub_per];
    public,                             //12 public                             = [total, hombres, mujeres]
    public_per,                         //13 public_per                         = [total_per, hombres_per, mujeres_per];
    private,                            //14 private                            = [total, hombres, mujeres]
    private_per,                        //15 private_per                        = [total_per, hombres_per, mujeres_per];
    sub                                 //16 sub                                = [total, hombres, mujeres]
    sub_per                             //17 sub_per                            = [total_per, hombres_per, mujeres_per];
    avanzado_month_before               //18 Array : avancado_month_before      = [avanzando_enero,avanzando_enero_per, avanzando_febrero, avanzando_enero_per ..]
]


**/
//get data: 
function getData(){

	// build data array :

	//var avanzado  =	[total, hombres, mujeres, public, private, sub ];
	var avanzado  =	[30, 15, 15, 10, 10, 10 ];
	// avanzado_per	= [total_per, hombres_per, mujeres_per, public_per, private_per, sub_per];
	var avanzado_per = [20, 18.75, 21.43, 6.6, 6.6, 6.6]
	//var terminado = [total, hombres, mujeres, public, private, sub ];
	var terminado = [50, 20, 30, 5, 15, 30 ];
	// terminado_per	= [total_per, hombres_per, mujeres_per, public_per, private_per, sub_per];
	var terminado_per = [23.33, 25, 42.86, 3.33, 10, 20]
	//var sinAvance = [total, hombres, mujeres, public, private, sub ];
	var sinAvance = [70, 45, 25, 12, 28, 30 ];
	// sinAvance_per	= [total_per, hombres_per, mujeres_per, public_per, private_per, sub_per];
	var sinAvance_per = [46.66, 56.25, 35.71, 8, 18.66, 20]


	//var public    	= [total, hombres, mujeres];
	var public 			= [27, 15, 22];
	//var public_per  	= [total_per, hombres_per, mujeres_per];
	var public_per    	= [18, 18.75, 31.43];
	//var private    	= [total, hombres, mujeres];
	var private    		= [53, 23, 30];
	//var private_per   = [total_per, hombres_per, mujeres_per];
	var private_per   	= [35.33, 28.75, 42.86];
	//var sub        	= [total, hombres, mujeres];
	var sub        		= [70, 42, 18];
	//var sub_per       = [total_per, hombres_per, mujeres_per];
	var sub_per       	= [46.66, 52.3, 25.71];
	//data month before = [avanzando_enero,avanzando_enero_per, avanzando_febrero, avanzando_enero_per ..]
	var avanzado_month_before = [1, 22, 35, 50];

	var dataStruc = [	 					                    
		'chile', 							//0 name of the region: index 0 --> Chile total 
		150,								//1 amount of students total
		80,									//2 amunt of hombres
		53.33,								//3 hombres en percent 
		70,									//4 amount of mujeres
		46.66,								//5 mujeres en percent
		avanzado,							//6 avanzado 			= [total, hombres, mujeres, public, private, sub ]
		avanzado_per,						//7 avanzado_per		= [total_per, hombres_per, mujeres_per, public_per, private_per, sub_per];
		terminado,							//8 terminado 			= [total, hombres, mujeres, public, private, sub]
		terminado_per,						//9 terminado_per		= [total_per, hombres_per, mujeres_per, public_per, private_per, sub_per];
		sinAvance,							//10 sinAvance 			= [total, hombres, mujeres, public, private, sub ]
		sinAvance_per,						//11 sinAvance_per		= [total_per, hombres_per, mujeres_per, public_per, private_per, sub_per];
		public,								//12 public  			= [total, hombres, mujeres]
		public_per,							//13 var public_per  	= [total_per, hombres_per, mujeres_per];
		private,							//14 private 			= [total, hombres, mujeres]
		private_per,						//15 var private_per   	= [total_per, hombres_per, mujeres_per];
		sub, 								//16 sub    			= [total, hombres, mujeres]
		sub_per, 							//17 var sub_per       	= [total_per, hombres_per, mujeres_per];
		avanzado_month_before               //18 avancado_month_before  = [avanzando_enero,avanzando_enero_per, avanzando_febrero, avanzando_enero_per ..]
	]

	return dataStruc;
}

function calculatePercentage( total, val1, val2, val3){
	var tmp =[];
	tmp.push(val1/total *100);
	tmp.push(val2/total*100);
	tmp.push(val3/total*100);
	return tmp;


}

