/*
    ioBroker.vis my-alarmviewer Widget-Set

    version: "0.0.1"

    Copyright 2023 Kamran Mustafayev gokturk413@gmail.com
*/
"use strict";

/* global $, vis, systemDictionary */

// add translations for edit mode
$.extend(
    true,
    systemDictionary,
    {
        // Add your translations here, e.g.:
        // "size": {
        // 	"en": "Size",
        // 	"de": "Größe",
        // 	"ru": "Размер",
        // 	"pt": "Tamanho",
        // 	"nl": "Grootte",
        // 	"fr": "Taille",
        // 	"it": "Dimensione",
        // 	"es": "Talla",
        // 	"pl": "Rozmiar",
        //  "uk": "Розмір"
        // 	"zh-cn": "尺寸"
        // }
    }
);

var mydata;
// this code can be placed directly in my-alarmviewer.html

vis.binds["my-alarmviewer"] = {
    version: "0.0.1",
    showVersion: function () {
        if (vis.binds["my-alarmviewer"].version) {
            console.log('Version my-alarmviewer: ' + vis.binds["my-alarmviewer"].version);
            vis.binds["my-alarmviewer"].version = null;
        }
    },
    alarmviewer:{

    createWidget: function (widgetID, view, data, style) {
        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds["my-alarmviewer"].alarmviewer.createWidget(widgetID, view, data, style);
            }, 100);
        }

        var text = '';
        /*text += 'oid: ' + data.oid_Json + '</div><br>';
        text += 'oid value: <span class="myset-value">' + vis.states[data.oid_Json + '.val'] + '</span><br>';
        text += 'Color: <span style="color: ' + data.myColor + '">' + data.myColor + '</span><br>';
        text += 'extraAttr: ' + data.extraAttr + '<br>';
        text += 'Browser instance: ' + vis.instance + '<br>';*/
        text += 'htmlText: <div id="alarm-table"></div><audio id="myAlarmAudio" muted="muted" controls loop><source id="playerSource" src="widgets/my-alarmviewer/sounds/Fire_pager.mp3" type="audio/ogg">Your browser does not support the audio element.</audio>';
        
        var alarmtable='';
        createTable();


        //$('#' + widgetID).html(text);

        // subscribe on updates of value
        function onChange(e, newVal, oldVal) {
            $div.find('.my-alarmviewer-value').html(newVal);
            alarmtable.setData(newVal);
            checkalarmforSound();
        }
        if (data.oid_Json) {
            vis.states.bind(data.oid_Json + '.val', onChange);
            //remember bound state that vis can release if didnt needed
            $div.data('bound', [data.oid_Json + '.val']);
            //remember onchange handler to release bound states
            $div.data('bindHandler', onChange);
        }
        debugger;
        vis.states.bind(data.oid_Sound + '.val', function (e, newVal, oldVal) {
        });
        $div.data('bound', [data.oid_Sound + '.val']);

        vis.states.bind(data.oid_IsAlarm + '.val',function(e, newVal){
            checkalarmforSound();
        });
        $div.data('bound', [data.oid_IsAlarm + '.val']);
        $div.data('bound', [data.oid_Ack + '.val']);

        function checkalarmforSound(){
            var newVal = vis.states[data.oid_IsAlarm + '.val'];
            var audio = $("#myAlarmAudio");
            if(newVal==true)
            {
                var state = vis.states[data.oid_Sound + '.val'];
                $("#playerSource").attr("src", 'widgets/my-alarmviewer/sounds/'+state);
                audio[0].pause();
                audio[0].load();
                audio[0].play();
            }

            if(newVal==false)
            {
                audio[0].pause();
            }
        }
        
        if(data.hasOwnProperty('oid_Json'))
        {
            mydata=data;
        }

        

        
        var intervalID=  setInterval(function () {
            var states = vis.states[data.oid_Json + '.val'];
            alarmtable.setData(states);
            checkalarmforSound();
        }, 4500);
        
        debugger;
        
        function createTable () {


            //$( document ).ready(function() { 
            var printIcon = function (cell, formatterParams) { //plain text value
                return "<button class='fa fa-print'>ACK</button>";
            };
     
      
             alarmtable = new Tabulator("#alarm-table",{
                height: 230, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
                layout: "fitColumns", //fit columns to width of table (optional)
                tooltipsHeader: false,
                rowFormatter:function(row){
                    if (row.getData().Alarmtype == "warning") {
                        row.getElement().style.backgroundColor="blue";
                    }
                    if (row.getData().Alarmtype == "alarm") {
                        row.getElement().style.backgroundColor="red";
                    }
                },
                pagination: "local",
                paginationSize: 6,
                movableColumns: true,
                columns: [ //Define Table Columns
                    { title: "ID", field: "id", width: 50, headerFilter:"number", headerFilterPlaceholder: "Select id...", headerFilterFunc: ">="  },
                    { title: "Tag Name", field: "Tagname", width: 150, headerFilter: "input" },
                    { title: "Alarm Type", field: "Alarmtype", width: 100, headerFilter: "input" },
                    { title: "Alarm Time", field: "alarmtime", width: 150, headerFilter: "input" },
                    { title: "Description", field: "Description", width: 150, headerFilter: "input" },
                    { title: "Limit Value", field: "LimitValue", width: 110, headerFilter: "input" },
                    { title: "Limit Message", field: "Limitmessage", width: 150, headerFilter: "input" },
                    { title:  "HIGH_LOW",field: "HIGH_LOW", width: 80, headerFilter: "input"},
                    { title: "Alarm Value", field: "AlarmValue", width: 110, headerFilter: "input" },
                    { title: "Acknowledge", field: "Acknowledge", width: 80, headerFilter: "input" },
                    { title: "Acknowledge Time", field: "acknowledgetime", width: 150, headerFilter: "input" },
                    { title: "Ack/Unack", formatter: printIcon, width: 80, align: "center", headerFilter: "input", cellClick: function (e, cell) { /*alert("Printing row data for: " + cell.getRow().getData().name)*/ } },
                ],
                /*rowClick: function (e, row) { //trigger an alert message when the row is clicked
                    //alert("Row " + row.getData().id + " Clicked!!!!");
                    if (row.getData().id != 'undefined')
                    {
     
                        vis.setValue(mydata.oid_Ack, row.getData().id);
                        vis.setValue(mydata.oid_IsAlarm,false);
                        pauseAudio();
                    }
                },*/
            });

            alarmtable.on("rowClick", function(e, row){
                if (row.getData().id != 'undefined')
                    {
                        vis.setValue(mydata.oid_Ack, row.getData().id);
                        vis.setValue(mydata.oid_IsAlarm,false);
                        pauseAudio();
                    }
            });
        //});
    }
        ////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////
    },
},

historicalalarmviewer:{
    createWidget: function (widgetID, view, data, style,wtype) {
        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds["my-alarmviewer"].historicalalarmviewer.createWidget(widgetID, view, data, style,wtype);
            }, 100);
          }

        

        // subscribe on updates of value
        function onChange(e, newVal, oldVal) {
            $div.find('.my-alarmviewer-value').html(newVal);
            //checkalarmforSound();
        }
            
        //window.addEventListener("load", function() {
            var tabledata = [{"id":1,"Tagname":"modbus.0.holdingRegisters.44022_Retrieve_Previous_Batch","Alarmtype":"alarm","alarmtime":"2018-06-18 19:32:08","Description":"fcndksjnvjsdbvjrdsdsvsd dgbsfwef wegrgwrgrv erg","LimitValue":2,"Limitmessage":"iki","HIGH_LOW":"high","AlarmTime":1529335928017,"AlarmValue":"21","Acknowledge":"ack","acknowledgetime":"2024-04-02 10:19:08"},{"id":2,"Tagname":"modbus.0.holdingRegisters.44022_Retrieve_Previous_Batch","Alarmtype":"alarm","alarmtime":"2018-06-18 19:32:09","Description":"…","LimitValue":50,"Limitmessage":"fdfdffdf","HIGH_LOW":"high","AlarmTime":1712397694408,"AlarmValue":"54","Acknowledge":"ack","acknowledgetime":"2024-04-06 14:01:55"},{"id":44,"Tagname":"my-opcua.0.ns=2___s=Rslinx_For_IO___Device1___Pipeline___Online___LT_25","Alarmtype":"alarm","alarmtime":"2024-04-06 14:02:03","Description":"cd","LimitValue":50,"Limitmessage":"fdfdffdf","HIGH_LOW":"high","AlarmTime":1712397723356,"AlarmValue":"56","Acknowledge":"ack","acknowledgetime":"2024-04-06 14:02:24"}];
            
            var printIcon = function (cell, formatterParams) { //plain text value
                return "<button class='fa fa-print'>ACK</button>";
            };
            
            
            const element = document.getElementById("gethistalarm");
            element.addEventListener("click", getalarm);
            
            const element1 = document.getElementById("download-xlsx");
            element1.addEventListener("click", toxlsx);
            
            const element2 = document.getElementById("download-csv");
            element2.addEventListener("click", tocsv);
            
            const element3 = document.getElementById("download-pdf");
            element3.addEventListener("click", topdf);
            
            
            var daterangepicker = new ej.calendars.DateRangePicker({
                format: "dd'/'MM'/'yyyy",// custom format 
                startDate: new Date(new Date()),
                endDate: new Date(new Date()/*.setDate(1)*/)
            });
            daterangepicker.appendTo('#daterangepicker');
            
            
            function getalarm()
            {
                var range = daterangepicker.getSelectedRange();
                var formattedStartDate = moment(range.startDate).format('YYYY-MM-DD HH:mm:ss');
                var formattedEndDate = moment(range.endDate).format('YYYY-MM-DD HH:mm:ss');
                //var tabledata = [{"id":5,"Tagname":"modbus.0.holdingRegisters.44022_Retrieve_Previous_Batch","Alarmtype":"alarm","alarmtime":"2018-06-18 19:32:08","Description":"fcndksjnvjsdbvjrdsdsvsd dgbsfwef wegrgwrgrv erg","LimitValue":2,"Limitmessage":"iki","HIGH_LOW":"high","AlarmTime":1529335928017,"AlarmValue":"21","Acknowledge":"ack","acknowledgetime":"2024-04-02 10:19:08"},{"id":6,"Tagname":"modbus.0.holdingRegisters.44022_Retrieve_Previous_Batch","Alarmtype":"alarm","alarmtime":"2018-06-18 19:32:09","Description":"…","LimitValue":50,"Limitmessage":"fdfdffdf","HIGH_LOW":"high","AlarmTime":1712397694408,"AlarmValue":"54","Acknowledge":"ack","acknowledgetime":"2024-04-06 14:01:55"},{"id":7,"Tagname":"my-opcua.0.ns=2___s=Rslinx_For_IO___Device1___Pipeline___Online___LT_25","Alarmtype":"alarm","alarmtime":"2024-04-06 14:02:03","Description":"cd","LimitValue":50,"Limitmessage":"fdfdffdf","HIGH_LOW":"high","AlarmTime":1712397723356,"AlarmValue":"56","Acknowledge":"ack","acknowledgetime":"2024-04-06 14:02:24"}];
                vis.conn._socket.emit('sendTo', 'my-alarm.0', 'getlog', {'startdate': formattedStartDate,'enddate': formattedEndDate, }, function (callback) {
                 table.setData(callback);
                });
                
            }
            
            function toxlsx(){
                table.download("xlsx", "data.xlsx", {
                    documentProcessing:function(workbook){
                        //workbook - sheetJS workbook object
                
                        //set some properties on the workbook file
                        workbook.Props = {
                            Title: "SheetJS Tutorial",
                            Subject: "Test",
                            CreatedDate: new Date(2017,12,19)
                        };
                
                        return workbook;
                    }
                });
            }
            
            function tocsv()
            {
                table.download("csv", "data.csv", {delimiter:"."});
            }
            
            function topdf(){
                table.download("pdf", "data.pdf", {
                    orientation:"portrait", //set page orientation to portrait
                    title:"Dynamics Quotation Report", //add title to report
                    jsPDF:{
                        unit:"in", //set units to inches
                    },
                    autoTable:{ //advanced table styling
                        styles: {
                            fillColor: [100, 255, 255]
                        },
                        columnStyles: {
                            id: {fillColor: 255}
                        },
                        margin: {top: 60},
                    },
                    documentProcessing:function(doc){
                        //carry out an action on the doc object
                    }
                }); 
            }
            
            //initialize table
            var table = new Tabulator("#histalarm-table", {
                data:[{}], //assign data to table
                autoColumns:true, //create columns from data field names
                height: 800, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
                layout: "fitColumns", //fit columns to width of table (optional)
                tooltipsHeader: false,
               
                /*rowFormatter:function(row){
                    if (row.getData().Alarmtype == "warning") {
                        row.getElement().style.backgroundColor="blue";
                    }
                    if (row.getData().Alarmtype == "alarm") {
                        row.getElement().style.backgroundColor="red";
                    }
                },*/
                pagination: "local",
                paginationSize: 30,
                movableColumns: true,
                columns: [ //Define Table Columns
                    { title: "ID", field: "id", width: 50, headerFilter:"number", headerFilterPlaceholder: "Select id...", headerFilterFunc: ">="  },
                    { title: "Tag Name", field: "Tagname", width: 150, headerFilter: "input" },
                    { title: "Alarm Type", field: "Alarmtype", width: 100, headerFilter: "input" },
                    { title: "Alarm Time", field: "alarmtime", width: 150, headerFilter: "input" },
                    { title: "Description", field: "Description", width: 150, headerFilter: "input" },
                    { title: "Limit Value", field: "LimitValue", width: 110, headerFilter: "input" },
                    { title: "Limit Message", field: "Limitmessage", width: 150, headerFilter: "input" },
                    { title:  "HIGH_LOW",field: "HIGH_LOW", width: 80, headerFilter: "input"},
                    { title: "Alarm Value", field: "AlarmValue", width: 110, headerFilter: "input" },
                    { title: "Acknowledge", field: "Acknowledge", width: 80, headerFilter: "input" },
                    { title: "Acknowledge Time", field: "acknowledgetime", width: 150, headerFilter: "input" },
                    { title: "Ack/Unack", formatter: printIcon, width: 80, align: "center", headerFilter: "input", cellClick: function (e, cell) { /*alert("Printing row data for: " + cell.getRow().getData().name)*/ } },
                ],
            });
        //},false);
  
    
        
    },
  }
};


vis.binds["my-alarmviewer"].showVersion();

var audio = $("#myAlarmAudio");

function playAudio() {
    audio[0].play();
}

function pauseAudio() {
    audio[0].pause();
}
