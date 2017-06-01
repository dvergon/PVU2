var data1 = [92, 157, 590, 776, 2125, 3000];
var data2 = [37, 92, 277, 556, 1025, 1277];

var data3 = [2345, 1553, 2614, 3284, 7112];
var data4 = [2836, 13, 8023, 912, 4452];

var data5 = [20, 285, 2000, 4555];
var data6 = [33, 555, 1000, 1483];

//helpers for creating data for bar chart 
var a,b,c =[];
var dataArray =[];

//create Data for bar chart with regiones
//sum the last values of 2 Arrays example for calculating total amount of students -> used for calculation of % 
function getSum_ofLastValuesInArray(data1, data2){
    var dataSum = 0;
    dataSum += data1[data1.length-1];
    dataSum += data2[data2.length-1];
    //sum a random value, to not have 100% finalized school
    dataSum += 1000;
   return dataSum;
}
//create % -Data for Graph Chart: 
function createDataGraph(data1,data2){
    var sum = getSum_ofLastValuesInArray(data1,data2);
    var result = [];
    for (var i = 0; i < data1.length; i++) {
        result.push((data1[i]/sum) *100);
    }
    return result;
}

//reverse % to original values:
function reverseData(data, sum){
    var array;
    for (var i = 0; i < data.length; i++) {
      array.push((data[i]* sum)/100);
    }
    return array;
}

//mathematical round 
function round(value, precision) {
    var mult = Math.pow(10, precision || 0);
    return Math.round(value * mult) / mult;
}

//check the correct length
function equalLength(in1, in2){
    if(in1.length == in2.length){
        return true;
    }return false;
}

//calculate percentage
function calculatePercentage( total, val){
    return val/total *100;
}
//calculate percentage
function calculatePercentage2( total, val1, val2, val3){
    console.log(
    (val1/total *100)+' '+ (val2/total *100)+' '(val3/total *100));
}
/**creates Data for bar chart region 
creates: [feminino in % ,masculino in % ,sumArray, feminino, masculino] **/
function createDataRegion(in1, in2){
    var sumArray = [], out1 = [], out2 = [];
    //TODO test for equal length -> otherwise should rase a error 
    for (var i = 0; i < in1.length; i++) {
        sumArray.push(in1[i] + in2[i]);
        out1.push(round((in1[i]/sumArray[i]*100),2));
        out2.push(round((in2[i]/sumArray[i]*100),2));
    }
    /**[feminino in % ,masculino in % ,sumArray, feminino, masculino]   **/
    return [out1,out2,sumArray,in1, in2];
}

/** general Graph Series creator   **/
function createGeneralGraphSeries(dataArray){
     var result=[];
     console.log(dataArray)
     for (var i = 0; i < dataArray[0][18].length; i++) {
         result.push(dataArray[0][18][i]);
     }
    return result;
}

/** general BAr Series creator   **/
function createGeneralBarSeries(dataArray){
     var tmp;

        var tmpData1=[],tmpData2=[],tmpData3=[];
        //todo loop 
        for (var i = 3; i < 6; i++) {        
        //update y.value and myData
            //avanzado index 6
            tmp = {'y': dataArray[0][7][i], 'myData' : dataArray[0][6][i]};
            tmpData1.push(tmp);
            //terminado index 8
            tmp = {'y': dataArray[0][9][i], 'myData' : dataArray[0][8][i]};
            tmpData2.push(tmp);
            //sinAvance index 10
            tmp = {'y': dataArray[0][11][i], 'myData' : dataArray[0][10][i]};
            tmpData3.push(tmp);
        }    
        
        var result = [];
        result.push(tmpData1);
        result.push(tmpData2);
        result.push(tmpData3);
    return result;

}
/** ______________________________________________________start UPDATE GRAPH________________________________________________________________**/
//update Data for Graph 
function updateGraphData(type){
    // TODO check if update is necessary!
    var color = false;
    var chart = $('#container2').highcharts();
    //remove all series :
    while(chart.series.length > 0)
            chart.series[0].remove(true);
/** _____________________________________________  update GENERO   ____________________________________________________________________________________________ **/
    if(type == 'Genero'){ 
        //title:
        chart.setTitle({ text: 'Progresion segun sexo (periodo: 01/01/2017 - 30/07/2017)'});
        //TODO get new Values from original Data
        var tmp1 = [20, 285, 2000, 2555, 3666, 4000];
        var tmp2 = [33, 555, 1000, 1483, 2345, 3442];
        
        //set new data
        chart.addSeries({
                name: 'masculino',
                data: createDataGraph(tmp1,tmp2),
                marker: {
                    enabled: false
                    }
            },false);
        chart.addSeries({
                name: 'feminino',
                data: createDataGraph(tmp2,tmp1),
                marker: {
                    enabled: false
                    }
                 },false);
        chart.series[0].update({
            color: color ? null : colorGender[0] 
        });
        chart.series[1].update({
            color: color ? null : colorGender[1]
        });
    }
/** _____________________________________________  update GENERAL   ____________________________________________________________________________________________ **/
    if(type == 'General'){
        //title:
        chart.setTitle({ text: ' Progresion global (01/01/2017 - 30/07/2017) '});   
       //data:  
       //add new data in % -> between [0,100]
    

       chart.addSeries({
            'name': 'Avancado',
            'data' : createGeneralGraphSeries(getData()),
            'marker': {
                enabled : false
            }
        }
        ,false);
        //color:
        chart.series[0].update({
            color: color ? null : colorType[2] 
        });   
    }
/** _____________________________________________  update TYPO   ____________________________________________________________________________________________ **/
    if(type == 'Typo'){
        chart.setTitle({ text: ' Progresion segun tipo de establecimiento (01/01/2017 - 30/07/2017) '});
        chart.addSeries({
            'name': 'Muncipales',
            'data' : [0.01,14,43,50,76,79],
            'marker': {
                enabled : false
                }
            }
            ,false);

        chart.addSeries({
            'name': 'Particular Sub.',
            'data' : [0.01,1,13,30,36,49],
            'marker': {
                enabled : false
                }
            }
            ,false);

        chart.addSeries({
            'name': 'Particular',
            'data' : [1,4,23,50,71,79],
            'marker': {
                enabled : false
                }
            }
            ,false);

        //Color
        //muncipal
        chart.series[0].update({
            color: color ? null : colorSchools[0]
        });
        //particular Sub
        chart.series[1].update({
            color: color ? null : colorSchools[2] 
        });
        //particular
        chart.series[2].update({
            color: color ? null : colorSchools[1] 
        });
    }
    else{
        return
    } 
    //for all :  
    color = !color;   
    //apply changes and redraw()   
    chart.redraw();  
}
/** _____________________________________________________ end UPDATE GRAPH________________________________________________________________**/
/** ______________________________________________________________________________________________________________________________________**/


/** _____________________________________________________ start UPDATE BAR CHART ________________________________________________________________**/

/** update values in bar chart: 
creates: [feminino in % ,masculino in % ,sumArray, feminino, masculino]   **/
function updateDataRegion(type, in1, in2){
    //get Chart to update
    var tmp = createGeneralBarSeries(getData());
    var color= false;
    var chart = $('#container3').highcharts();
    //remove all series :
        while(chart.series.length > 0)
            chart.series[0].remove(true);
/** _____________________________________________  BAR CHART update GENERAL   ____________________________________________________________________________________________ **/
    if(type == 'General'){
        //title
        chart.setTitle({ text: 'Detalle de avance por regiones (%)'});
        //TODO set names of Regions 
        //chart.xAxis[0].setCategories(['region1', 'region2', 'region3']);
        //set data
        
        chart.addSeries( {
                name: 'Avanzando',
                data: tmp[0],
            },false);
        chart.addSeries( {
                name: 'Terminado',
                data: tmp[1],
            },false);
        chart.addSeries( {
                name: 'Sin Avance',
                data: tmp[2],
            },false);

          
        
        //set Color   
        chart.series[0].update({
            color: color ? null : colorType[0] 
        });
        chart.series[1].update({
            color: color ? null : colorType[1] 
        });
        chart.series[2].update({
            color: color ? null : colorType[2]  
        });
    }
/** _____________________________________________ BAR CHART update GENERO   ____________________________________________________________________________________________ **/

    if(type == 'Genero'){
        //resize Chart :
        //chart.setSize(400, 300);
        //title
        chart.setTitle({ text: 'detalle de finalizados segun region sexo (%)'});
        //TODO set names of Regions 
        //chart.xAxis[0].setCategories(['region1', 'region2', 'region3']);

        //set data:
        var sumArray = [], out1 = [], out2 = [];
        //TODO test for equal length 
        for (var i = 0; i < in1.length; i++) {
            sumArray.push(in1[i] + in2[i]);
            out1.push(round((in1[i]/sumArray[i]*100),2));
            out2.push(round((in2[i]/sumArray[i]*100),2));
        }
        var tmp1, tmp2;
        var tmpData1=[], tmpData2 =[];
        //update y.value and myData
        for (var i = 0; i < in1.length; i++) {
            tmp = {'y': out1[i], 'myData' : in1[i]};
            tmpData1.push(tmp);
            tmp = {'y': out2[i], 'myData' : in2[i]};
            tmpData2.push(tmp);
        }
        //add series:
        chart.addSeries({
                name: 'masculino',
                data: tmpData1,
            },false);

        chart.addSeries({
                name: 'feminino',
                data: tmpData2,
            },false);

        //color:
        chart.series[0].update({
            color: color ? null : colorGender[0]
        });
        chart.series[1].update({
            color: color ? null : colorGender[1]
        });        
    }
/** _____________________________________________BAR CHART  update TYPO   ____________________________________________________________________________________________ **/

    if(type == 'Typo'){
        //title
        chart.setTitle({ text: 'Prcentaje de finalizados segun region y tipo de establecimiento (%) '});

        //TODO set names of Regions 
        //chart.xAxis[0].setCategories(['region1', 'region2', 'region3']);

        chart.addSeries( {
                name: 'Muncipal',
                data: [{
                    /**[feminino in % ,masculino in % ,sumArray, feminino, masculino]   **/
                    y: dataArray[0][0],
                    myData: dataArray[3][0],
                }, {
                    y: dataArray[0][1],
                    myData: dataArray[3][1]
                }, {
                    y: dataArray[0][2],
                    myData: dataArray[3][2]
                }, {
                    y: dataArray[0][3],
                    myData: dataArray[3][2]
                }, {
                    y: dataArray[0][4],
                    myData: dataArray[3][4]
                }]
            },false);

         chart.addSeries( {
                name: 'Particular Sub.',
                data: [{
                    y: dataArray[1][0],
                    myData: dataArray[4][0]
                }, {
                    y: dataArray[1][1],
                    myData: dataArray[4][1]
                }, {
                    y: dataArray[1][2],
                    myData: dataArray[4][2]
                }, {
                    y: dataArray[1][3],
                    myData: dataArray[4][3]
                }, {
                    y: dataArray[1][4],
                    myData: dataArray[4][4]
                }]
            },false);
         
        chart.addSeries( {
                name: 'Particular',
                data: [{
                    y: dataArray[1][0],
                    myData: dataArray[4][0]
                }, {
                    y: dataArray[1][1],
                    myData: dataArray[4][1]
                }, {
                    y: dataArray[1][2],
                    myData: dataArray[4][2]
                }, {
                    y: dataArray[1][3],
                    myData: dataArray[4][3]
                }, {
                    y: dataArray[1][4],
                    myData: dataArray[4][4]
                }]
            },false);
           
        chart.series[0].update({
            color: color ? null : colorSchools[0] 
        });
        chart.series[1].update({
            color: color ? null : colorSchools[1] 
        });
        chart.series[2].update({
            color: color ? null : colorSchools[2]  
        }); 
    }
    else{
        return;
    } 
    //for all :  
    color = !color;  
    //apply changes and redraw()   
    chart.redraw();     
}
/** _____________________________________________________ end UPDATE BAR CHART ________________________________________________________________**/


/** _____________________________________________  create Graph  ____________________________________________________________________________________________ **/
//create Highchart: type = graph | bar , sum is the total amount of persons 
function createChartGraph(container, sum){
    Highcharts.chart(container, {
        chart: {
            type: 'spline'
        },
        title: {
            text: ' Progresion global (01/01/2017 - 30/07/2017) '
        },
        xAxis: {
            allowDecimals: false,
            categories: [
            'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN','JUL'
            ]
        },
        yAxis: {
            min:0,
            max:100,
            title: {
                text: 'Avancado en %',
            }, 
        },
        //remove Highcharts logo :
        credits: {
            enabled: false
        },
        tooltip: {
            formatter: function() {
                var s = '<b>'+'</b>';
                $.each(this.points, function(i, point) {
                    var tempcolor = point.series.color;
                    s += '<br/>'+ '<span style="color:'+ tempcolor+'">'+ point.series.name +' '+parseInt(point.y /100 * sum) +':</span> '+'<p>'+'  '+'('+ round(point.y,1)+'%) </p>';                });
                return s;
            },            
            shared: true,
            crosshairs: true
        },
        plotOptions: {
            area: {
                pointStart: 0,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    },                       
                }
            },
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal'
                    },
                    yAxis: {
                        labels: {
                            align: 'left',
                            x: 0,
                            y: -5
                        },
                        title: {
                            text: ''
                        }
                    },
                    subtitle: {
                        text: null
                    },
                    credits: {
                        enabled: false
                    }
                }
            }]
        },
        colors: [
         colorType[2]
        ],
        series: [{
            'name': 'Avancado',
            'data' : [0.01,14,43,50,76,79],
            'marker': {
                enabled : false
                }
            }],
    });
};

/** _____________________________________________  create Bar Chart  ____________________________________________________________________________________________ **/
function createChartBar(container, dataArray){
    Highcharts.chart(container, {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Detalle de avance por regiones (%)'
        },
        xAxis: {
            categories: ['de Tarapaca', 'de Afagasta', 'de Atacama', ' de Coquimbo', 'de Valpariso']
        },
        yAxis: {
            min: 1,
            max: 100,
            title: {
                text: 'students in %'
            }
        },
            //remove Highcharts logo :
            credits: {
                enabled: false
            },
            legend: {
                reversed: true
            },
            tooltip: {
                formatter: function() {
                    var s = '<b>'+'</b>';
                    $.each(this.points, function(i, point) {
                        var tempcolor = point.series.color;
                        s += '<br/>'+this.point.category + ': <span style="color:'+ tempcolor+'">'+ point.series.name + ' '+parseInt(this.point.myData) +':</span> '+'<p>'+'  '+'('+ round(point.y,1)+'%) </p>';
                    });
                    return s;
                },            
                shared: true,
                crosshairs: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: 'Sin Avance',
                data: [{
                    /**[feminino in % ,masculino in % ,sumArray, feminino, masculino]   **/
                    y: dataArray[0][0],
                    myData: dataArray[3][0],
                }, {
                    y: dataArray[0][1],
                    myData: dataArray[3][1]
                }, {
                    y: dataArray[0][2],
                    myData: dataArray[3][2]
                }, {
                    y: dataArray[0][3],
                    myData: dataArray[3][2]
                }, {
                    y: dataArray[0][4],
                    myData: dataArray[3][4]
                }]
            },
            {
                name: 'Avanzando',
                data: [{
                    y: dataArray[1][0],
                    myData: dataArray[4][0]
                }, {
                    y: dataArray[1][1],
                    myData: dataArray[4][1]
                }, {
                    y: dataArray[1][2],
                    myData: dataArray[4][2]
                }, {
                    y: dataArray[1][3],
                    myData: dataArray[4][3]
                }, {
                    y: dataArray[1][4],
                    myData: dataArray[4][4]
                }]
            },
            {
                name: 'Finalizado',
                data: [{
                    y: dataArray[1][0],
                    myData: dataArray[4][0]
                }, {
                    y: dataArray[1][1],
                    myData: dataArray[4][1]
                }, {
                    y: dataArray[1][2],
                    myData: dataArray[4][2]
                }, {
                    y: dataArray[1][3],
                    myData: dataArray[4][3]
                }, {
                    y: dataArray[1][4],
                    myData: dataArray[4][4]
                }]
            }],
            colors: [
                colorType[0], colorType[1],colorType[2]
            ]
        });
}




