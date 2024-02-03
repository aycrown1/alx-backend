#!/usr/bin/env python3
"""
This module inherits from the Basecache class and is caching system
"""
BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    """class LFUCache that inherits from BaseCaching and is a caching system
    """
    def __init__(self):
        """
        initialising the LIFOCache class from the parent class
        """
        super().__init__()
        self.frequency = {}

    def put(self, key, item):
        """
        Adds items to the Cache
        """
        if key and item:
            self.cache_data[key] = item
            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                min_key = min(self.frequency, key=self.frequency.get)
                print("DISCARD: {}".format(min_key))
                del self.cache_data[min_key]
                del self.frequency[min_key]
            if key not in self.frequency.keys():
                self.frequency[key] = 0
            else:
                self.frequency[key] += 1

    def get(self, key):
        """
        Gets the Item from the Cache
        """
        if key is None or key not in self.cache_data:
            return None
        self.frequency[key] += 1
        return self.cache_data.get(key)
