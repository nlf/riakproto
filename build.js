var proto2json = require('proto2json');
var fs         = require('fs');
var path       = require('path');
var async      = require('async');
var _          = require('lodash');

var PROTO_FILES = ['riak.proto', 'riak_dt.proto', 'riak_kv.proto', 'riak_search.proto', 'riak_yokozuna.proto'];
var OUTPUT_FILE = path.join(__dirname, 'proto.json');

function parseFile(filename, callback) {
    var filepath = path.join(__dirname, 'riak_pb', 'src', filename);
    var file = fs.readFileSync(filepath, 'utf8');
    proto2json.parse(file, function (err, result) {
        callback(null, result.messages);
    });
}

function parseCsv(callback) {
    var codes = {};
    var filepath = path.join(__dirname, 'riak_pb', 'src', 'riak_pb_messages.csv');
    var file = fs.readFileSync(filepath, 'utf8');
    var lines = file.split('\n');
    var i, l, line;
    for (i = 0, l = lines.length; i < l; i++) {
        line = lines[i].split(',');
        if (line.length > 1) {
            codes[line[0]] = line[1];
            codes[line[1]] = line[0];
        }
    }
    callback(null, codes);
}

async.map(PROTO_FILES, parseFile, function (err, messages) {
    parseCsv(function (err, codes) {
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify({
            messages: _.merge.apply(null, messages),
            codes: codes
        }), 'utf8');
    });
});
