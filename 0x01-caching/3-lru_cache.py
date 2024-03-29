#!/usr/bin/env python3
"""
This module inherits from the Basecache class and is caching system
"""
BaseCaching = __import__('base_caching').BaseCaching


class LRUCache(BaseCaching):
    """
    class LRUCache that inherits from BaseCaching and is a caching system
    """
    def __init__(self):
        """
        initialising the LRUCache class from the parent class
        """
        super().__init__()
        self.lru = []

    def put(self, key, item):
        """
        Adds items to the Cache
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                lru_item = self.lru.pop(0)
                del self.cache_data[lru_item]
                print("DISCARD: {}".format(lru_item))
            self.cache_data[key] = item
            self.lru.append(key)

    def get(self, key):
        """
        Gets the Item from the Cache
        """
        if key is not None and key in self.cache_data:
            self.lru.remove(key)
            self.lru.append(key)
            return self.cache_data[key]
        return None
