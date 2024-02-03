#!/usr/bin/env python3
"""
This module inherits from the Basecache class and is caching system
"""
BaseCaching = __import__('base_caching').BaseCaching


class MRUCache(BaseCaching):
    """
    class MRUCache that inherits from BaseCaching and is a caching system
    """
    def __init__(self):
        """
        initialising the MRUCache class from the parent class
        """
        super().__init__()
        self.mru = []

    def put(self, key, item):
        """
        Adds items to the Cache
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                mru_item = self.mru.pop()
                del self.cache_data[mru_item]
                print("DISCARD: {}".format(mru_item))
            self.cache_data[key] = item
            self.mru.append(key)

    def get(self, key):
        """
        Gets the Item from the Cache
        """
        if key is not None and key in self.cache_data:
            self.mru.remove(key)
            self.mru.append(key)
            return self.cache_data[key]
        return None
