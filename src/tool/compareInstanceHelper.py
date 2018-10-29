import sys 

from pymongo import MongoClient
from pymongo import UpdateOne
from bson.objectid import ObjectId 

# 利用脚本更新比较服务器模型状态
# 参数 instanceId status process MongoUrl DbName CollName

def main():
    instanceId = sys.argv[1]
    status = sys.argv[2]
    process = sys.argv[3]
    MongoUrl = sys.argv[4]
    DbName = sys.argv[5]
    ColName = sys.argv[6]

    client = MongoClient(MongoUrl)
    db = client[DbName]
    col = db[ColName]

    result = col.update_one(
        { '_id': ObjectId(instanceId) },
        {
            '$set': {
                'state': status,
                'progress': process
            }
        }
    )

if __name__ == "__main__": 
    main()