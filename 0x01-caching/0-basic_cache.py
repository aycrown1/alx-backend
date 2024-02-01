#!/usr/bin/env python3
"""
This module inherits from the Basecache class and is caching system
"""
from modules.base_caching import BaseCaching


class BasicCache(BaseCaching):
    """
    class BasicCache that inherits from BaseCaching and is a caching system
    """
    def put(self, key, item):
        """
        Adds items to the Cache
        """
        if key is not None or item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """
        Gets the Item from the Cache
        """
        if key is not None:
            return self.cache_data.get(key)
        return None
