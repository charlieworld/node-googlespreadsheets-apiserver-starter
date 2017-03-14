This s a starter of NodeJs API Server using Google spreadsheet as database

## Installation

```npm install```

## Setting

Set sheet id and key file name in "get_gs_data()" function 
```function get_gs_data(res){
    var doc = new GoogleSpreadsheet('sheet id'); // 這邊輸入目標 GoogleSpreadsheet 的id
    var keyfile = 'key.json' // 這邊輸入 key 檔 
    var sheet;
    var rowlength;
    var data_list = [];```