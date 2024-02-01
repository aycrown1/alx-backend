#!/usr/bin/env python3
"""
This module inherits from the Basecache class and is caching system
"""
BaseCaching = __import__("base_caching").BaseCaching


class LIFOCache(BaseCaching):
    """
    class FIFOCache that inherits from BaseCaching and is a caching system
    """
    def __init__(self):
        """
        initialising the LIFOCache class from the parent class
        """
        super().__init__()

    def put(self, key, item):
        """
        Adds items to the Cache
        """
        if key is not None item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                discard_item = list(self.cache_data.keys()).pop()
                del self.cache_data[discard_item]
                print("DISCARD: {}".format(discard_item))
            self.cache_data[key] = item

    def get(self, key):
        """
        Gets the Item from the Cache
        """
        if key is not None:
            return self.cache_data.get(key)
        return None
