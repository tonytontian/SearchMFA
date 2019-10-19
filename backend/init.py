import json
import numpy as np
from bitarray import bitarray
import imagehash

hash_functions = {
    'aHash': imagehash.average_hash,
    'pHash': imagehash.phash,
    'dHash': imagehash.dhash,
    'wHash': imagehash.whash,
}


def get_hashes(name, records):
    hashes = [bitarray(record[name]) for record in records]
    return hashes

def init(STORAGE, HASH):
    records_json = STORAGE / 'records.json'
    with open(records_json) as f:
        records = json.load(f)
    hashes = get_hashes(HASH, records)
    hash_func = hash_functions[HASH]

    return records, hashes, hash_func