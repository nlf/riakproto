var proto2json = require('proto2json');
var fs = require('fs');
var path = require('path');
var riakProto = fs.readFileSync(path.join(__dirname, 'proto', 'riak.proto'), 'utf8');
var riakKVProto = fs.readFileSync(path.join(__dirname, 'proto', 'riak_kv.proto'), 'utf8');
var riakSearchProto = fs.readFileSync(path.join(__dirname, 'proto', 'riak_search.proto'), 'utf8');
var output = { };

proto2json.parse(riakProto, function (err, result) {
    Object.keys(result.messages).forEach(function (key) {
        output[key] = result.messages[key];
    });
    proto2json.parse(riakKVProto, function (err, result) {
        Object.keys(result.messages).forEach(function (key) {
            output[key] = result.messages[key];
        });
        proto2json.parse(riakSearchProto, function (err, result) {
            Object.keys(result.messages).forEach(function (key) {
                output[key] = result.messages[key];
            });
            fs.writeFileSync('proto.json', JSON.stringify(output), 'utf8');
        });
    });
});
