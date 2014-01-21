var proto2json = require('proto2json');
var fs = require('fs');
var path = require('path');
var riakProto = fs.readFileSync(path.join(__dirname, 'proto', 'riak.proto'), 'utf8');
var riakKVProto = fs.readFileSync(path.join(__dirname, 'proto', 'riak_kv.proto'), 'utf8');
var riakSearchProto = fs.readFileSync(path.join(__dirname, 'proto', 'riak_search.proto'), 'utf8');
var output = { messages: { } };

output.codes = {
    '0': 'RpbErrorResp',
    '1': 'RpbPingReq',
    '2': 'RpbPingResp',
    '3': 'RpbGetClientIdReq',
    '4': 'RpbGetClientIdResp',
    '5': 'RpbSetClientIdReq',
    '6': 'RpbSetClientIdResp',
    '7': 'RpbGetServerInfoReq',
    '8': 'RpbGetServerInfoResp',
    '9': 'RpbGetReq',
    '10': 'RpbGetResp',
    '11': 'RpbPutReq',
    '12': 'RpbPutResp',
    '13': 'RpbDelReq',
    '14': 'RpbDelResp',
    '15': 'RpbListBucketsReq',
    '16': 'RpbListBucketsResp',
    '17': 'RpbListKeysReq',
    '18': 'RpbListKeysResp',
    '19': 'RpbGetBucketReq',
    '20': 'RpbGetBucketResp',
    '21': 'RpbSetBucketReq',
    '22': 'RpbSetBucketResp',
    '23': 'RpbMapRedReq',
    '24': 'RpbMapRedResp',
    '25': 'RpbIndexReq',
    '26': 'RpbIndexResp',
    '27': 'RpbSearchQueryReq',
    '28': 'RpbSearchQueryResp',
    '29': 'RpbResetBucketReq',
    '30': 'RpbResetBucketResp',
    '40': 'RpbCSBucketReq',
    '41': 'RpbCSBucketResp',
    '50': 'RpbCounterUpdateReq',
    '51': 'RpbCounterUpdateResp',
    '52': 'RpbCounterGetReq',
    '53': 'RpbCounterGetResp'
}

Object.keys(output.codes).forEach(function (key) {
    output.codes[output.codes[key]] = Number(key);
});

proto2json.parse(riakProto, function (err, result) {
    Object.keys(result.messages).forEach(function (key) {
        output.messages[key] = result.messages[key];
    });
    proto2json.parse(riakKVProto, function (err, result) {
        Object.keys(result.messages).forEach(function (key) {
            output.messages[key] = result.messages[key];
        });
        proto2json.parse(riakSearchProto, function (err, result) {
            Object.keys(result.messages).forEach(function (key) {
                output.messages[key] = result.messages[key];
            });
            fs.writeFileSync('proto.json', JSON.stringify(output), 'utf8');
        });
    });
});
